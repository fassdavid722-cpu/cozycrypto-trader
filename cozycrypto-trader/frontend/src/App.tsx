import React, { useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import AIModeBar from '@/components/layout/AIModeBar'
import Dashboard from '@/components/pages/Dashboard'
import MarketOverview from '@/components/pages/MarketOverview'
import Portfolio from '@/components/pages/Portfolio'
import AIChat from '@/components/pages/AIChat'
import Workflows from '@/components/pages/Workflows'
import Settings from '@/components/pages/Settings'
import { useStore } from '@/store/useStore'

function PageContent() {
  const { activeTab } = useStore()
  switch (activeTab) {
    case 'dashboard': return <Dashboard />
    case 'ai-chat': return <AIChat />
    case 'market': return <MarketOverview />
    case 'portfolio': return <Portfolio />
    case 'workflows': return <Workflows />
    case 'settings': return <Settings />
    default: return <Dashboard />
  }
}

export default function App() {
  const { setTickers, setPortfolio, setWorkflows, addAlert, setAiStatus } = useStore()

  useEffect(() => {
    // Initial data fetch
    fetchMarketData()
    fetchPortfolio()
    fetchWorkflows()

    // Poll market data every 10 seconds
    const marketInterval = setInterval(fetchMarketData, 10000)
    const portfolioInterval = setInterval(fetchPortfolio, 30000)

    return () => {
      clearInterval(marketInterval)
      clearInterval(portfolioInterval)
    }
  }, [])

  const fetchMarketData = async () => {
    try {
      const res = await fetch('/api/market/tickers')
      if (res.ok) {
        const data = await res.json()
        setTickers(data.tickers || [])
      }
    } catch {
      // Silently fail — will retry
    }
  }

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio')
      if (res.ok) {
        const data = await res.json()
        setPortfolio(data.value || 0, data.change || 0, data.history || [], data.balance || 0)
      }
    } catch {
      // Silently fail
    }
  }

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows')
      if (res.ok) {
        const data = await res.json()
        setWorkflows(data.workflows || [])
      }
    } catch {
      setWorkflows([
        { id: '1', name: 'Market Scanner', description: 'Scanning top 50 coins', status: 'running' },
        { id: '2', name: 'Trading Signal Bot', description: 'Monitoring 12 pairs', status: 'running' },
        { id: '3', name: 'News & Sentiment', description: 'Analyzing global sentiment', status: 'running' },
        { id: '4', name: 'Portfolio Rebalancer', description: 'Next run in 2h 15m', status: 'scheduled' },
      ])
    }
  }

  return (
    <div className="flex h-screen w-screen bg-bg-primary overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-hidden p-4">
          <PageContent />
        </main>
        <AIModeBar />
      </div>
    </div>
  )
}
