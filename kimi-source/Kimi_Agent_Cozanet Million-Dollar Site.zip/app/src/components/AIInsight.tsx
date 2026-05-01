import { Sparkles, ExternalLink } from 'lucide-react'

interface AIInsightProps {
  variant?: 'home' | 'dashboard'
}

const steps = [
  { num: '1', title: 'Deposit ₦100,000', desc: 'Transfer to Quidax using your bank.' },
  { num: '2', title: 'Buy USDT', desc: 'Purchase USDT with your NGN balance.' },
  { num: '3', title: 'Withdraw to Wallet', desc: 'Paste your wallet address and select BSC.' },
  { num: '4', title: 'Confirm Network', desc: 'Ensure you select BSC network.' },
  { num: '5', title: 'Receive USDT', desc: 'USDT will be sent to your wallet.' },
]

const homeSteps = steps.slice(0, 3)

export default function AIInsight({ variant = 'home' }: AIInsightProps) {
  const isDashboard = variant === 'dashboard'
  const displaySteps = isDashboard ? steps : homeSteps

  return (
    <div className={isDashboard ? 'bg-surface-dark rounded-2xl p-7 border border-white/[0.06]' : 'liquid-glass p-7'}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-neon-lime" />
          <h4 className="font-display font-semibold text-white text-base">
            {isDashboard ? 'Aegis AI Insight' : 'AI Insight'}
          </h4>
        </div>
        <span className="font-mono text-[10px] uppercase bg-neon-lime text-deep-space px-2.5 py-1 rounded">
          Recommended
        </span>
      </div>

      {/* Message */}
      <p className="text-off-white text-sm leading-relaxed mt-4">
        Quidax offers the best balance of low fees, fast settlement, and high reliability for your transaction.
      </p>

      {/* Savings Card */}
      <div className="mt-5 bg-neon-lime/5 border border-neon-lime/20 rounded-xl p-5">
        <p className="font-display font-bold text-2xl text-neon-lime">You save ₦3,200</p>
        <p className="text-off-white text-sm mt-1">compared to the next best option</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-neon-lime text-xs font-medium border border-neon-lime/30 px-3 py-1.5 rounded-md">↗ Low Fees</span>
          <span className="text-neon-lime text-xs font-medium border border-neon-lime/30 px-3 py-1.5 rounded-md">⚡ Fastest</span>
          <span className="text-neon-lime text-xs font-medium border border-neon-lime/30 px-3 py-1.5 rounded-md">✓ Reliable</span>
        </div>
      </div>

      {/* Step-by-step */}
      <h5 className="font-display font-semibold text-white text-base mt-7">
        {isDashboard ? 'Step-by-step Guide' : 'What happens next?'}
      </h5>
      <div className="mt-4 space-y-4">
        {displaySteps.map((step) => (
          <div key={step.num} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-neon-gold text-deep-space flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
              {step.num}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{step.title}</p>
              <p className="text-off-white text-xs mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Link */}
      <button className={`mt-5 w-full flex items-center justify-center gap-2 text-sm font-medium text-neon-gold hover:underline transition-all ${
        isDashboard ? 'border border-white/15 text-off-white hover:text-neon-gold py-3 rounded-lg hover:no-underline' : ''
      }`}>
        View step-by-step guide
        <ExternalLink size={14} />
      </button>
    </div>
  )
}
