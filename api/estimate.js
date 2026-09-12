import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, validateHoneypot, setCorsHeaders, handleOptions } from './_utils.js'
import { ESTIMATION_CONFIG as C } from '../src/config/estimation.js'

// ─── Helpers statistiques ────────────────────────────────────────────────────

function median(arr) {
  if (!arr.length) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

function removeOutliers(values) {
  if (values.length < 4) return values
  const sorted = [...values].sort((a, b) => a - b)
  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]
  const iqr = q3 - q1
  return values.filter(v => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr)
}

// ─── Bounding box pour requête géographique ──────────────────────────────────

function getBBox(lat, lon, radiusKm) {
  const latDelta = radiusKm / 111.0
  const lonDelta = radiusKm / (111.0 * Math.cos((lat * Math.PI) / 180))
  return {
    minLat: lat - latDelta, maxLat: lat + latDelta,
    minLon: lon - lonDelta, maxLon: lon + lonDelta,
  }
}

// ─── Requêtes DVF ────────────────────────────────────────────────────────────

async function fetchByCommune(supabase, typeLocal, codeCommune, cutoffDate) {
  const { data } = await supabase
    .from('dvf')
    .select('valeur_fonciere, surface_reelle_bati')
    .eq('type_local', typeLocal)
    .eq('code_commune', codeCommune)
    .gte('date_mutation', cutoffDate)
    .gt('surface_reelle_bati', 0)
    .gt('valeur_fonciere', 0)
    .limit(500)
  return data ?? []
}

async function fetchByRadius(supabase, typeLocal, lat, lon, radiusKm, cutoffDate) {
  const { minLat, maxLat, minLon, maxLon } = getBBox(lat, lon, radiusKm)
  const { data } = await supabase
    .from('dvf')
    .select('valeur_fonciere, surface_reelle_bati')
    .eq('type_local', typeLocal)
    .gte('date_mutation', cutoffDate)
    .gt('surface_reelle_bati', 0)
    .gt('valeur_fonciere', 0)
    .gte('latitude', minLat).lte('latitude', maxLat)
    .gte('longitude', minLon).lte('longitude', maxLon)
    .limit(500)
  return data ?? []
}

async function fetchDepartement(supabase, typeLocal, cutoffDate) {
  const { data } = await supabase
    .from('dvf')
    .select('valeur_fonciere, surface_reelle_bati')
    .eq('type_local', typeLocal)
    .gte('date_mutation', cutoffDate)
    .gt('surface_reelle_bati', 0)
    .gt('valeur_fonciere', 0)
    .limit(1000)
  return data ?? []
}

// ─── Calcul estimation ───────────────────────────────────────────────────────

function computePricesPerM2(rows) {
  return rows
    .map(r => Number(r.valeur_fonciere) / Number(r.surface_reelle_bati))
    .filter(p => p > 0 && isFinite(p))
}

function terrainBonus(terrainM2) {
  if (!terrainM2 || terrainM2 <= 0) return 0
  for (let i = C.TERRAIN_BRACKETS.length - 1; i >= 0; i--) {
    const b = C.TERRAIN_BRACKETS[i]
    if (terrainM2 >= b.min) return b.bonus
  }
  return 0
}

function roundToThousand(n) {
  return Math.round(n / 1000) * 1000
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  setCorsHeaders(res)
  if (handleOptions(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body
  if (!body) return res.status(400).json({ error: 'Corps de requête manquant' })

  // Honeypot
  if (!validateHoneypot(body)) return res.status(200).json({ success: true }) // silencieux

  // Rate limiting
  const supabase = getSupabaseAdmin()
  const ipHash = hashIp(getClientIp(req))
  const allowed = await checkRateLimit(
    supabase, ipHash, 'estimate',
    C.RATE_LIMIT_REQUESTS, C.RATE_LIMIT_WINDOW_SECS
  )
  if (!allowed) return res.status(429).json({ error: 'Trop de requêtes, réessayez dans quelques minutes.' })

  // Validation des champs obligatoires
  const { type, surface, etat, lat, lon, code_commune, code_postal } = body
  if (!type || !surface || !etat || !lat || !lon || !code_commune) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' })
  }
  if (!['maison', 'appartement'].includes(type)) {
    return res.status(400).json({ error: 'Type de bien invalide' })
  }
  if (surface <= 0 || surface > 2000) {
    return res.status(400).json({ error: 'Surface invalide' })
  }
  if (!C.CONDITION_COEFF[etat]) {
    return res.status(400).json({ error: 'État du bien invalide' })
  }

  // Vérification zone
  const hors_zone = !C.WHITELIST_POSTAL_CODES.includes(String(code_postal))
  if (hors_zone) {
    return res.status(200).json({ success: true, hors_zone: true })
  }

  const typeLocal = type === 'maison' ? 'Maison' : 'Appartement'
  const cutoffDate = new Date()
  cutoffDate.setFullYear(cutoffDate.getFullYear() - C.YEARS_BACK)
  const cutoffStr = cutoffDate.toISOString().split('T')[0]

  // Stratégie d'élargissement des comparables
  let rows = await fetchByCommune(supabase, typeLocal, code_commune, cutoffStr)
  let dataSource = 'commune'

  if (rows.length < C.MIN_COMPARABLES) {
    rows = await fetchByRadius(supabase, typeLocal, lat, lon, C.RADIUS_KM[0], cutoffStr)
    dataSource = `rayon_${C.RADIUS_KM[0]}km`
  }
  if (rows.length < C.MIN_COMPARABLES) {
    rows = await fetchByRadius(supabase, typeLocal, lat, lon, C.RADIUS_KM[1], cutoffStr)
    dataSource = `rayon_${C.RADIUS_KM[1]}km`
  }
  if (rows.length < C.MIN_COMPARABLES) {
    rows = await fetchDepartement(supabase, typeLocal, cutoffStr)
    dataSource = 'departement'
  }

  const rawPrices = computePricesPerM2(rows)
  const cleanedPrices = removeOutliers(rawPrices)
  const nb_comparables = cleanedPrices.length

  if (!nb_comparables) {
    return res.status(422).json({ error: 'Données insuffisantes pour calculer une estimation.' })
  }

  const prixM2Median = median(cleanedPrices)

  // Coefficients
  let coeff = C.CONDITION_COEFF[etat] ?? 1.0
  if (type === 'maison') {
    if (body.plain_pied) coeff *= (1 + C.PLAIN_PIED_BONUS)
    if (body.garage)     coeff *= (1 + C.GARAGE_BONUS)
    if (body.terrain)    coeff *= (1 + terrainBonus(Number(body.terrain)))
  }

  const prixBase = prixM2Median * Number(surface) * coeff
  const range = nb_comparables < C.MIN_COMPARABLES ? C.WIDE_RANGE : C.DEFAULT_RANGE

  return res.status(200).json({
    success: true,
    hors_zone: false,
    estimation_min:   roundToThousand(prixBase * (1 - range)),
    estimation_max:   roundToThousand(prixBase * (1 + range)),
    prix_m2_median:   Math.round(prixM2Median),
    nb_comparables,
    data_source:      dataSource,
  })
}
