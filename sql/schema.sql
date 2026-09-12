-- ============================================================
-- Schéma Supabase – Alexandre Coutant SAFTI
-- Exécuter dans l'éditeur SQL Supabase (Settings > SQL Editor)
-- ============================================================

-- DVF : Demandes de Valeurs Foncières (source DGFiP)
CREATE TABLE IF NOT EXISTS dvf (
  id               BIGSERIAL PRIMARY KEY,
  date_mutation    DATE        NOT NULL,
  valeur_fonciere  NUMERIC(12, 2) NOT NULL,
  surface_reelle_bati NUMERIC(8, 2) NOT NULL,
  type_local       VARCHAR(20) NOT NULL,   -- 'Maison' | 'Appartement'
  code_commune     VARCHAR(10) NOT NULL,   -- code INSEE
  code_postal      VARCHAR(10),
  nombre_pieces_principales SMALLINT,
  surface_terrain  NUMERIC(12, 2),
  longitude        NUMERIC(10, 7),
  latitude         NUMERIC(10, 7)
);

CREATE INDEX IF NOT EXISTS idx_dvf_type_commune ON dvf(type_local, code_commune);
CREATE INDEX IF NOT EXISTS idx_dvf_date         ON dvf(date_mutation);
CREATE INDEX IF NOT EXISTS idx_dvf_location     ON dvf(latitude, longitude)
  WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Leads (estimations + hors-zone + formulaire contact)
CREATE TABLE IF NOT EXISTS leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  source          VARCHAR(20) NOT NULL
                  CHECK (source IN ('estimation', 'hors_zone', 'contact')),

  -- Adresse
  address         TEXT,
  code_postal     VARCHAR(10),
  latitude        NUMERIC(10, 7),
  longitude       NUMERIC(10, 7),

  -- Bien
  type_bien       VARCHAR(20),
  surface         NUMERIC(8, 2),
  chambres        SMALLINT,
  etat            VARCHAR(20),
  plain_pied      BOOLEAN,
  garage          BOOLEAN,
  terrain         NUMERIC(10, 2),
  etage           SMALLINT,
  ascenseur       BOOLEAN,

  -- Résultat estimation
  estimation_min  NUMERIC(12, 2),
  estimation_max  NUMERIC(12, 2),
  prix_m2_median  NUMERIC(10, 2),
  nb_comparables  SMALLINT,

  -- Contact
  nom             VARCHAR(200),
  telephone       VARCHAR(30),
  email           VARCHAR(200),
  message         TEXT,
  consentement    BOOLEAN NOT NULL DEFAULT FALSE,
  consentement_at TIMESTAMPTZ,

  -- Anti-spam
  ip_hash         VARCHAR(64)
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source     ON leads(source);

-- Rate limiting léger
CREATE TABLE IF NOT EXISTS rate_limits (
  id         BIGSERIAL PRIMARY KEY,
  ip_hash    VARCHAR(64) NOT NULL,
  endpoint   VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON rate_limits(ip_hash, endpoint, created_at);

-- Nettoyage automatique des entrées > 24h (optionnel, à activer via pg_cron si disponible)
-- SELECT cron.schedule('clean-rate-limits', '0 * * * *',
--   $$DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '24 hours'$$);
