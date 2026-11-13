/**
 * Configuration centralisée du simulateur d'estimation.
 * Ce fichier est la seule source de vérité pour les paramètres métier.
 * Utilisé côté API (serverless) et côté client (simulateur wizard).
 */

export const ESTIMATION_CONFIG = {
  // Département couvert : toute la Vendée (code INSEE commençant par '85')
  COVERED_DEPT: '85',

  // Comportement hors zone : 'capture' (capturer le lead) | 'block' (bloquer)
  HORS_ZONE_MODE: 'capture',

  // Paramètres de comparaison DVF
  MIN_COMPARABLES: 5,
  YEARS_BACK: 5,
  RADIUS_KM: [3, 5], // élargissements successifs si pas assez de comparables

  // Fourchette d'estimation
  DEFAULT_RANGE: 0.10, // ±10 % avec données suffisantes
  WIDE_RANGE: 0.15,    // ±15 % si peu de comparables

  // Coefficients état du bien (par rapport à 'bon' = base 1.00)
  CONDITION_COEFF: {
    a_renover:     0.85,
    correct:       0.93,
    bon:           1.00,
    renove_recent: 1.08,
  },

  // Bonus maison
  PLAIN_PIED_BONUS: 0.03, // +3 %
  GARAGE_BONUS:     0.02, // +2 %

  // Bonus terrain (marginal — les comparables DVF maison incluent déjà du terrain)
  // Paliers progressifs en m²
  TERRAIN_BRACKETS: [
    { min: 0,    max: 300,      bonus: 0.00 },
    { min: 300,  max: 600,      bonus: 0.01 },
    { min: 600,  max: 1200,     bonus: 0.02 },
    { min: 1200, max: Infinity, bonus: 0.03 },
  ],

  // Rate limiting (par IP, par endpoint)
  RATE_LIMIT_REQUESTS: 5,
  RATE_LIMIT_WINDOW_SECS: 300,
}
