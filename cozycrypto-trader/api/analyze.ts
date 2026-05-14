import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_KEY   = process.env.GROQ_API_KEY   || ''
const GROQ_KEY2  = process.env.GROQ_API_KEY_2 || ''
const GEMINI_KEY = process.env.GEMINI_API_KEY || ''
const BITGET_BASE = 'https://api.bitget.com'

// ── Technical indicators ─────────────────────────────────────────────────────
function calcRSI(prices: number[]): number {
  let g = 0, l = 0
  const s = prices.slice(-15)
  for (let i = 1; i < s.length; i++) { const d = s[i]-s[i-1]; if(d>0) g+=d; else l-=d }
  return 100 - 100/(1 + (g/14)/((l/14)||0.001))
}
function calcEMA(p: number[], period: number): number {
  const m = 2/(period+1); let e = p[0]
  for (let i=1;i<p.length;i++) e = p[i]*m + e*(1-m)
  return e
}
function calcMACD(p: number[]) {
  const macd = calcEMA(p,12) - calcEMA(p,26)
  return { macd, histogram: macd - calcEMA([macd],9) }
}
function calcBB(p: number[], period=20) {
  const sl = p.slice(-period)
  const mean = sl.reduce((a,b)=>a+b,0)/sl.length
  const std = Math.sqrt(sl.reduce((s,x)=>s+Math.pow(x-mean,2),0)/sl.length)
  return { upper: mean+2*std, middle: mean, lower: mean-2*std }
}
function identifyOrderBlocks(candles: any[]) {
  const obs: any[] = []
  for (let i = 2; i < candles.length - 1; i++) {
    const c = candles[i], n = candles[i+1]
    if (c.close < c.open && n.close > c.high) obs.push({ type:'bullish', level:(c.high+c.low)/2, high:c.high, low:c.low, strength:Math.abs(n.close-n.open)/n.open*100 })
    if (c.close > c.open && n.close < c.low)  obs.push({ type:'bearish', level:(c.high+c.low)/2, high:c.high, low:c.low, strength:Math.abs(n.open-n.close)/n.open*100 })
  }
  return obs.sort((a,b)=>b.strength-a.strength).slice(0,5)
}
function identifyFVGs(candles: any[]) {
  const fvgs: any[] = []
  for (let i = 1; i < candles.length; i++) {
    if (candles[i].low > candles[i-1].high)   fvgs.push({type:'bullish',high:candles[i].low,low:candles[i-1].high})
    else if (candles[i].high < candles[i-1].low) fvgs.push({type:'bearish',high:candles[i-1].low,low:candles[i].high})
  }
  return fvgs.slice(-8)
}
function detectAnomalies(candles: any[]) {
  const a: any[] = []
  if (candles.length < 10) return a
  const vols = candles.map(c=>c.volume||0)
  const avgVol = vols.slice(-20).reduce((x,y)=>x+y,0)/20
  const lastVol = vols[vols.length-1]
  if (lastVol > avgVol*3) a.push({type:'volume_spike',severity:'high',description:`Volume ${(lastVol/avgVol).toFixed(1)}x average`,actionRequired:true})
  const prices = candles.map(c=>c.close)
  const pct = Math.abs((prices[prices.length-1]-prices[prices.length-5])/prices[prices.length-5]*100)
  if (pct > 4) a.push({type:'rapid_move',severity:'medium',description:`${pct.toFixed(1)}% move in 5 candles`,actionRequired:true})
  return a
}
function analyzeTF(prices: number[]) {
  if (prices.length < 5) return null
  const ma20 = prices.slice(-20).reduce((a,b)=>a+b,0)/Math.min(20,prices.length)
  const ma50 = prices.slice(-50).reduce((a,b)=>a+b,0)/Math.min(50,prices.length)
  const last = prices[prices.length-1]
  const trend = (ma20>ma50&&last>ma20)?'uptrend':(ma20<ma50&&last<ma20)?'downtrend':'ranging'
  const rsi = calcRSI(prices)
  const macd = calcMACD(prices)
  const bb = calcBB(prices)
  let score = 50
  if (trend==='uptrend') score+=20; if(trend==='downtrend') score-=20
  if (rsi<30) score+=15; if(rsi>70) score-=15
  if (macd.histogram>0) score+=10; else score-=10
  return { trend, score:Math.max(0,Math.min(100,score)), rsi:Math.round(rsi), bb, support:[bb.lower], resistance:[bb.upper] }
}
async function getCandles(symbol: string, granularity: string, limit=100) {
  try {
    const r = await fetch(`${BITGET_BASE}/api/v2/spot/market/candles?symbol=${symbol}&granularity=${granularity}&limit=${limit}`, { signal: AbortSignal.timeout(8000) })
    if (!r.ok) return []
    const d = await r.json() as any
    return (d.data||[]).map((c:any)=>({time:parseInt(c[0]),open:parseFloat(c[1]),high:parseFloat(c[2]),low:parseFloat(c[3]),close:parseFloat(c[4]),volume:parseFloat(c[5])})).reverse()
  } catch { return [] }
}
async function callAI(messages: any[]) {
  for (const key of [GROQ_KEY, GROQ_KEY2].filter(Boolean)) {
    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},
        body:JSON.stringify({model:'llama-3.3-70b-versatile',messages,temperature:0.2,max_tokens:1200})
      })
      if (r.status===429) continue
      if (r.ok) { const d = await r.json() as any; return d.choices[0].message.content }
    } catch {}
  }
  if (GEMINI_KEY) {
    try {
      const contents = messages.filter(m=>m.role!=='system').map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]}))
      const sys = messages.find(m=>m.role==='system')?.content||''
      const body: any = {contents,generationConfig:{maxOutputTokens:1200,temperature:0.2}}
      if(sys) body.systemInstruction={parts:[{text:sys}]}
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      if(r.ok){const d=await r.json() as any;return d.candidates[0].content.parts[0].text}
    } catch {}
  }
  return 'Analysis unavailable — check API keys'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  try {
    const { symbol = 'BTCUSDT', balance = 10 } = req.body || {}
    const sym = symbol.replace('/','').toUpperCase()
    const [c1h, c4h, c1d, c15m] = await Promise.all([
      getCandles(sym,'1H',100), getCandles(sym,'4H',60),
      getCandles(sym,'1D',60),  getCandles(sym,'15m',60),
    ])
    const tf1h  = analyzeTF(c1h.map((c:any)=>c.close))
    const tf4h  = analyzeTF(c4h.map((c:any)=>c.close))
    const tf1d  = analyzeTF(c1d.map((c:any)=>c.close))
    const tf15m = analyzeTF(c15m.map((c:any)=>c.close))
    const scores = [tf1h,tf4h,tf1d,tf15m].filter(Boolean).map((t:any)=>t.score)
    const avg = scores.length ? scores.reduce((a,b)=>a+b,0)/scores.length : 50
    const alignment = avg>65?'BULLISH':avg<35?'BEARISH':Math.abs(avg-50)<10?'NEUTRAL':'MIXED'
    const confluence = Math.round(Math.max(scores.filter(s=>s>60).length,scores.filter(s=>s<40).length)/Math.max(scores.length,1)*100)
    const currentPrice = c1h.length ? c1h[c1h.length-1].close : 0
    const orderBlocks = identifyOrderBlocks(c1h.slice(-50))
    const fvgs = identifyFVGs(c1h.slice(-30))
    const anomalies = detectAnomalies(c1h)
    const slPct=0.02, tp1Pct=0.04, tp2Pct=0.08
    const sl  = alignment==='BULLISH'?currentPrice*(1-slPct):currentPrice*(1+slPct)
    const tp1 = alignment==='BULLISH'?currentPrice*(1+tp1Pct):currentPrice*(1-tp1Pct)
    const tp2 = alignment==='BULLISH'?currentPrice*(1+tp2Pct):currentPrice*(1-tp2Pct)
    const messages = [
      {role:'system',content:'You are an elite crypto analyst using SMC and multi-timeframe confluence. Use step-by-step reasoning. Be specific with numbers. Use emojis.'},
      {role:'user',content:`Elite analysis for ${sym}:\n\nCurrent: $${currentPrice.toFixed(4)}\nAlignment: ${alignment} (${confluence}% confluence)\n15M: ${tf15m?.trend||'N/A'} | Score:${tf15m?.score||'?'} | RSI:${tf15m?.rsi||'?'}\n1H: ${tf1h?.trend||'N/A'} | Score:${tf1h?.score||'?'} | RSI:${tf1h?.rsi||'?'}\n4H: ${tf4h?.trend||'N/A'} | Score:${tf4h?.score||'?'} | RSI:${tf4h?.rsi||'?'}\n1D: ${tf1d?.trend||'N/A'} | Score:${tf1d?.score||'?'} | RSI:${tf1d?.rsi||'?'}\nOrder Blocks: ${orderBlocks.slice(0,3).map((o:any)=>`${o.type}@$${o.level.toFixed(2)}`).join(', ')||'none'}\nFVGs: ${fvgs.slice(0,3).map((f:any)=>`${f.type}@$${f.low.toFixed(2)}`).join(', ')||'none'}\nAnomalies: ${anomalies.map((a:any)=>a.description).join(', ')||'none'}\nAccount: $${balance} USDT\n\nProvide:\n1. 🧠 REASONING CHAIN\n2. 📊 MTF SUMMARY\n3. 🎯 ENTRY + confidence%\n4. 🛡️ SL + TP1/TP2\n5. 📐 POSITION SIZE\n6. 🏆 COMPETITIVE EDGE`}
    ]
    const analysis = await callAI(messages)
    return res.status(200).json({
      symbol:sym, currentPrice, alignment, confluenceScore:confluence,
      multiTimeframe:{'15m':tf15m,'1h':tf1h,'4h':tf4h,'1d':tf1d},
      orderBlocks, fvgs, anomalies,
      suggestedTrade:{side:alignment==='BULLISH'?'buy':alignment==='BEARISH'?'sell':'wait',entry:currentPrice,sl,tp1,tp2,rr:tp1Pct/slPct,confidence:confluence},
      analysis
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
