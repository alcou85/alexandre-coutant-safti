import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, validateHoneypot, setCorsHeaders, handleOptions } from './_utils.js'
import { ESTIMATION_CONFIG as C } from '../src/config/estimation.js'

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
    supabase, ipHash, 'contact',
    C.RATE_LIMIT_REQUESTS, C.RATE_LIMIT_WINDOW_SECS
  )
  if (!allowed) return res.status(429).json({ error: 'Trop de requêtes, réessayez dans quelques minutes.' })

  // Validation minimale
  const { nom, email, telephone, message } = body
  if (!nom?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Nom, email et message sont obligatoires.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Email invalide.' })
  }

  // Enregistrement en base (best-effort, ne bloque pas l'envoi)
  supabase.from('leads').insert({
    source:    'contact',
    nom:       nom.trim(),
    email:     email.trim(),
    telephone: telephone?.trim() ?? null,
    message:   message.trim(),
    consentement:    false,
    consentement_at: null,
    ip_hash:   ipHash,
  }).then(({ error }) => {
    if (error) console.error('Supabase insert error (contact):', error)
  })

  // Email de notification via API REST Resend (pas de SDK pour éviter les dépendances manquantes)
  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     'notifications@coutant-immobilier-vendee.fr',
        to:       [process.env.EMAIL_TO],
        reply_to: email.trim(),
        subject:  `[Contact] Message de ${nom.trim()}`,
        html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#1C2B3A;padding:20px 24px;border-radius:6px 6px 0 0">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.1em">Alexandre Coutant · SAFTI</p>
    <h1 style="margin:4px 0 0;font-size:18px;color:#fff;font-weight:600">Nouveau message de contact</h1>
  </div>
  <table style="border-collapse:collapse;width:100%;border:1px solid #e5e1db;border-top:none;border-radius:0 0 6px 6px">
    <tr><td style="padding:7px 14px;background:#f5f2ee;font-weight:600;font-size:13px;width:120px">Nom</td><td style="padding:7px 14px;font-size:13px">${nom.trim()}</td></tr>
    <tr><td style="padding:7px 14px;background:#f5f2ee;font-weight:600;font-size:13px">Email</td><td style="padding:7px 14px;font-size:13px"><a href="mailto:${email.trim()}" style="color:#E06B1F">${email.trim()}</a></td></tr>
    ${telephone?.trim() ? `<tr><td style="padding:7px 14px;background:#f5f2ee;font-weight:600;font-size:13px">Téléphone</td><td style="padding:7px 14px;font-size:13px"><a href="tel:${telephone.trim()}" style="color:#E06B1F">${telephone.trim()}</a></td></tr>` : ''}
    <tr><td style="padding:7px 14px;background:#f5f2ee;font-weight:600;font-size:13px">Message</td><td style="padding:7px 14px;font-size:13px">${message.trim().replace(/\n/g, '<br>')}</td></tr>
  </table>
</div>`,
      }),
    })
    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      console.error('Resend API error (contact):', emailRes.status, errBody)
      return res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' })
    }
  } catch (emailErr) {
    console.error('Resend fetch error (contact):', emailErr)
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' })
  }

  return res.status(200).json({ success: true })
}
