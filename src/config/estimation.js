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
  MIN_COMPARABLES: 3,
  YEARS_BACK: 5,
  RADIUS_KM: [3, 5], // élargissements successifs si pas assez de comparables

  // Fourchette d'estimation
  DEFAULT_RANGE: 0.10, // ±10 % avec données communales suffisantes
  WIDE_RANGE:    0.15, // ±15 % si peu de comparables (fallback)

  // Coefficients état du bien (par rapport à 'bon' = base 1.00)
  CONDITION_COEFF: {
    a_renover:     0.82,
    correct:       0.92,
    bon:           1.00,
    renove_recent: 1.07,
  },

  // Bonus maison (cumulatifs mais limités)
  PLAIN_PIED_BONUS: 0.03, // +3 %
  GARAGE_BONUS:     0.02, // +2 %

  // Facteur correctif selon la surface
  // Le prix/m² DVF est calculé sur un mix de biens. Les petits biens commandent
  // un €/m² plus élevé, les grands biens un €/m² plus faible.
  SIZE_FACTORS: {
    maison: [
      { max: 50,       factor: 1.15 },
      { max: 70,       factor: 1.08 },
      { max: 90,       factor: 1.03 },
      { max: 130,      factor: 1.00 },
      { max: 180,      factor: 0.93 },
      { max: 250,      factor: 0.86 },
      { max: Infinity, factor: 0.78 },
    ],
    appartement: [
      { max: 25,       factor: 1.15 },
      { max: 40,       factor: 1.08 },
      { max: 60,       factor: 1.03 },
      { max: 90,       factor: 1.00 },
      { max: 130,      factor: 0.95 },
      { max: Infinity, factor: 0.88 },
    ],
  },

  // Bonus terrain (maisons seulement).
  // Les transactions DVF maison incluent déjà la valeur d'un terrain typique
  // (300-700 m²). Le bonus ne s'applique qu'aux terrains nettement supérieurs.
  TERRAIN_BRACKETS: [
    { min: 0,    max: 800,      bonus: 0.00 },
    { min: 800,  max: 2000,     bonus: 0.01 },
    { min: 2000, max: Infinity, bonus: 0.02 },
  ],

  // ─── Fallback géographique ────────────────────────────────────────────────
  // La médiane départementale DVF est biaisée vers le littoral (tourisme).
  // Pour les communes rurales intérieures sans données locales suffisantes,
  // on utilise un tarif de référence plus bas, aligné sur les transactions
  // connues du bocage/marais vendéen.
  RURAL_FALLBACK: {
    Maison:       2100, // €/m² — bocage, marais, campagne intérieure
    Appartement:  1900,
  },

  // Codes INSEE des communes littorales / touristiques confirmées.
  // Ces communes utilisent la médiane départementale en cas de fallback
  // plutôt que le tarif rural.
  COASTAL_COMMUNES: new Set([
    // Nord littoral (Baie de Bourgneuf, Saint-Jean-de-Monts)
    '85157', // Notre-Dame-de-Monts
    '85222', // Saint-Jean-de-Monts
    '85127', // Saint-Hilaire-de-Riez
    // Île de Noirmoutier
    '85163', // Noirmoutier-en-l'Île
    // Centre littoral (Saint-Gilles, Brétignolles)
    '85035', // Saint-Gilles-Croix-de-Vie
    '85033', // Brem-sur-Mer
    '85288', // Brétignolles-sur-Mer
    // Les Sables d'Olonne et alentours
    '85164', // Les Sables d'Olonne (ancienne commune)
    '85194', // Les Sables d'Olonne (Olonne-sur-Mer)
    '85243', // commune littorale identifiée DVF
    '85234', // commune littorale identifiée DVF
    '85294', // commune littorale identifiée DVF
    // Sud littoral (Talmont, La Tranche)
    '85278', // Talmont-Saint-Hilaire
    '85126', // Longeville-sur-Mer
    '85226', // La Tranche-sur-Mer
    '85089', // La Faute-sur-Mer
    // Île d'Yeu
    '85113', // L'Île-d'Yeu
    // Communes avec prix DVF élevés (tourisme/littoral confirmé)
    '85083', '85100', '85106',
  ]),

  // Rate limiting (par IP, par endpoint)
  RATE_LIMIT_REQUESTS: 5,
  RATE_LIMIT_WINDOW_SECS: 300,
}
