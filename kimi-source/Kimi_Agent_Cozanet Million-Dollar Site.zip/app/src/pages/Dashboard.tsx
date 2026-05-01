import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, List, Users, Bookmark, BarChart3, Star, Settings,
  Play, Trophy, Database, ShieldCheck, Clock, Lock
} from 'lucide-react'
import RouteFinder from '@/components/RouteFinder'
import AIInsight from '@/components/AIInsight'

const sidebarItems = [
  { icon: Shield, label: 'Aegis', sub: 'Wallet Funding', active: true },
  { icon: List, label: 'Transactions', sub: '', active: false },
  { icon: Users, label: 'Beneficiaries', sub: '', active: false },
  { icon: Bookmark, label: 'Saved Routes', sub: '', active: false },
  { icon: BarChart3, label: 'Price Monitor', sub: '', active: false, badge: 'New' },
  { icon: Star, label: 'Rewards', sub: '', active: false, badge: 'Beta' },
  { icon: Settings, label: 'Settings', sub: '', active: false },
]

const trustItems = [
  { icon: Trophy, title: 'Best Price Guarantee', desc: 'We compare 20+ providers' },
  { icon: Database, title: 'No Hidden Fees', desc: '100% transparent pricing' },
  { icon: Clock, title: 'Real-time Data', desc: 'Live rates & availability' },
  { icon: Lock, title: 'Secure & Trusted', desc: 'Your safety is our priority' },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-deep-space border-r border-white/[0.08] z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-gold to-neon-lime flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-white text-lg">Cozanet</span>
              <p className="font-mono text-[11px] uppercase text-neon-gold tracking-[0.1em] -mt-0.5">AEGIS</p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                item.active
                  ? 'bg-neon-gold/10 border border-neon-gold/20'
                  : 'hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <item.icon
                size={20}
                className={item.active ? 'text-neon-gold' : 'text-off-white'}
              />
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium block ${item.active ? 'text-neon-gold' : 'text-off-white'}`}>
                  {item.label}
                </span>
                {item.sub && (
                  <span className="text-xs text-off-white">{item.sub}</span>
                )}
              </div>
              {item.badge && (
                <span
                  className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                    item.badge === 'New'
                      ? 'bg-neon-lime text-deep-space'
                      : 'bg-neon-gold/20 text-neon-gold'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Community CTA */}
        <div className="mx-5 mb-4 bg-neon-gold/[0.08] rounded-xl p-5">
          <p className="font-display font-semibold text-white text-sm">Join Cozanet Community</p>
          <p className="text-off-white text-xs mt-2 leading-relaxed">
            Get updates, guides and exclusive rewards.
          </p>
          <button className="w-full mt-3 bg-neon-gold text-deep-space font-bold text-xs py-2.5 rounded-lg hover:bg-neon-lime transition-colors">
            Join Now
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center gap-2">
          <ShieldCheck size={14} className="text-off-white" />
          <div>
            <p className="text-off-white text-[11px]">Secured by Cozanet</p>
            <p className="text-off-white/60 text-[10px]">Bank-level security</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-25 h-16 bg-deep-space/95 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="font-display font-bold text-white text-xl">Aegis</h1>
              <p className="text-off-white text-sm hidden sm:block">Your shield for smart, secure wallet funding.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 border border-white/15 text-white text-sm font-medium px-4 py-2 rounded-lg hover:border-neon-gold hover:text-neon-gold transition-colors">
            <Play size={14} />
            How Aegis Works
          </button>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 pb-28">
          <div className="grid xl:grid-cols-[65%_35%] gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-surface-dark rounded-2xl p-6 lg:p-8 border border-white/[0.06]">
                <h3 className="font-display font-semibold text-white text-lg">
                  Find the best way to fund your wallet
                </h3>
                <RouteFinder variant="dashboard" />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <AIInsight variant="dashboard" />
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-deep-space border-t border-white/[0.08] px-6 py-4 z-20">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-2.5">
                <item.icon size={18} className="text-neon-gold shrink-0" />
                <div>
                  <p className="text-white text-xs font-medium">{item.title}</p>
                  <p className="text-off-white text-[11px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
