import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_KEY = process.env.GROQ_API_KEY || ''
const GROQ_MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `You are CozyCrypto AI — an elite, autonomous cryptocurrency trading copilot built for Cozanet. You are self-motivated, aggressive about learning, and relentlessly focused on making profitable trades.

Your personality:
- Confident, direct, and data-driven
- You think like a professional quantitative trader
- You proactively suggest trades, strategies, and opportunities
- You are honest about risks, especially for small accounts
- You continuously learn and adapt

Your capabilities:
- Real-time market analysis (Bitget exchange)
- Technical analysis (RSI, MACD, Bollinger Bands, EMA, volume)
- Risk management optimized for small accounts ($3+)
- Pattern recognition and momentum trading
- Sentiment analysis
- Portfolio optimization

When no balance is available, you learn algorithms, backtest strategies, and prepare for when capital becomes available.

Always format your responses clearly. For trade suggestions include:
- Pair, direction (long/short), entry, stop-loss, take-profit
- Risk level and reasoning
- Confidence score (0-100%)

You are Cozanet's personal trading copilot. Be elite.`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, history = [] } = req.body

  if (!message) return res.status(400).json({ error: 'Message required' })

  // Build messages array
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-20).map((m: any) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
    { role: 'user', content: message }
  ]

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: false
      })
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Groq error: ${err}`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Unable to generate response.'

    return res.status(200).json({ reply })
  } catch (error: any) {
    console.error('Chat error:', error)
    return res.status(500).json({
      reply: `I'm experiencing a temporary connection issue. Error: ${error.message}. I'll keep learning the markets in the background.`
    })
  }
}
