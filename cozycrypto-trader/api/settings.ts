import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  return res.status(200).json({
    version: '2.0.0',
    connected: {
      bitget:  !!process.env.BITGET_API_KEY,
      groq:    !!process.env.GROQ_API_KEY,
      groq2:   !!process.env.GROQ_API_KEY_2,
      gemini:  !!process.env.GEMINI_API_KEY,
      telegram:!!process.env.TELEGRAM_BOT_TOKEN,
    },
    risk: {
      maxTradePercent: parseFloat(process.env.MAX_TRADE_PERCENT   || '10'),
      stopLoss:        parseFloat(process.env.STOP_LOSS_PERCENT   || '2'),
      takeProfit:      parseFloat(process.env.TAKE_PROFIT_PERCENT || '4'),
      maxOpenTrades:   parseInt(  process.env.MAX_OPEN_TRADES     || '3'),
    },
    brains: ['Trade (llama-3.3-70b)', 'Code (llama-3.3-70b)', 'Long (llama-4-scout)', 'Fast (llama-3.1-8b)', 'Math (qwen3-32b)', 'Gemini (fallback)'],
    eliteFeatures: ['Multi-Timeframe Scanner (6TF)', 'SMC Analysis (OB/FVG/BOS)', 'Elite Reasoning Engine', 'Anomaly Detector', 'Step-by-step chain-of-thought']
  })
}
