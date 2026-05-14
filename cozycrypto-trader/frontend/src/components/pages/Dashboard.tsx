import React, { useState, useRef, useEffect } from 'react'
import { BarChart2, Scan, Briefcase, Workflow, TrendingUp, TrendingDown, Send, Mic, Paperclip, Globe, Sparkles, Play, ChevronRight, AlertCircle } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { useStore } from '@/store/useStore'
import Card from '@/components/ui/Card'
import MiniChart from '@/components/ui/MiniChart'
import Logo from '@/components/layout/Logo'

const quickActions = [
  { icon: BarChart2, label: 'Analyze Market', color: 'text-blue-ai' },
  { icon: Scan, label: 'Scan Opportunities', color: 'text-gold' },
  { icon: Briefcase, label: 'Check Portfolio', color: 'text-green-trade' },
  { icon: Workflow, label: 'Run Workflows', color: 'text-purple-400' },
]

export default function Dashboard() {
  const {
    tickers, watchlist, portfolioValue, portfolioChange, portfolioHistory,
    workflows, alerts, messages, addMessage, isThinking, setThinking,
    aiStatus, setActiveTab
  } = useStore()

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const displayMessages = messages.slice(-5)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const msg = input.trim()
    setInput('')
    addMessage({ id: Date.now().toString(), role: 'user', content: msg, timestamp: Date.now() })
    setThinking(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages.slice(-10) })
      })
      const data = await res.json()
      addMessage({ id: (Date.now()+1).toString(), role: 'ai', content: data.reply, timestamp: Date.now() })
    } catch {
      addMessage({ id: (Date.now()+1).toString(), role: 'ai', content: "I'm analyzing the markets. Connection issue — retrying shortly.", timestamp: Date.now() })
    } finally {
      setThinking(false)
    }
  }

  const watchlistTickers = tickers.filter(t => watchlist.includes(t.symbol))
  const marketTickers = tickers.slice(0, 5)
  const unreadAlerts = alerts.filter(a => !a.read).slice(0, 3)
  const activeWorkflows = workflows.filter(w => w.status === 'running' || w.status === 'scheduled').slice(0, 4)

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      {/* LEFT: AI Chat + Workflows + Portfolio */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-w-0">
        {/* AI Chat Card */}
        <Card glow="gold" className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Logo size={20} showText={false} />
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Cozanet AI</span>
            <span className={`ml-auto w-2 h-2 rounded-full pulse-dot ${aiStatus === 'online' ? 'bg-green-trade' : 'bg-gold'}`} />
          </div>

          {/* Messages */}
          <div className="min-h-[120px] max-h-[160px] overflow-y-auto mb-3 space-y-2">
            {displayMessages.length === 0 ? (
              <div className="bg-bg-secondary rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <span className="text-gold text-[10px] font-bold">C</span>
                  </div>
                  <span className="text-white text-xs font-medium">Good morning, Cozanet.</span>
                  <span className="ml-auto text-text-muted text-[10px] font-mono">{new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
                </div>
                <p className="text-text-secondary text-xs mb-2">Here's your market & workflow summary.</p>
                <div className="space-y-1">
                  {[
                    { icon: '📈', text: 'BTC is showing bullish momentum', color: 'text-green-trade' },
                    { icon: '⚙️', text: `${activeWorkflows.length} active workflows running`, color: 'text-blue-ai' },
                    { icon: '🎯', text: 'No critical alerts at the moment', color: 'text-text-secondary' },
                    { icon: '💼', text: `Portfolio ${portfolioChange >= 0 ? 'up' : 'down'} ${Math.abs(portfolioChange).toFixed(2)}% today`, color: portfolioChange >= 0 ? 'text-green-trade' : 'text-red-trade' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2 text-[11px] ${item.color}`}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              displayMessages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                    m.role === 'user'
                      ? 'bg-gold/20 text-white border border-gold/20'
                      : 'bg-bg-secondary text-text-secondary border border-bg-border'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-bg-secondary rounded-lg px-3 py-2 text-xs border border-bg-border">
                  <span className="ai-thinking">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {quickActions.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                onClick={() => { setInput(label); }}
                className="flex flex-col items-center gap-1 p-2 bg-bg-secondary rounded-lg hover:bg-bg-border transition-colors border border-bg-border"
              >
                <Icon size={14} className={color} />
                <span className="text-[9px] text-text-secondary text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="relative">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything... (e.g., Analyze BTC, Create alert, Build strategy)"
              className="w-full bg-bg-secondary border border-bg-border rounded-lg pl-3 pr-24 py-2.5 text-xs text-white placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button className="p-1 hover:text-gold text-text-muted transition-colors"><Paperclip size={13} /></button>
              <button className="p-1 hover:text-gold text-text-muted transition-colors"><Globe size={13} /></button>
              <button className="p-1 hover:text-gold text-text-muted transition-colors"><Sparkles size={13} /></button>
              <button className="p-1 hover:text-gold text-text-muted transition-colors"><Mic size={13} /></button>
              <button
                onClick={sendMessage}
                className="p-1.5 bg-gold rounded-md hover:bg-gold-dim transition-colors"
              >
                <Send size={12} className="text-black" />
              </button>
            </div>
          </div>
        </Card>

        {/* Workflows + Portfolio row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Active Workflows */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Active Workflows</span>
              <button onClick={() => setActiveTab('workflows')} className="text-text-muted text-[10px] hover:text-gold transition-colors">View all</button>
            </div>
            <div className="space-y-2">
              {activeWorkflows.length === 0 ? (
                <p className="text-text-muted text-xs">No active workflows</p>
              ) : activeWorkflows.map(wf => (
                <div key={wf.id} className="flex items-center gap-2 py-1">
                  <div className="w-6 h-6 rounded bg-bg-border flex items-center justify-center">
                    <BarChart2 size={12} className="text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{wf.name}</p>
                    <p className="text-text-muted text-[10px] truncate">{wf.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                      wf.status === 'running' ? 'bg-green-trade/20 text-green-trade' :
                      wf.status === 'scheduled' ? 'bg-blue-ai/20 text-blue-ai' :
                      'bg-text-muted/20 text-text-muted'
                    }`}>
                      {wf.status === 'running' ? 'Running' : wf.status === 'scheduled' ? 'Scheduled' : wf.status}
                    </span>
                    <button className="p-1 hover:text-gold text-text-muted"><Play size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Summary */}
          <Card>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Portfolio Summary</span>
              <button onClick={() => setActiveTab('portfolio')} className="text-text-muted text-[10px] hover:text-gold transition-colors">View all</button>
            </div>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-text-secondary text-[10px]">Total Value</p>
                <p className="text-white text-xl font-bold font-mono">
                  ${portfolioValue > 0 ? portfolioValue.toLocaleString('en-US', {minimumFractionDigits: 2}) : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary text-[10px]">24H Change</p>
                <p className={`text-sm font-bold font-mono ${portfolioChange >= 0 ? 'text-green-trade' : 'text-red-trade'}`}>
                  {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="h-20">
              {portfolioHistory.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioHistory} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4A1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00D4A1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <Tooltip
                      contentStyle={{ background: '#16161E', border: '1px solid #1E1E2A', borderRadius: 8, fontSize: 11 }}
                      formatter={(v: number) => [`$${v.toFixed(2)}`, 'Value']}
                    />
                    <Area type="monotone" dataKey="value" stroke="#00D4A1" fill="url(#portfolioGrad)" strokeWidth={1.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-text-muted text-xs">No portfolio data yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* RIGHT: Market + Alerts + Watchlist */}
      <div className="w-72 flex flex-col gap-4 overflow-y-auto shrink-0">
        {/* Market Overview */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Market Overview</span>
            <button onClick={() => setActiveTab('market')} className="text-text-muted text-[10px] hover:text-gold transition-colors">View all</button>
          </div>
          <div className="space-y-2">
            {marketTickers.length === 0 ? (
              ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT'].map(sym => (
                <div key={sym} className="flex items-center gap-2 py-1">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-gold">{sym[0]}</span>
                  </div>
                  <span className="text-white text-xs flex-1">{sym}</span>
                  <div className="w-12 h-4 bg-bg-border rounded animate-pulse" />
                  <div className="w-10 h-4 bg-bg-border rounded animate-pulse" />
                </div>
              ))
            ) : marketTickers.map(t => (
              <div key={t.symbol} className="flex items-center gap-2 py-0.5">
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-gold">{t.symbol[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs">{t.symbol}</p>
                </div>
                <MiniChart data={t.sparkline || []} color={t.change24h >= 0 ? '#00D4A1' : '#FF4757'} width={50} height={20} />
                <div className="text-right w-20">
                  <p className="text-white text-[11px] font-mono">${t.price.toLocaleString()}</p>
                  <p className={`text-[10px] font-mono ${t.change24h >= 0 ? 'text-green-trade' : 'text-red-trade'}`}>
                    {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Alerts */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Active Alerts</span>
            <button onClick={() => setActiveTab('alerts')} className="text-text-muted text-[10px] hover:text-gold transition-colors">View all</button>
          </div>
          <div className="space-y-2">
            {unreadAlerts.length === 0 ? (
              <p className="text-text-muted text-xs">No active alerts</p>
            ) : unreadAlerts.map(a => (
              <div key={a.id} className="flex items-start gap-2">
                <AlertCircle size={13} className={
                  a.type === 'danger' ? 'text-red-trade mt-0.5' :
                  a.type === 'warning' ? 'text-gold mt-0.5' : 'text-green-trade mt-0.5'
                } />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[11px] leading-tight">{a.message}</p>
                  <p className="text-text-muted text-[10px] mt-0.5">
                    {Math.round((Date.now() - a.timestamp) / 60000)}m ago
                    <span className={`ml-2 w-1.5 h-1.5 rounded-full inline-block ${
                      a.type === 'danger' ? 'bg-red-trade' : a.type === 'warning' ? 'bg-gold' : 'bg-green-trade'
                    }`} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Watchlist */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Watchlist</span>
            <button className="text-text-muted text-[10px] hover:text-gold transition-colors">View all</button>
          </div>
          <div className="space-y-2">
            {(watchlistTickers.length > 0 ? watchlistTickers : watchlist.slice(0,5).map(s => ({ symbol: s, price: 0, change24h: 0, volume: 0, high24h: 0, low24h: 0 }))).map(t => (
              <div key={t.symbol} className="flex items-center gap-2 py-0.5">
                <div className="w-5 h-5 rounded-full bg-blue-ai/20 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-blue-ai">{t.symbol[0]}</span>
                </div>
                <span className="text-white text-xs flex-1">{t.symbol}</span>
                {t.price > 0 ? (
                  <>
                    <span className="text-white text-[11px] font-mono">${t.price.toLocaleString()}</span>
                    <span className={`text-[10px] font-mono w-14 text-right ${t.change24h >= 0 ? 'text-green-trade' : 'text-red-trade'}`}>
                      {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <div className="w-20 h-4 bg-bg-border rounded animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
