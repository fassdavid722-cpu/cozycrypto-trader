import { useState } from 'react'
import { Copy, ScanLine, ChevronDown, ArrowRight, Sparkles, Check } from 'lucide-react'

interface RouteFinderProps {
  variant?: 'hero' | 'dashboard'
  onFindRoute?: () => void
}

const providers = [
  {
    name: 'Quidax',
    type: 'Direct Purchase',
    cost: '₦96,800',
    savings: 'You save ₦3,200',
    time: '15 min',
    fast: true,
    fees: '₦3,200',
    feePercent: '3.2%',
    risk: 'Low',
    riskColor: 'bg-neon-lime',
    recommended: true,
    logo: 'Q',
    logoColor: 'bg-purple-600',
  },
  {
    name: 'Binance P2P',
    type: '',
    cost: '₦95,500',
    savings: '',
    time: '25 min',
    fast: false,
    fees: '₦4,500',
    feePercent: '4.5%',
    risk: 'Medium',
    riskColor: 'bg-neon-gold',
    recommended: false,
    logo: 'B',
    logoColor: 'bg-yellow-500',
  },
  {
    name: 'Yellow Card',
    type: '',
    cost: '₦97,900',
    savings: '',
    time: '20 min',
    fast: false,
    fees: '₦2,100',
    feePercent: '2.1%',
    risk: 'Low',
    riskColor: 'bg-neon-lime',
    recommended: false,
    logo: 'Y',
    logoColor: 'bg-orange-500',
  },
  {
    name: 'Paxful P2P',
    type: '',
    cost: '₦94,800',
    savings: '',
    time: '30 min',
    fast: false,
    fees: '₦5,200',
    feePercent: '5.5%',
    risk: 'High',
    riskColor: 'bg-red-500',
    recommended: false,
    logo: 'P',
    logoColor: 'bg-blue-500',
  },
]

