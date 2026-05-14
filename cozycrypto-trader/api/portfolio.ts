import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

const BASE = 'https://api.bitget.com'
const KEY  = process.env.BITGET_API_KEY    || ''
const SEC  = process.env.BITGET_SECRET_KEY || ''
const PASS = process.env.BITGET_PASSPHRASE || ''

function sign(ts: string, method: string, path: string, body = '') {
  return crypto.createHmac('sha256', SEC).update(ts + method + path + body).digest('base64')
}

function headers(method: string, path: string, body = '') {
  const ts = Date.now().toString()
  return { 'ACCESS-KEY': KEY, 'ACCESS-SIGN': sign(ts, method, path, body),
           'ACCESS-TIMESTAMP': ts, 'ACCESS-PASSPHRASE': PASS, 'Content-Type': 'application/json', 'locale':'en-US' }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (!KEY) return res.status(200).json({ value:0, balance:0, change:0, history:[], assets:[], mode:'no_keys', message:'Add Bitget API keys to Vercel environment variables' })

  try {
    const path = '/api/v2/spot/account/assets'
    const r = await fetch(BASE + path, { headers: headers('GET', path) as any, signal: AbortSignal.timeout(10000) })
    if (!r.ok) return res.status(200).json({ value:0, balance:0, change:0, history:[], assets:[], mode:'api_error' })
    const d = await r.json() as any
    const assets = (d.data || []).filter((a: any) => parseFloat(a.available||'0') > 0 || parseFloat(a.usdtValue||'0') > 0.001)
    const total   = assets.reduce((s: number, a: any) => s + parseFloat(a.usdtValue||'0'), 0)
    const usdt    = assets.find((a: any) => a.coinName === 'USDT')?.available || '0'
    return res.status(200).json({
      value:   Math.round(total * 10000) / 10000,
      balance: parseFloat(usdt),
      change:  0,
      history: [],
      assets:  assets.map((a: any) => ({ coin: a.coinName, available: parseFloat(a.available), usd_value: parseFloat(a.usdtValue||'0') })),
      micro_mode: total < 10,
      mode: 'live'
    })
  } catch (err: any) {
    return res.status(200).json({ value:0, balance:0, change:0, history:[], assets:[], mode:'error', message: err.message })
  }
}
