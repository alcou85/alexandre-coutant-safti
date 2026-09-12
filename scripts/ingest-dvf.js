#!/usr/bin/env node
/**
 * Script d'ingestion DVF géolocalisé – Département 85 (Vendée)
 * ─────────────────────────────────────────────────────────────
 * Source : https://files.data.gouv.fr/geo-dvf/latest/csv/{year}/departements/85.csv
 * Livraisons DVF : environ 2 fois par an (données N-1 et N-2).
 *
 * Usage :
 *   node scripts/ingest-dvf.js [--year 2023] [--dry-run]
 *
 * Variables d'environnement requises :
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Ce script peut être relancé sans risque : il tronque la table avant réinsertion.
 * Pour un rechargement partiel, modifier la logique d'upsert ci-dessous.
 */

import { createClient } from '@supabase/supabase-js'
import { createWriteStream, createReadStream, unlinkSync, existsSync } from 'fs'
import { createGunzip } from 'zlib'
import readline from 'readline'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// ─── Config ──────────────────────────────────────────────────────────────────

const YEAR = process.argv.includes('--year')
  ? process.argv[process.argv.indexOf('--year') + 1]
  : String(new Date().getFullYear() - 1)

const DRY_RUN = process.argv.includes('--dry-run')
const BATCH_SIZE = 1000
const TYPES_LOCAUX = ['Maison', 'Appartement']
const NATURE_MUTATION = 'Vente'

const DVF_URL_GZ  = `https://files.data.gouv.fr/geo-dvf/latest/csv/${YEAR}/departements/85.csv.gz`
const DVF_URL_CSV = `https://files.data.gouv.fr/geo-dvf/latest/csv/${YEAR}/departements/85.csv`

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TMP_FILE = path.join(__dirname, `dvf_85_${YEAR}.csv`)

// ─── Supabase ────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

// ─── Download ────────────────────────────────────────────────────────────────

async function download(url, dest, gunzip = false) {
  console.log(`⬇  Téléchargement : ${url}`)
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`HTTP ${resp.status} – ${url}`)

  const writer = createWriteStream(dest)
  const source = resp.body

  if (gunzip) {
    await pipeline(source, createGunzip(), writer)
  } else {
    // Node 18+ : resp.body est un ReadableStream Web — on le pipe manuellement
    const reader = source.getReader()
    await new Promise((resolve, reject) => {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) { writer.end(); resolve(); return }
          writer.write(Buffer.from(value), push)
        }).catch(reject)
      }
      push()
    })
  }
  console.log(`✓  Fichier sauvegardé : ${dest}`)
}

// ─── Parsing CSV ligne à ligne ───────────────────────────────────────────────

function parseLine(headers, line) {
  // Le CSV geo-dvf utilise la virgule comme séparateur et le point comme décimal
  const vals = line.split(',')
  const obj = {}
  headers.forEach((h, i) => { obj[h] = vals[i]?.trim() ?? '' })
  return obj
}

function toNum(s) {
  const n = parseFloat(s)
  return isNaN(n) ? null : n
}

function toInt(s) {
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

function toDate(s) {
  return s ? s.substring(0, 10) : null
}

// ─── Ingestion ───────────────────────────────────────────────────────────────

async function ingest() {
  // Téléchargement (essai .gz puis .csv)
  let downloaded = false
  try {
    await download(DVF_URL_GZ, TMP_FILE, true)
    downloaded = true
  } catch {
    console.log('Archive .gz non disponible, tentative CSV non compressé…')
  }
  if (!downloaded) {
    await download(DVF_URL_CSV, TMP_FILE, false)
  }

  if (DRY_RUN) {
    console.log('Mode dry-run : parsing uniquement, aucun insert.')
  } else {
    console.log('Troncature de la table dvf avant réingestion…')
    const { error } = await supabase.rpc('truncate_dvf') // voir note ci-dessous
    if (error) {
      // Si la RPC n'existe pas, on continue sans troncature (mode incrémental)
      console.warn('⚠  truncate_dvf RPC non trouvée – mode incrémental (doublons possibles)')
    }
  }

  const rl = readline.createInterface({ input: createReadStream(TMP_FILE), crlfDelay: Infinity })

  let headers = null
  let batch = []
  let total = 0
  let skipped = 0

  for await (const line of rl) {
    if (!line.trim()) continue

    if (!headers) {
      headers = line.split(',').map(h => h.trim().replace(/^"|"$/g, ''))
      continue
    }

    const row = parseLine(headers, line)

    // Filtres
    if (row.nature_mutation !== NATURE_MUTATION) { skipped++; continue }
    if (!TYPES_LOCAUX.includes(row.type_local))   { skipped++; continue }
    if (toInt(row.nombre_lots) !== 1)              { skipped++; continue }

    const surface = toNum(row.surface_reelle_bati)
    const valeur  = toNum(row.valeur_fonciere)
    if (!surface || surface <= 0 || !valeur || valeur <= 0) { skipped++; continue }

    const record = {
      date_mutation:           toDate(row.date_mutation),
      valeur_fonciere:         valeur,
      surface_reelle_bati:     surface,
      type_local:              row.type_local,
      code_commune:            row.code_commune,
      code_postal:             row.code_postal ?? null,
      nombre_pieces_principales: toInt(row.nombre_pieces_principales),
      surface_terrain:         toNum(row.surface_terrain),
      longitude:               toNum(row.longitude),
      latitude:                toNum(row.latitude),
    }

    batch.push(record)
    total++

    if (batch.length >= BATCH_SIZE && !DRY_RUN) {
      const { error } = await supabase.from('dvf').insert(batch)
      if (error) console.error('Erreur insert batch:', error.message)
      else process.stdout.write(`\r  ${total} lignes insérées…`)
      batch = []
    }
  }

  if (batch.length && !DRY_RUN) {
    const { error } = await supabase.from('dvf').insert(batch)
    if (error) console.error('Erreur insert final batch:', error.message)
  }

  // Nettoyage
  if (existsSync(TMP_FILE)) unlinkSync(TMP_FILE)

  console.log(`\n✓  Ingestion terminée : ${total} lignes insérées, ${skipped} ignorées.`)
}

// ─── RPC SQL à créer dans Supabase (optionnel) ───────────────────────────────
// Dans l'éditeur SQL Supabase, exécuter :
//
// CREATE OR REPLACE FUNCTION truncate_dvf()
// RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
// BEGIN TRUNCATE TABLE dvf; END; $$;
//
// Puis dans Settings > API, activer l'accès service_role à cette RPC.

ingest().catch(err => { console.error('Erreur fatale:', err); process.exit(1) })