export default function RouteFinder({ variant = 'hero', onFindRoute }: RouteFinderProps) {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)

  const isDashboard = variant === 'dashboard'

  const handleFindRoute = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
      onFindRoute?.()
    }, 1200)
  }

  return (
    <div className={isDashboard ? '' : 'liquid-glass p-6 sm:p-8 w-full max-w-[460px]'}>
      {!isDashboard && (
        <h3 className="font-display font-semibold text-lg text-white">
          Find the best way to fund your wallet
        </h3>
      )}

      {/* Form */}
      <div className={`grid ${isDashboard ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-3 mt-6`}>
        {/* You send */}
        <div className={isDashboard ? '' : 'sm:col-span-1'}>
          <label className="text-xs font-medium uppercase text-off-white tracking-wider">You send</label>
          <div className="mt-1.5 flex items-center bg-surface-dark border border-white/10 rounded-lg overflow-hidden">
            <input
              type="text"
              defaultValue="100,000"
              className="flex-1 bg-transparent text-white font-medium text-sm px-4 py-3 outline-none"
            />
            <div className="flex items-center gap-1.5 px-3 py-2 bg-deep-space/50 border-l border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
              <span className="text-base">🇳🇬</span>
              <span className="text-white text-sm font-medium">NGN</span>
              <ChevronDown size={14} className="text-off-white" />
            </div>
          </div>
        </div>

        {/* You want */}
        <div>
          <label className="text-xs font-medium uppercase text-off-white tracking-wider">You want</label>
          <div className="mt-1.5 flex items-center bg-surface-dark border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold mr-2">₮</div>
            <span className="text-white text-sm font-medium flex-1">USDT</span>
            <ChevronDown size={14} className="text-off-white" />
          </div>
        </div>

        {/* Network */}
        <div>
          <label className="text-xs font-medium uppercase text-off-white tracking-wider">Network</label>
          <div className="mt-1.5 flex items-center bg-surface-dark border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-[10px] text-deep-space font-bold mr-2">B</div>
            <span className="text-white text-sm font-medium flex-1">BSC</span>
            <ChevronDown size={14} className="text-off-white" />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="text-xs font-medium uppercase text-off-white tracking-wider">Priority</label>
          <div className="mt-1.5 flex items-center bg-surface-dark border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
            <span className="text-white text-sm font-medium flex-1">Cheapest</span>
            <ChevronDown size={14} className="text-off-white" />
          </div>
        </div>

        {/* Wallet address - full width */}
        <div className="col-span-full">
          <label className="text-xs font-medium uppercase text-off-white tracking-wider">Wallet address</label>
          <div className="mt-1.5 flex items-center bg-surface-dark border border-white/10 rounded-lg overflow-hidden">
            <input
              type="text"
              defaultValue="0x8f3c...9Ab4"
              className="flex-1 bg-transparent text-white font-medium text-sm px-4 py-3 outline-none font-mono"
            />
            <div className="flex items-center gap-1 px-2">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Copy size={16} className="text-off-white" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ScanLine size={16} className="text-off-white" />
              </button>
            </div>
            {isDashboard && (
              <div className="flex items-center gap-1 px-3 mr-2">
                <Check size={14} className="text-neon-lime" />
                <span className="text-neon-lime text-xs font-medium">Valid address</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleFindRoute}
        disabled={loading}
        className="w-full mt-4 py-4 rounded-lg font-bold text-deep-space text-base flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,195,0,0.3)] bg-gradient-to-r from-neon-gold to-[#E6B000] hover:from-neon-lime hover:to-[#B8E600] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Sparkles size={18} className="animate-spin" />
            Finding best routes...
          </span>
        ) : (
          <>
            <Sparkles size={18} />
            Find Best Route
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Trust badges (hero only) */}
      {!isDashboard && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-off-white flex items-center gap-1"><Check size={12} className="text-neon-lime" /> Best price guarantee</span>
          <span className="text-xs text-off-white flex items-center gap-1"><Check size={12} className="text-neon-lime" /> Real-time comparison</span>
          <span className="text-xs text-off-white flex items-center gap-1"><Check size={12} className="text-neon-lime" /> No hidden fees</span>
        </div>
      )}

      {/* Route Results */}
      {showResults && (
        <div className={`mt-6 ${isDashboard ? '' : 'liquid-glass'} rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}>
          {/* Recommended */}
          <div className="relative bg-neon-gold/5 border-l-2 border-neon-gold p-5 sm:p-6">
            <span className="absolute top-4 right-4 font-mono text-[10px] uppercase bg-neon-gold text-deep-space px-2.5 py-1 rounded">
              Recommended
            </span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {providers[0].logo}
              </div>
              <div>
                <p className="font-display font-semibold text-white text-lg">{providers[0].name}</p>
                <p className="text-off-white text-sm">{providers[0].type}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div>
                <p className="text-xs text-off-white">You pay (est.)</p>
                <p className="font-display font-bold text-xl text-neon-lime">{providers[0].cost}</p>
                <p className="text-xs text-neon-gold font-medium mt-0.5">{providers[0].savings}</p>
              </div>
              <div>
                <p className="text-xs text-off-white">Time</p>
                <p className="font-display font-semibold text-white">{providers[0].time}</p>
                <span className="inline-block mt-1 text-[11px] font-medium bg-neon-lime text-deep-space px-2 py-0.5 rounded">Fast</span>
              </div>
              <div>
                <p className="text-xs text-off-white">Total Fees</p>
                <p className="font-semibold text-white">{providers[0].fees}</p>
                <p className="text-xs text-off-white">{providers[0].feePercent}</p>
              </div>
              <div>
                <p className="text-xs text-off-white">Risk</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${providers[0].riskColor}`} />
                  <span className="text-white text-sm">{providers[0].risk}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Options Table */}
          <div className="bg-deep-space/50">
            <div className="px-5 sm:px-6 py-3 border-b border-white/[0.05] flex items-center gap-8">
              <span className="text-sm text-off-white flex-1">Other options</span>
              <span className="text-xs text-off-white/60 w-24 hidden sm:block">You pay (est.)</span>
              <span className="text-xs text-off-white/60 w-16 hidden sm:block">Time</span>
              <span className="text-xs text-off-white/60 w-24 hidden md:block">Total Fees</span>
              <span className="text-xs text-off-white/60 w-16 hidden md:block">Risk</span>
              <span className="w-8" />
            </div>
            {providers.slice(1).map((provider) => (
              <div
                key={provider.name}
                className="px-5 sm:px-6 py-4 border-b border-white/[0.05] flex items-center gap-8 hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${provider.logoColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {provider.logo}
                  </div>
                  <span className="text-white font-medium text-sm truncate">{provider.name}</span>
                </div>
                <span className="text-white font-semibold text-sm w-24 hidden sm:block">{provider.cost}</span>
                <span className="text-off-white text-sm w-16 hidden sm:block">{provider.time}</span>
                <span className="text-off-white text-sm w-24 hidden md:block">{provider.fees} ({provider.feePercent})</span>
                <div className="w-16 hidden md:flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${provider.riskColor}`} />
                  <span className="text-off-white text-xs">{provider.risk}</span>
                </div>
                <ArrowRight size={16} className="text-off-white shrink-0" />
              </div>
            ))}
          </div>

          {/* Why this route */}
          {isDashboard && (
            <div className="bg-deep-space px-5 sm:px-6 py-4 flex flex-wrap items-center gap-6 sm:gap-12">
              <div className="flex items-center gap-2">
                <span className="text-neon-lime text-lg">↘</span>
                <div>
                  <p className="text-white text-sm font-medium">Lower total cost</p>
                  <p className="text-off-white text-xs">Saves you more</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-gold text-lg">⚡</span>
                <div>
                  <p className="text-white text-sm font-medium">Faster settlement</p>
                  <p className="text-off-white text-xs">Money in 15 min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-lime text-lg">✓</span>
                <div>
                  <p className="text-white text-sm font-medium">High reliability</p>
                  <p className="text-off-white text-xs">99.9% success rate</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
