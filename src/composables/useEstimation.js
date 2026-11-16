import { ESTIMATION_CONFIG as C } from '@/config/estimation.js'

// Cache en mémoire pour éviter de recharger le JSON à chaque estimation
let pricesCache = null

async function loadPrices() {
  if (pricesCache) return pricesCache
  const res = await fetch('/prix-m2.json')
  if (!res.ok) throw new Error('Données de prix non disponibles.')
  pricesCache = await res.json()
  return pricesCache
}

function terrainBonus(m2) {
  if (!m2 || m2 <= 0) return 0
  for (let i = C.TERRAIN_BRACKETS.length - 1; i >= 0; i--) {
    if (m2 >= C.TERRAIN_BRACKETS[i].min) return C.TERRAIN_BRACKETS[i].bonus
  }
  return 0
}

// Facteur correctif selon la taille : les petits biens commandent un €/m² plus
// élevé, les grands biens un €/m² plus faible (diminishing returns).
function getSizeFactor(type, surface) {
  const brackets = C.SIZE_FACTORS[type] ?? C.SIZE_FACTORS.maison
  for (const { max, factor } of brackets) {
    if (surface <= max) return factor
  }
  return brackets[brackets.length - 1].factor
}

function roundToThousand(n) {
  return Math.round(n / 1000) * 1000
}

/**
 * Calcule une estimation immobilière à partir des prix médians DVF pré-calculés.
 * @param {object} params
 * @returns {{ estimation_min, estimation_max, prix_m2_median, nb_comparables }}
 */
export async function computeEstimation(params) {
  const { type, surface, etat, plain_pied, garage, terrain, code_commune } = params

  const prices    = await loadPrices()
  const typeLocal = type === 'maison' ? 'Maison' : 'Appartement'

  const communeData = prices.by_commune?.[code_commune]?.[typeLocal]
  const deptData    = prices.departement?.[typeLocal]

  let prix_m2_median, nb_comparables, usedFallback

  if (communeData && communeData.count >= C.MIN_COMPARABLES) {
    // Données locales suffisantes : utiliser le prix médian de la commune
    prix_m2_median = communeData.median
    nb_comparables = communeData.count
    usedFallback   = false
  } else {
    // Pas assez de données locales : fallback zone-based
    // Communes littorales → médiane départementale (littoral inclus)
    // Communes intérieures → tarif rural (moins biaisé vers le littoral)
    const isCoastal = C.COASTAL_COMMUNES.has(String(code_commune))
    if (isCoastal) {
      prix_m2_median = deptData?.median ?? 3500
    } else {
      prix_m2_median = C.RURAL_FALLBACK[typeLocal] ?? 2100
    }
    // nb_comparables = 0 : indique à l'UI que les données locales sont insuffisantes
    nb_comparables = 0
    usedFallback   = true
  }

  // Facteur de taille (diminution du €/m² pour les grands biens)
  const sizeFactor = getSizeFactor(type, Number(surface))

  // Coefficients état + caractéristiques
  let coeff = C.CONDITION_COEFF[etat] ?? 1.0
  if (type === 'maison') {
    if (plain_pied) coeff *= (1 + C.PLAIN_PIED_BONUS)
    if (garage)     coeff *= (1 + C.GARAGE_BONUS)
    if (terrain)    coeff *= (1 + terrainBonus(Number(terrain)))
  }

  const prixBase = prix_m2_median * Number(surface) * coeff * sizeFactor
  const range    = usedFallback ? C.WIDE_RANGE : C.DEFAULT_RANGE

  return {
    estimation_min:  roundToThousand(prixBase * (1 - range)),
    estimation_max:  roundToThousand(prixBase * (1 + range)),
    prix_m2_median:  Math.round(prix_m2_median),
    nb_comparables,
  }
}
