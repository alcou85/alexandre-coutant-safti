#!/usr/bin/env node
/**
 * Script d'ingestion DVF géolocalisé – Département 85 (Vendée)
 * ─────────────────────────────────────────────────────────────
 * Usage :  node --env-file=.env scripts/ingest-dvf.js [--year 2023] [--dry-run]
 * Variables requises : SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Ce script :
 *  1. Télécharge le CSV DVF du dept. 85
 *  2. Insère les ventes filtrées dans Supabase
 *  3. Génère public/prix-m2.json (prix médians par commune/type)
 *     → utilisé par le simulateur client-side, sans appel API
 */

import { createWriteStream, createReadStream, unlinkSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import { createGunzip } from 'zlib'
import readline from 'readline'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// ─── Config ──────────────────────────────────────────────────────────────────

const YEAR = process.argv.includes('--year')
  ? process.argv[process.argv.indexOf('--year') + 1]
  : String(new Date().getFullYear() - 1)

const DRY_RUN     = process.argv.includes('--dry-run')
const BATCH_SIZE  = 200
const TYPES_LOCAUX    = ['Maison', 'Appartement']
const NATURE_MUTATION = 'Vente'

const DVF_URL_GZ  = `https://files.data.gouv.fr/geo-dvf/latest/csv/${YEAR}/departements/85.csv.gz`
const DVF_URL_CSV = `https://files.data.gouv.fr/geo-dvf/latest/csv/${YEAR}/departements/85.csv`

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const TMP_FILE   = path.join(__dirname, `dvf_85_${YEAR}.csv`)
const JSON_OUT   = path.join(__dirname, '..', 'public', 'prix-m2.json')

// ─── Supabase REST ────────────────────────────────────────────────────────────

const SUPABASE_URL = (process.env.SUPABASE_URL ?? '').replace(/\/$/, '')
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

const HEADERS = {
  'apikey':        SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type':  'application/json',
  'Prefer':        'return=minimal',
}

async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers: { ...HEADERS, ...options.headers } })
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${await res.text().catch(() => '')}`)
  return res
}

async function testConnection() {
  console.log('🔌 Test connexion Supabase…')
  await (await supabaseFetch('/rest/v1/dvf?select=id&limit=1')).json()
  console.log('✓  Connexion OK')
}

async function truncateTable() {
  try {
    await supabaseFetch('/rest/v1/rpc/truncate_dvf', { method: 'POST', body: '{}' })
    console.log('✓  Table dvf vidée (RPC)')
  } catch {
    await supabaseFetch('/rest/v1/dvf?id=gte.0', { method: 'DELETE' })
    console.log('✓  Table dvf vidée (DELETE)')
  }
}

async function insertBatch(rows) {
  await supabaseFetch('/rest/v1/dvf', { method: 'POST', body: JSON.stringify(rows) })
}

// ─── Statistiques ─────────────────────────────────────────────────────────────

function median(arr) {
  if (!arr.length) return 0
  const s = [...arr].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 === 0 ? (s[m - 1] + s[m]) / 2 : s[m]
}

function removeOutliers(vals) {
  if (vals.length < 4) return vals
  const s = [...vals].sort((a, b) => a - b)
  const q1 = s[Math.floor(s.length * 0.25)]
  const q3 = s[Math.floor(s.length * 0.75)]
  const iqr = q3 - q1
  return vals.filter(v => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr)
}

function buildStats(raw) {
  // raw : { 'INSEE|Type': [prix_m2, ...] }
  const byCommune = {}
  const deptRaw   = { Maison: [], Appartement: [] }

  for (const [key, prices] of Object.entries(raw)) {
    const [commune, type] = key.split('|')
    const cleaned = removeOutliers(prices)
    if (!cleaned.length) continue
    if (!byCommune[commune]) byCommune[commune] = {}
    byCommune[commune][type] = { median: Math.round(median(cleaned)), count: cleaned.length }
    deptRaw[type]?.push(...cleaned)
  }

  const departement = {}
  for (const type of TYPES_LOCAUX) {
    const cleaned = removeOutliers(deptRaw[type])
    departement[type] = { median: Math.round(median(cleaned)), count: cleaned.length }
  }

  return { generated_at: new Date().toISOString().split('T')[0], by_commune: byCommune, departement }
}

// ─── Download ─────────────────────────────────────────────────────────────────

async function download(url, dest, gunzip = false) {
  console.log(`⬇  Téléchargement : ${url}`)
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  const writer = createWriteStream(dest)
  if (gunzip) {
    await pipeline(resp.body, createGunzip(), writer)
  } else {
    const reader = resp.body.getReader()
    await new Promise((resolve, reject) => {
      function pump() {
        reader.read().then(({ done, value }) => {
          if (done) { writer.end(); resolve(); return }
          writer.write(Buffer.from(value), pump)
        }).catch(reject)
      }
      pump()
    })
  }
  console.log(`✓  Fichier : ${dest}`)
}

// ─── CSV ──────────────────────────────────────────────────────────────────────

function parseLine(headers, line) {
  const vals = line.split(',')
  const obj  = {}
  headers.forEach((h, i) => { obj[h] = vals[i]?.trim() ?? '' })
  return obj
}

const toNum  = s => { const n = parseFloat(s);  return isNaN(n) ? null : n }
const toInt  = s => { const n = parseInt(s, 10); return isNaN(n) ? null : n }
const toDate = s => s ? s.substring(0, 10) : null

// ─── Main ─────────────────────────────────────────────────────────────────────

async function ingest() {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env')

  await testConnection()

  let downloaded = false
  try { await download(DVF_URL_GZ, TMP_FILE, true); downloaded = true } catch { /* essai CSV */ }
  if (!downloaded) await download(DVF_URL_CSV, TMP_FILE, false)

  if (!DRY_RUN) {
    console.log('Vidage de la table dvf…')
    await truncateTable()
  }

  const rl = readline.createInterface({ input: createReadStream(TMP_FILE), crlfDelay: Infinity })

  let headers  = null
  let batch    = []
  let total    = 0
  let skipped  = 0
  let errors   = 0
  const rawStats = {} // 'INSEE|Type' → [prix_m2]

  for await (const line of rl) {
    if (!line.trim()) continue
    if (!headers) { headers = line.split(',').map(h => h.trim().replace(/^"|"$/g, '')); continue }

    const row     = parseLine(headers, line)
    if (row.nature_mutation !== NATURE_MUTATION)  { skipped++; continue }
    if (!TYPES_LOCAUX.includes(row.type_local))    { skipped++; continue }
    if (toInt(row.nombre_lots) !== 1)              { skipped++; continue }

    const surface = toNum(row.surface_reelle_bati)
    const valeur  = toNum(row.valeur_fonciere)
    if (!surface || surface <= 0 || !valeur || valeur <= 0) { skipped++; continue }

    // Accumuler pour les stats
    const key = `${row.code_commune}|${row.type_local}`
    if (!rawStats[key]) rawStats[key] = []
    rawStats[key].push(valeur / surface)

    batch.push({
      date_mutation:             toDate(row.date_mutation),
      valeur_fonciere:           valeur,
      surface_reelle_bati:       surface,
      type_local:                row.type_local,
      code_commune:              row.code_commune,
      code_postal:               row.code_postal || null,
      nombre_pieces_principales: toInt(row.nombre_pieces_principales),
      surface_terrain:           toNum(row.surface_terrain),
      longitude:                 toNum(row.longitude),
      latitude:                  toNum(row.latitude),
    })
    total++

    if (batch.length >= BATCH_SIZE && !DRY_RUN) {
      try { await insertBatch(batch); process.stdout.write(`\r  ${total} lignes insérées…`) }
      catch (err) { errors++; console.error(`\nErreur batch :`, err.message) }
      batch = []
    }
  }

  if (batch.length && !DRY_RUN) {
    try { await insertBatch(batch) }
    catch (err) { errors++; console.error('\nErreur batch final :', err.message) }
  }

  if (existsSync(TMP_FILE)) unlinkSync(TMP_FILE)
  console.log(`\n✓  DB : ${total} lignes insérées, ${skipped} ignorées, ${errors} erreurs.`)

  // Génération du JSON de prix médians
  console.log('📊 Calcul des prix médians par commune…')
  const stats = buildStats(rawStats)
  mkdirSync(path.dirname(JSON_OUT), { recursive: true })
  writeFileSync(JSON_OUT, JSON.stringify(stats, null, 2))
  console.log(`✓  ${JSON_OUT} généré (${Object.keys(stats.by_commune).length} communes)`)
}

ingest().catch(err => { console.error('Erreur fatale :', err.message); process.exit(1) })
