import { Resend } from 'resend'
import { getSupabaseAdmin, hashIp, getClientIp, checkRateLimit, validateHoneypot, setCorsHeaders, handleOptions } from './_utils.js'
import { ESTIMATION_CONFIG as C } from '../src/config/estimation.js'

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

  const leadRow = {
    source:    'contact',
    nom:       nom.trim(),
    email:     email.trim(),
    telephone: telephone?.trim() ?? null,
    message:   message.trim(),
    consentement:    false,
    consentement_at: null,
    ip_hash:   ipHash,
  }

  const { error: dbError } = await supabase.from('leads').insert(leadRow)
  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: 'Erreur lors de l\'envoi.' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from:    'notifications@coutant-immobilier-vendee.fr',
      to:      process.env.EMAIL_TO,
      subject: `[Contact] Message de ${nom.trim()}`,
      html: `
<h2 style="font-family:sans-serif">Nouveau message de contact</h2>
<table style="font-family:sans-serif;border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Nom</td><td style="padding:6px 12px">${nom.trim()}</td></tr>
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Email</td><td style="padding:6px 12px">${email.trim()}</td></tr>
  ${telephone ? `<tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Téléphone</td><td style="padding:6px 12px">${telephone.trim()}</td></tr>` : ''}
  <tr><td style="padding:6px 12px;background:#f5f2ee;font-weight:600">Message</td><td style="padding:6px 12px">${message.trim().replace(/\n/g, '<br>')}</td></tr>
</table>
      `,
      replyTo: email.trim(),
    })
  } catch (emailErr) {
    console.error('Resend error:', emailErr)
  }

  return res.status(200).json({ success: true })
}
