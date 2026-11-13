import { Resend } from 'resend'
import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, validateHoneypot, setCorsHeaders, handleOptions } from './_utils.js'
import { ESTIMATION_CONFIG as C } from '../src/config/estimation.js'

function formatCurrency(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function bool(v) {
  if (v === true  || v === 'true')  return 'Oui'
  if (v === false || v === 'false') return 'Non'
  return '—'
}

function row(label, value) {
  const display = (value === null || value === undefined || value === '') ? '—' : value
  return `<tr>
    <td style="padding:7px 14px;background:#f5f2ee;font-weight:600;font-size:13px;white-space:nowrap;width:170px">${label}</td>
    <td style="padding:7px 14px;font-size:13px">${display}</td>
  </tr>`
}

function section(title) {
  return `<tr><td colspan="2" style="padding:12px 14px 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;border-top:2px solid #e5e1db">${title}</td></tr>`
}

function buildEmailHtml(lead) {
  const isHorsZone = lead.source === 'hors_zone'
  const sourceLabel = isHorsZone ? 'Hors zone – demande personnalisée' : 'Simulateur d\'estimation'
  const dateLabel = lead.consentement_at
    ? new Date(lead.consentement_at).toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'full', timeStyle: 'short' })
    : '—'

  const typeBien = {
    maison: 'Maison',
    appartement: 'Appartement',
    terrain: 'Terrain',
  }[lead.type_bien] ?? lead.type_bien ?? '—'

  const etatBien = {
    a_renover: 'À rénover',
    correct: 'État correct',
    bon: 'Bon état',
    renove_recent: 'Rénové récemment',
  }[lead.etat] ?? lead.etat ?? '—'

  const mapsUrl = (lead.latitude && lead.longitude)
    ? `https://maps.google.com/?q=${lead.latitude},${lead.longitude}`
    : null

  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">

  <div style="background:#1C2B3A;padding:20px 24px;border-radius:6px 6px 0 0">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.1em">Alexandre Coutant · SAFTI</p>
    <h1 style="margin:4px 0 0;font-size:18px;color:#fff;font-weight:600">Nouveau lead – ${sourceLabel}</h1>
  </div>

  <table style="border-collapse:collapse;width:100%;border:1px solid #e5e1db;border-top:none;border-radius:0 0 6px 6px">
    ${section('Contact')}
    ${row('Téléphone', lead.telephone ? `<a href="tel:${lead.telephone}" style="color:#E06B1F">${lead.telephone}</a>` : null)}
    ${row('Email', lead.email ? `<a href="mailto:${lead.email}" style="color:#E06B1F">${lead.email}</a>` : null)}
    ${row('Reçu le', dateLabel)}

    ${section('Localisation')}
    ${row('Adresse', lead.address)}
    ${row('Code postal', lead.code_postal)}
    ${row('Coordonnées GPS', mapsUrl ? `<a href="${mapsUrl}" style="color:#E06B1F">Voir sur Maps</a>` : null)}

    ${section('Bien immobilier')}
    ${row('Type', typeBien)}
    ${row('Surface habitable', lead.surface ? `${lead.surface} m²` : null)}
    ${row('Chambres', lead.chambres)}
    ${row('État général', etatBien)}
    ${lead.type_bien === 'maison' ? row('Plain-pied', bool(lead.plain_pied)) : ''}
    ${lead.type_bien === 'maison' ? row('Garage', bool(lead.garage)) : ''}
    ${lead.type_bien === 'maison' && lead.terrain ? row('Surface terrain', `${lead.terrain} m²`) : ''}
    ${lead.type_bien === 'appartement' && lead.etage !== null ? row('Étage', lead.etage) : ''}
    ${lead.type_bien === 'appartement' ? row('Ascenseur', bool(lead.ascenseur)) : ''}

    ${!isHorsZone ? section('Résultat de l\'estimation') : ''}
    ${!isHorsZone ? row('Fourchette', `<strong style="color:#E06B1F;font-size:15px">${formatCurrency(lead.estimation_min)} – ${formatCurrency(lead.estimation_max)}</strong>`) : ''}
    ${!isHorsZone ? row('Prix médian / m²', lead.prix_m2_median ? `${lead.prix_m2_median} €/m²` : null) : ''}
    ${!isHorsZone ? row('Transactions comparées', lead.nb_comparables) : ''}

    ${lead.message ? section('Message') : ''}
    ${lead.message ? row('Message', lead.message) : ''}
  </table>

