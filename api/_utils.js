import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )
}

export function hashIp(ip) {
  return crypto
    .createHash('sha256')
    .update(ip + (process.env.SUPABASE_URL ?? ''))
    .digest('hex')
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  return forwarded
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress ?? 'unknown'
}

/** @returns {boolean} true = autorisé, false = rate-limité */
export async function checkRateLimit(supabase, ipHash, endpoint, limit = 5, windowSecs = 300) {
  const since = new Date(Date.now() - windowSecs * 1000).toISOString()

  const { count } = await supabase
    .from('rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .eq('endpoint', endpoint)
    .gte('created_at', since)

  if (count >= limit) return false

  await supabase.from('rate_limits').insert({ ip_hash: ipHash, endpoint })
  return true
}

export function validateHoneypot(body) {
  return !body.honeypot // champ vide = humain
}

export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res)
    res.status(204).end()
    return true
  }
  return false
}
