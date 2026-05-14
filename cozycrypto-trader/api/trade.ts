import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

const BITGET_KEY = process.env.BITGET_API_KEY || ''
const BITGET_SECRET = process.env.BITGET_SECRET_KEY || ''
const BITGET_PASSPHRASE = process.env.BITGET_PASSPHRASE || ''
const BASE_URL = 'https://api.bitget.com'

function sign(timestamp: string, method: string, path: string, body = ''): string {
  return crypto.createHmac('sha256', BITGET_SECRET)
    .update(timestamp + method.toUpperCase() + path + body)
    .digest('base64')
}

async function placeOrder(symbol: string, side: 'buy' | 'sell', size: string, orderType: 'market' | 'limit' = 'market', price?: string) {
  const path = '/api/v2/spot/trade/place-order'
  const timestamp = Date.now().toString()
  const body = JSON.stringify({
    symbol,
    side,
    orderType,
    size,
    ...(price && { price }),
    force: 'gtc'
  })

  const signature = sign(timestamp, 'POST', path, body)

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'ACCESS-KEY': BITGET_KEY,
      'ACCESS-SIGN': signature,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-PASSPHRASE': BITGET_PASSPHRASE,
      'Content-Type': 'application/json',
      'locale': 'en-US'
    },
    body
  })

  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (!BITGET_KEY) {
    return res.status(200).json({
      success: false,
      mode: 'learning',
      message: 'No API keys — AI is in learning mode. Trade simulated.'
    })
  }

  const { symbol, side, size, orderType = 'market', price } = req.body

  if (!symbol || !side || !size) {
    return res.status(400).json({ error: 'symbol, side, size required' })
  }

  try {
    const result = await placeOrder(symbol, side, size.toString(), orderType, price)

    if (result.code === '00000') {
      return res.status(200).json({
        success: true,
        orderId: result.data?.orderId,
        message: `${side.toUpperCase()} ${size} ${symbol} placed successfully`
      })
    } else {
      return res.status(200).json({
        success: false,
        message: result.msg || 'Order failed',
        code: result.code
      })
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