</div>
  `.trim()
}

export default async function handler(req, res) {
  setCorsHeaders(res, req)
  if (handleOptions(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body
  if (!body) return res.status(400).json({ error: 'Corps de requête manquant' })

  if (!validateHoneypot(body)) return res.status(200).json({ success: true })

  const supabase = getSupabaseAdmin()
  const ipHash = hashIp(getClientIp(req))

  const allowed = await checkRateLimit(
    supabase, ipHash, 'lead',
    C.RATE_LIMIT_REQUESTS, C.RATE_LIMIT_WINDOW_SECS
  )
  if (!allowed) return res.status(429).json({ error: 'Trop de requêtes, réessayez dans quelques minutes.' })

  // Validation
  if (!body.telephone?.trim()) {
    return res.status(400).json({ error: 'Le téléphone est obligatoire.' })
  }
  const PHONE_REGEX = /^(\+33|0033|0)[1-9]([ .\-]?\d{2}){4}$/
  if (!PHONE_REGEX.test(body.telephone.trim())) {
    return res.status(400).json({ error: 'Format de téléphone invalide.' })
  }
  if (!body.consentement) {
    return res.status(400).json({ error: 'Le consentement RGPD est obligatoire.' })
  }
  const source = body.source ?? 'estimation'
  if (!['estimation', 'hors_zone', 'contact'].includes(source)) {
    return res.status(400).json({ error: 'Source invalide.' })
  }

  const now = new Date().toISOString()

  const leadRow = {
    source,
    address:        body.address?.trim()   ?? null,
    code_postal:    body.code_postal?.trim() ?? null,
    latitude:       body.lat    ? Number(body.lat)  : null,
    longitude:      body.lon    ? Number(body.lon)  : null,
    type_bien:      body.type   ?? null,
    surface:        body.surface ? Number(body.surface) : null,
    chambres:       body.chambres ? Number(body.chambres) : null,
    etat:           body.etat   ?? null,
    plain_pied:     body.plain_pied ?? null,
    garage:         body.garage ?? null,
    terrain:        body.terrain ? Number(body.terrain) : null,
    etage:          body.etage  !== undefined ? Number(body.etage) : null,
    ascenseur:      body.ascenseur ?? null,
    estimation_min: body.estimation_min ? Number(body.estimation_min) : null,
    estimation_max: body.estimation_max ? Number(body.estimation_max) : null,
    prix_m2_median: body.prix_m2_median ? Number(body.prix_m2_median) : null,
    nb_comparables: body.nb_comparables ? Number(body.nb_comparables) : null,
    nom:            body.nom?.trim()  ?? null,
    telephone:      body.telephone.trim(),
    email:          body.email?.trim() ?? null,
    message:        body.message?.trim() ?? null,
    consentement:   true,
    consentement_at: now,
    ip_hash:        ipHash,
  }

  const { error: dbError } = await supabase.from('leads').insert(leadRow)
  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: 'Erreur lors de l\'enregistrement.' })
  }

  // Email de notification
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    'notifications@coutant-immobilier-vendee.fr',
      to:      process.env.EMAIL_TO,
      subject: `[Lead] Nouveau contact – ${source === 'hors_zone' ? 'Hors zone' : 'Estimation'}`,
      html:    buildEmailHtml({ ...leadRow }),
    })
  } catch (emailErr) {
    // L'email ne doit pas bloquer la confirmation au visiteur
    console.error('Resend error:', emailErr)
  }

  return res.status(200).json({ success: true })
}
