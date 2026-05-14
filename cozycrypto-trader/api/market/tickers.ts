import type { VercelRequest, VercelResponse } from '@vercel/node'

// Fetch real market data from Bitget public API (no auth needed)
const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'LINKUSDT', 'MATICUSDT', 'ADAUSDT', 'DOGEUSDT', 'AVAXUSDT']

function generateSparkline(basePrice: number, change: number, points = 20): number[] {
  const spark = []
  let p = basePrice * (1 - change / 100)
  for (let i = 0; i < points; i++) {
    p += (Math.random() - 0.48) * (basePrice * 0.002)
    spark.push(parseFloat(p.toFixed(4)))
  }
  spark.push(basePrice)
  return spark
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=10')

  try {
    // Fetch from Bitget public API
    const tickerPromises = SYMBOLS.map(sym =>
      fetch(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${sym}`)
        .then(r => r.json())
        .catch(() => null)
    )

    const results = await Promise.all(tickerPromises)

    const tickers = results
      .filter(r => r?.data?.[0])
      .map(r => {
        const t = r.data[0]
        const price = parseFloat(t.lastPr || t.last || 0)
        const change = parseFloat(t.change24h || t.changeUtc24h || 0) * 100
        return {
          symbol: t.symbol.replace('_SPBL', '').replace('USDT', '/USDT').replace('BTC/USDT', 'BTC/USDT'),
          price,
          change24h: parseFloat(change.toFixed(2)),
          volume: parseFloat(t.usdtVolume || t.quoteVol || 0),
          high24h: parseFloat(t.high24h || 0),
          low24h: parseFloat(t.low24h || 0),
          sparkline: generateSparkline(price, change)
        }
      })

    if (tickers.length === 0) throw new Error('No data from Bitget')

    return res.status(200).json({ tickers })
  } catch (error) {
    // Fallback: try CoinGecko free API
    try {
      const cgRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,chainlink,matic-network,cardano,dogecoin,avalanche-2&order=market_cap_desc&sparkline=true&price_change_percentage=24h')
      const cgData = await cgRes.json()

      const symbolMap: Record<string, string> = {
        bitcoin: 'BTC/USDT', ethereum: 'ETH/USDT', solana: 'SOL/USDT',
        binancecoin: 'BNB/USDT', ripple: 'XRP/USDT', chainlink: 'LINK/USDT',
        'matic-network': 'MATIC/USDT', cardano: 'ADA/USDT', dogecoin: 'DOGE/USDT',
        'avalanche-2': 'AVAX/USDT'
      }

      const tickers = cgData.map((c: any) => ({
        symbol: symbolMap[c.id] || c.symbol.toUpperCase() + '/USDT',
        price: c.current_price,
        change24h: parseFloat((c.price_change_percentage_24h || 0).toFixed(2)),
        volume: c.total_volume || 0,
        high24h: c.high_24h || 0,
        low24h: c.low_24h || 0,
        sparkline: c.sparkline_in_7d?.price?.slice(-20) || []
      }))

      return res.status(200).json({ tickers })
    } catch {
      return res.status(500).json({ error: 'Failed to fetch market data', tickers: [] })
    }
  }
}
