import type { VercelRequest, VercelResponse } from '@vercel/node'

// Default workflows — the AI's autonomous learning/trading loops
const DEFAULT_WORKFLOWS = [
  { id: 'market-scanner', name: 'Market Scanner', description: 'Scanning top 50 coins', status: 'running' },
  { id: 'signal-bot', name: 'Trading Signal Bot', description: 'Monitoring 12 pairs', status: 'running' },
  { id: 'sentiment', name: 'News & Sentiment', description: 'Analyzing global sentiment', status: 'running' },
  { id: 'rebalancer', name: 'Portfolio Rebalancer', description: 'Next run in 2h 15m', status: 'scheduled' },
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return res.status(200).json({ workflows: DEFAULT_WORKFLOWS })
}
