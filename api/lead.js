import { Resend } from 'resend'
import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, validateHoneypot, setCorsHeaders, handleOptions } from './_utils.js'
import { ESTIMATION_CONFIG as C } from '../src/config/estimation.js'

function formatCurrency(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function buildEmailHtml(lead) {
  const source = lead.source === 'hors_zone' ? 'Hors zone (demande personnalisée)' : 'Simulateur d\'estimation'
  return `
<h2 style="font-family:sans-serif">Nouveau lead – ${source}</h2>
<table style="font-family:sans-serif;border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Contact</td><td style="padding:6px 12px">${lead.nom ?? '—'} | ${lead.telephone} | ${lead.email ?? '—'}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Adresse</td><td style="padding:6px 12px">${lead.address ?? '—'} (${lead.code_postal ?? '—'})</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Bien</td><td style="padding:6px 12px">${lead.type_bien ?? '—'} – ${lead.surface ?? '—'} m² – ${lead.chambres ?? '—'} ch. – état : ${lead.etat ?? '—'}</td></tr>
  ${lead.source !== 'hors_zone' ? `
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Estimation</td><td style="padding:6px 12px"><strong>${formatCurrency(lead.estimation_min)} – ${formatCurrency(lead.estimation_max)}</strong> (${lead.prix_m2_median ?? '—'} €/m², ${lead.nb_comparables ?? '—'} comparables)</td></tr>
  ` : ''}
  ${lead.message ? `<tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Message</td><td style="padding:6px 12px">${lead.message}</td></tr>` : ''}
</table>
<p style="font-family:sans-serif;color:#6b7280;font-size:12px">Consentement : ${lead.consentement_at}</p>
  `
}

export default async function handler(req, res) {
  setCorsHeaders(res)
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
