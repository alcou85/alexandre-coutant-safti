# Alexandre Coutant — Site conseiller SAFTI Vendée

Site vitrine et simulateur d'estimation immobilière pour Alexandre Coutant, conseiller SAFTI à La Roche-sur-Yon et Les Sables-d'Olonne (Vendée, 85).

**Stack :** Vue 3 (Composition API) · Vue Router 4 · Vite 5 · Vercel Serverless Functions · Supabase (PostgreSQL) · Resend (emails)

---

## Fonctionnalité principale

Simulateur d'estimation immobilière en 3 étapes (adresse → caractéristiques → résultat) alimenté par les données DVF (Demandes de Valeurs Foncières) du secteur. Objectif : capturer des leads qualifiés depuis les campagnes Meta Ads.

---

## Setup

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Copiez `.env.example` en `.env.local` et renseignez toutes les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `SUPABASE_URL` | URL de votre projet Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase (serverless uniquement, ne jamais exposer côté client) |
| `SUPABASE_ANON_KEY` | Clé anon Supabase (optionnel, si usage côté client) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des notifications email |
| `EMAIL_TO` | Adresse email de réception des leads et des messages de contact |
| `VITE_SAFTI_LISTINGS_URL` | URL de votre mini-site SAFTI biens à vendre (exposé côté client) |

> **Important :** les variables préfixées `VITE_` sont intégrées dans le bundle frontend. Ne jamais y mettre de secrets.

---

## Développement

```bash
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

Les fonctions serverless (`/api/*`) sont simulées par Vercel CLI en local. Pour les tester :

```bash
npm install -g vercel
vercel dev
```

---

## Déploiement (Vercel)

1. **Connecter le dépôt Git à Vercel** via [vercel.com/new](https://vercel.com/new). Chaque push sur `main` déclenche un déploiement automatique.

2. **Configurer les variables d'environnement** dans le dashboard Vercel :
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `VITE_SAFTI_LISTINGS_URL`

3. Le fichier `vercel.json` configure le routage SPA (toutes les routes renvoient vers `index.html`) et expose les fonctions du dossier `api/`.

---

## Base de données — Initialisation SQL

1. Ouvrez votre projet **Supabase** → **SQL Editor**
2. Copiez-collez le contenu de `sql/schema.sql` et exécutez-le
3. Ce script crée les tables nécessaires : `transactions_dvf`, `leads`, et éventuellement `contacts`

À n'exécuter qu'une seule fois. En cas de mise à jour du schéma, rédigez des scripts de migration séparés.

---

## Ingestion DVF

Les données DVF (Demandes de Valeurs Foncières) alimentent le moteur d'estimation.

### Obtenir le fichier CSV

1. Téléchargez les données DVF sur [data.gouv.fr — DVF](https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/)
2. Sélectionnez le(s) fichier(s) correspondant à la Vendée (département 85) ou à la France entière selon votre usage
3. Placez le fichier CSV dans `scripts/` (ex. `scripts/dvf-85.csv`)

### Lancer l'ingestion

```bash
DVF_FILE=scripts/dvf-85.csv npm run ingest-dvf
```

Le script filtre les lignes pertinentes, calcule le prix au m² et insère les transactions dans Supabase.

### Quand re-lancer ?

DVF est publié annuellement (données décalées d'environ 6 mois). Re-lancez l'ingestion après chaque nouvelle publication pour maintenir des estimations à jour. Une ingestion complète est idempotente (les doublons sont ignorés via `ON CONFLICT DO NOTHING`).

---

## Structure du projet

```
├── api/                  # Vercel Serverless Functions
│   ├── _utils.js         # Helpers partagés (Supabase client, validation…)
│   ├── estimate.js       # POST /api/estimate — moteur d'estimation DVF
│   ├── lead.js           # POST /api/lead — enregistrement et notification lead
│   └── contact.js        # POST /api/contact — formulaire de contact
│
├── scripts/
│   └── ingest-dvf.js     # Script d'ingestion des données DVF dans Supabase
│
├── sql/
│   └── schema.sql        # Schéma base de données à initialiser dans Supabase
│
├── src/
│   ├── assets/main.css   # Design system (custom properties, reset, utilitaires)
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── AddressAutocomplete.vue  # Autocomplétion BAN API
│   │   └── simulator/
│   │       ├── SimulatorWizard.vue  # Orchestrateur 3 étapes
│   │       ├── Step1Address.vue
│   │       ├── Step2Property.vue
│   │       ├── Step3Result.vue
│   │       └── LeadForm.vue
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── EstimationView.vue
│   │   ├── AboutView.vue
│   │   ├── ContactView.vue
│   │   ├── MentionsLegalesView.vue
│   │   └── PolitiqueConfidentialiteView.vue
│   ├── router/index.js
│   ├── App.vue
│   └── main.js
│
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── .env.example
```

---

## Notes RGPD

- Aucun cookie tiers ni traceur n'est actif par défaut
- Le consentement est recueilli explicitement avant la soumission des formulaires (case non pré-cochée)
- Les données sont stockées dans Supabase (US) — transfert hors UE couvert par le Data Privacy Framework
- Un bandeau de consentement devra être ajouté avant l'activation du pixel Meta Ads

---

## Contenus à compléter avant mise en ligne

- `[À COMPLÉTER]` dans `MentionsLegalesView.vue` : adresse, n° RSAC, carte professionnelle
- `[À COMPLÉTER]` dans `PolitiqueConfidentialiteView.vue` : adresse, durée de conservation, date MAJ
- `[Votre biographie ici…]` dans `AboutView.vue`
- Numéros de téléphone et adresses email dans `AppFooter.vue` et `ContactView.vue`
- `VITE_SAFTI_LISTINGS_URL` dans `.env.local` et dans Vercel
