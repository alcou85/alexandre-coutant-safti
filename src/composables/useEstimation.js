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
    prix_m2_median  = communeData.median
    nb_comparables  = communeData.count
    usedFallback    = false
  } else {
    // Fallback département
    prix_m2_median  = deptData?.median ?? 2000
    nb_comparables  = deptData?.count  ?? 0
    usedFallback    = true
  }

  // Coefficients
  let coeff = C.CONDITION_COEFF[etat] ?? 1.0
  if (type === 'maison') {
    if (plain_pied) coeff *= (1 + C.PLAIN_PIED_BONUS)
    if (garage)     coeff *= (1 + C.GARAGE_BONUS)
    if (terrain)    coeff *= (1 + terrainBonus(Number(terrain)))
  }

  const prixBase = prix_m2_median * Number(surface) * coeff
  const range    = usedFallback ? C.WIDE_RANGE : C.DEFAULT_RANGE

  return {
    estimation_min:  roundToThousand(prixBase * (1 - range)),
    estimation_max:  roundToThousand(prixBase * (1 + range)),
    prix_m2_median:  Math.round(prix_m2_median),
    nb_comparables,
  }
}
