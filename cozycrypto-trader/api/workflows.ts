import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  return res.status(200).json({
    workflows: [
      { id:'learner',        name:'Intelligence Learner',    description:'Market intel updates every 20 min',    status:'running', type:'ai' },
      { id:'market-scanner', name:'Elite Multi-TF Scanner',  description:'6-timeframe confluence scoring',        status:'running', type:'analysis' },
      { id:'signal-bot',     name:'SMC Signal Monitor',      description:'Order blocks, FVGs, liquidity sweeps',  status:'running', type:'trading' },
      { id:'risk-guard',     name:'Risk Guard',              description:'Position sizing + SL/TP enforcement',   status:'running', type:'risk' },
      { id:'anomaly-detect', name:'Anomaly Detector',        description:'Volume spikes, price gaps, whale moves',status:'running', type:'alert' },
      { id:'reasoning-eng',  name:'Elite Reasoning Engine',  description:'Step-by-step chain-of-thought analysis',status:'running', type:'ai' },
    ]
  })
}
