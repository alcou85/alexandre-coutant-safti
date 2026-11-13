import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, setCorsHeaders, handleOptions } from './_utils.js'

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

function buildEmailHtml(data) {
  const dateLabel = new Date().toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const typeBien = {
    maison: 'Maison',
    appartement: 'Appartement',
  }[data.type] ?? data.type ?? '—'

  const etatBien = {
    a_renover:     'À rénover',
    correct:       'État correct',
    bon:           'Bon état',
    renove_recent: 'Rénové récemment',
  }[data.etat] ?? data.etat ?? '—'

  const mapsUrl = (data.lat && data.lon)
    ? `https://maps.google.com/?q=${data.lat},${data.lon}`
    : null

  return `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">

  <div style="background:#1C2B3A;padding:20px 24px;border-radius:6px 6px 0 0">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.1em">Alexandre Coutant · SAFTI</p>
    <h1 style="margin:4px 0 0;font-size:18px;color:#fff;font-weight:600">Estimation réalisée – sans demande de contact</h1>
  </div>

  <table style="border-collapse:collapse;width:100%;border:1px solid #e5e1db;border-top:none;border-radius:0 0 6px 6px">
    ${section('Date')}
    ${row('Réalisée le', dateLabel)}

    ${section('Localisation')}
    ${row('Adresse', data.address)}
    ${row('Code postal', data.code_postal)}
    ${row('Coordonnées GPS', mapsUrl ? `<a href="${mapsUrl}" style="color:#E06B1F">Voir sur Maps</a>` : null)}

    ${section('Bien immobilier')}
    ${row('Type', typeBien)}
    ${row('Surface habitable', data.surface ? `${data.surface} m²` : null)}
    ${row('Chambres', data.chambres)}
    ${row('État général', etatBien)}
    ${data.type === 'maison' ? row('Plain-pied', bool(data.plain_pied)) : ''}
    ${data.type === 'maison' ? row('Garage', bool(data.garage)) : ''}
    ${data.type === 'maison' && data.terrain ? row('Surface terrain', `${data.terrain} m²`) : ''}
    ${data.type === 'appartement' && data.etage !== null && data.etage !== undefined ? row('Étage', data.etage) : ''}
    ${data.type === 'appartement' ? row('Ascenseur', bool(data.ascenseur)) : ''}

    ${section('Résultat de l\'estimation')}
    ${row('Fourchette', `<strong style="color:#E06B1F;font-size:15px">${formatCurrency(data.estimation_min)} – ${formatCurrency(data.estimation_max)}</strong>`)}
    ${row('Prix médian / m²', data.prix_m2_median ? `${data.prix_m2_median} €/m²` : null)}
    ${row('Transactions comparées', data.nb_comparables)}
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

  if (!body.estimation_min || !body.estimation_max) {
    return res.status(400).json({ error: 'Résultat d\'estimation manquant.' })
  }

  // Rate limit plus souple : 10 par 5 min par IP
  const supabase = getSupabaseAdmin()
  const ipHash = hashIp(getClientIp(req))
  const allowed = await checkRateLimit(supabase, ipHash, 'estimation_notify', 10, 300)
  if (!allowed) return res.status(429).json({ error: 'Trop de requêtes.' })

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'notifications@coutant-immobilier-vendee.fr',
        to:      [process.env.EMAIL_TO],
        subject: `[Estimation] ${body.address ?? 'Adresse inconnue'} – ${body.type === 'maison' ? 'Maison' : 'Appartement'}`,
        html:    buildEmailHtml(body),
      }),
    })
    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      console.error('Resend API error (estimation-notify):', emailRes.status, errBody)
    }
  } catch (emailErr) {
    console.error('Resend fetch error (estimation-notify):', emailErr)
  }

  return res.status(200).json({ success: true })
}
