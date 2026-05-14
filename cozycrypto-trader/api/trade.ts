import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

const BASE = 'https://api.bitget.com'
const KEY  = process.env.BITGET_API_KEY    || ''
const SEC  = process.env.BITGET_SECRET_KEY || ''
const PASS = process.env.BITGET_PASSPHRASE || ''

const MAX_PCT   = parseFloat(process.env.MAX_TRADE_PERCENT   || '10')
const SL_PCT    = parseFloat(process.env.STOP_LOSS_PERCENT   || '2')
const TP_PCT    = parseFloat(process.env.TAKE_PROFIT_PERCENT || '4')

function sign(ts: string, method: string, path: string, body = '') {
  return crypto.createHmac('sha256', SEC).update(ts + method + path + body).digest('base64')
}

function authHeaders(method: string, path: string, body = '') {
  const ts = Date.now().toString()
  return { 'ACCESS-KEY': KEY, 'ACCESS-SIGN': sign(ts, method, path, body),
           'ACCESS-TIMESTAMP': ts, 'ACCESS-PASSPHRASE': PASS, 'Content-Type': 'application/json', 'locale':'en-US' }
}

async function getPrice(symbol: string): Promise<number> {
  try {
    const r = await fetch(`${BASE}/api/v2/spot/market/tickers?symbol=${symbol}`, { signal: AbortSignal.timeout(8000) })
    if (!r.ok) return 0
    const d = await r.json() as any
    return parseFloat(d.data?.[0]?.lastPr || '0')
  } catch { return 0 }
}

async function getUSDTBalance(): Promise<number> {
  try {
    const path = '/api/v2/spot/account/assets'
    const r = await fetch(BASE + path, { headers: authHeaders('GET', path) as any, signal: AbortSignal.timeout(8000) })
    if (!r.ok) return 0
    const d = await r.json() as any
    const usdt = (d.data||[]).find((a: any) => a.coinName === 'USDT')
    return parseFloat(usdt?.available || '0')
  } catch { return 0 }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { symbol, side, size, order_type = 'market', price: limitPrice, reason = '' } = req.body || {}
    if (!symbol || !side) return res.status(400).json({ error: 'symbol and side required' })

    const sym = symbol.replace('/', '').toUpperCase()

    // Simulation mode if no keys
    if (!KEY) {
      const mockPrice = await getPrice(sym) || 50000
      const mockSize = size || 0.001
      return res.status(200).json({
        success: true, simulated: true,
        message: `[SIMULATION] ${side.toUpperCase()} ${mockSize} ${sym} @ $${mockPrice.toLocaleString()}`,
        orderId: `sim_${Date.now()}`,
        entry: mockPrice,
        sl: side==='buy' ? mockPrice*(1-SL_PCT/100) : mockPrice*(1+SL_PCT/100),
        tp: side==='buy' ? mockPrice*(1+TP_PCT/100) : mockPrice*(1-TP_PCT/100),
      })
    }

    // Get price + balance
    const [price, balance] = await Promise.all([getPrice(sym), getUSDTBalance()])
    if (!price) return res.status(400).json({ error: 'Could not fetch price' })

    // Calculate size if not provided
    let tradeSize = size
    if (!tradeSize) {
      const tradeUsdt = Math.max(2, balance * MAX_PCT / 100) // min $2
      tradeSize = tradeUsdt / price
      // Round precision
      tradeSize = price > 1000 ? Math.round(tradeSize * 100000) / 100000
               : price > 1    ? Math.round(tradeSize * 10000)  / 10000
               : Math.round(tradeSize * 100) / 100
    }

    const body = JSON.stringify({ symbol: sym, side: side.toLowerCase(), orderType: order_type, size: String(tradeSize), force: 'gtc',
      ...(limitPrice && order_type === 'limit' ? { price: String(limitPrice) } : {}) })
    const path = '/api/v2/spot/trade/place-order'
    const r = await fetch(BASE + path, { method:'POST', headers: authHeaders('POST', path, body) as any, body, signal: AbortSignal.timeout(10000) })
    const d = await r.json() as any

    if (d.code === '00000') {
      return res.status(200).json({
        success: true, simulated: false,
        orderId: d.data?.orderId || '',
        message: `${side.toUpperCase()} ${tradeSize} ${sym} placed`,
        entry: price,
        sl: side==='buy' ? price*(1-SL_PCT/100) : price*(1+SL_PCT/100),
        tp: side==='buy' ? price*(1+TP_PCT/100) : price*(1-TP_PCT/100),
        reason,
      })
    }
    return res.status(200).json({ success: false, message: d.msg || 'Order failed', code: d.code })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
