import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method === 'POST') {
    // In production, these would update env vars or a secure store
    // For now we acknowledge the save
    return res.status(200).json({ success: true, message: 'Settings acknowledged. Update your Vercel env vars for persistence.' })
  }

  return res.status(200).json({
    risk: {
      maxTradePercent: parseInt(process.env.MAX_TRADE_PERCENT || '10'),
      stopLoss: parseFloat(process.env.STOP_LOSS_PERCENT || '2'),
      takeProfit: parseFloat(process.env.TAKE_PROFIT_PERCENT || '4'),
      maxOpenTrades: parseInt(process.env.MAX_OPEN_TRADES || '3'),
    },
    connected: {
      bitget: !!process.env.BITGET_API_KEY,
      groq: !!process.env.GROQ_API_KEY,
    }
  })
}
