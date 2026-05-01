import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lock, Landmark, KeyRound, Headset, MessageSquare, Shield } from 'lucide-react'
import RouteFinder from '@/components/RouteFinder'
import AIInsight from '@/components/AIInsight'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const trustItems = [
  { icon: '💰', title: 'Cheaper', desc: 'Save on fees' },
  { icon: '⚡', title: 'Faster', desc: 'Get there in minutes' },
  { icon: '🛡', title: 'Safer', desc: 'Routed with care' },
]

const featureCards = [
  { icon: Lock, title: 'Secure & Trusted', desc: 'Your safety is our priority. Bank-level 256-bit encryption protects every transaction.' },
  { icon: Landmark, title: 'Bank-Level Security', desc: 'Enterprise-grade security infrastructure with multi-sig wallets and cold storage.' },
  { icon: KeyRound, title: 'Non-Custodial', desc: 'You own your assets. We never hold your private keys or access your funds.' },
  { icon: Headset, title: '24/7 Support', desc: 'Here for you always. Our team is available round the clock across all time zones.' },
]

const stats = [
  { label: 'TOTAL VALUE ROUTED (TVL)', value: '$4.1M', trend: '+12.4% this week' },
  { label: 'TRANSACTIONS TODAY', value: '3,450', trend: '+8.2% vs yesterday' },
  { label: 'AVG. SETTLEMENT TIME', value: '112s', trend: '-15% faster' },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const routeResultsRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [showResults, setShowResults] = useState(false)
  const [showAI, setShowAI] = useState(false)

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 })
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 0.5 })
      gsap.from('.hero-trust', { opacity: 0, y: 20, duration: 0.6, delay: 0.7 })
      gsap.from('.hero-social', { opacity: 0, y: 20, duration: 0.6, delay: 0.9 })
      gsap.from('.hero-widget', { opacity: 0, y: 40, duration: 0.8, delay: 0.5 })
    }, heroRef)

    // Scroll animations
    const scrollTriggers: ScrollTrigger[] = []

    if (networkRef.current) {
      const st = ScrollTrigger.create({
        trigger: networkRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.network-eyebrow', { opacity: 0, y: 20, duration: 0.5 })
          gsap.from('.network-title', { opacity: 0, y: 30, duration: 0.7, delay: 0.1 })
          gsap.from('.stat-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.15, delay: 0.3 })
        },
        once: true,
      })
      scrollTriggers.push(st)
    }

    if (featuresRef.current) {
      const st = ScrollTrigger.create({
        trigger: featuresRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.features-eyebrow', { opacity: 0, y: 20, duration: 0.5 })
          gsap.from('.features-title', { opacity: 0, y: 30, duration: 0.7, delay: 0.1 })
          gsap.from('.feature-card', { opacity: 0, y: 40, duration: 0.6, stagger: 0.1, delay: 0.3 })
        },
        once: true,
      })
      scrollTriggers.push(st)
    }

    return () => {
      ctx.revert()
      scrollTriggers.forEach(st => st.kill())
    }
  }, [])

  const handleFindRoute = () => {
    setShowResults(true)
    setTimeout(() => setShowAI(true), 400)
    setTimeout(() => {
      routeResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="relative z-[1]">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center">
        {/* Radial gradient overlay for text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0C10_70%)] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="hero-badge">
                <span className="inline-block font-mono text-[11px] uppercase text-neon-gold border border-neon-gold/40 bg-neon-gold/[0.08] px-3.5 py-1.5 rounded">
                  PHASE 1: WALLET FUNDING
                </span>
              </div>

              <h1 className="hero-title mt-6 font-display font-bold uppercase tracking-[-0.03em] leading-[0.95]"
                style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
                <span className="text-white block">The Future of</span>
                <span className="gradient-text block">African Remittance</span>
              </h1>

              <p className="hero-subtitle text-off-white text-lg leading-relaxed mt-6 max-w-[480px]">
                Move your money the smart way. Cozanet finds the best route to fund any crypto wallet from your bank.
              </p>

              <div className="hero-trust flex flex-wrap gap-8 mt-8">
                {trustItems.map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-off-white text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-social mt-10">
                <p className="text-off-white text-sm">Trusted by Africans across 20+ countries</p>
                <div className="flex items-center mt-3 gap-2">
                  {['🇳🇬', '🇬🇭', '🇰🇪', '🇿🇦', '🇨🇲', '🇺🇬'].map((flag, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-sm"
                      style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 6 - i }}
                    >
                      {flag}
                    </span>
                  ))}
                  <span className="ml-3 font-mono text-xs text-neon-gold">5,000+ Transactions completed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Widget */}
            <div className="hero-widget flex justify-center lg:justify-end">
              <RouteFinder onFindRoute={handleFindRoute} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-10 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-neon-gold animate-scroll-indicator" />
          </div>
        </div>
      </section>

      {/* ===== ROUTE RESULTS + AI INSIGHT ===== */}
      {(showResults || showAI) && (
        <section ref={routeResultsRef} className="relative max-w-7xl mx-auto px-6 -mt-20 pb-16">
          <div className="grid lg:grid-cols-[65%_35%] gap-6">
            {showResults && (
              <div className="liquid-glass rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-600">
                {/* Recommended */}
                <div className="relative bg-neon-gold/5 border-l-2 border-neon-gold p-6">
                  <span className="absolute top-4 right-4 font-mono text-[10px] uppercase bg-neon-gold text-deep-space px-2.5 py-1 rounded">
                    Recommended
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">Q</div>
                    <div>
                      <p className="font-display font-semibold text-white text-xl">Quidax</p>
                      <p className="text-off-white text-sm">Direct Purchase</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                    <div>
                      <p className="text-xs text-off-white">You pay (est.)</p>
                      <p className="font-display font-bold text-2xl text-neon-lime">₦96,800</p>
                      <p className="text-xs text-neon-gold font-medium mt-0.5">You save ₦3,200</p>
                    </div>
                    <div>
                      <p className="text-xs text-off-white">Time</p>
                      <p className="font-display font-semibold text-lg text-white">15 min</p>
                      <span className="inline-block mt-1 text-[11px] font-medium bg-neon-lime text-deep-space px-2 py-0.5 rounded">Fast</span>
                    </div>
                    <div>
                      <p className="text-xs text-off-white">Total Fees</p>
                      <p className="font-semibold text-white">₦3,200</p>
                      <p className="text-xs text-off-white">3.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-off-white">Risk</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-neon-lime" />
                        <span className="text-white text-sm">Low</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Options */}
                <div className="bg-deep-space/50">
                  <div className="px-6 py-3 border-b border-white/[0.05] flex items-center gap-6 text-xs text-off-white/60">
                    <span className="flex-1">Other options</span>
                    <span className="w-24 hidden sm:block">You pay (est.)</span>
                    <span className="w-16 hidden sm:block">Time</span>
                    <span className="w-24 hidden md:block">Total Fees</span>
                    <span className="w-16 hidden md:block">Risk</span>
                    <span className="w-6" />
                  </div>
                  {[
                    { name: 'Binance P2P', cost: '₦95,500', time: '25 min', fees: '₦4,500 (4.5%)', risk: 'Medium', riskColor: 'bg-neon-gold', logo: 'B', logoColor: 'bg-yellow-500' },
                    { name: 'Yellow Card', cost: '₦97,900', time: '20 min', fees: '₦2,100 (2.1%)', risk: 'Low', riskColor: 'bg-neon-lime', logo: 'Y', logoColor: 'bg-orange-500' },
                    { name: 'Paxful P2P', cost: '₦94,800', time: '30 min', fees: '₦5,200 (5.5%)', risk: 'High', riskColor: 'bg-red-500', logo: 'P', logoColor: 'bg-blue-500' },
                  ].map((p) => (
                    <div key={p.name} className="px-6 py-4 border-b border-white/[0.05] flex items-center gap-6 hover:bg-white/[0.03] cursor-pointer transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-8 h-8 rounded-full ${p.logoColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{p.logo}</div>
                        <span className="text-white font-medium text-sm truncate">{p.name}</span>
                      </div>
                      <span className="text-white font-semibold text-sm w-24 hidden sm:block">{p.cost}</span>
                      <span className="text-off-white text-sm w-16 hidden sm:block">{p.time}</span>
                      <span className="text-off-white text-sm w-24 hidden md:block">{p.fees}</span>
                      <div className="w-16 hidden md:flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${p.riskColor}`} />
                        <span className="text-off-white text-xs">{p.risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showAI && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-600 delay-200">
                <AIInsight variant="home" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== GLOBAL NETWORK STATUS ===== */}
      <section ref={networkRef} className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="network-eyebrow font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">
            NETWORK INTELLIGENCE
          </p>
          <h2 className="network-title font-display font-bold uppercase text-white mt-3"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            GLOBAL NETWORK STATUS
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-neon-gold to-neon-lime mt-6" />

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card liquid-glass p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-gold to-neon-lime" />
                <p className="font-mono text-[11px] uppercase text-off-white tracking-wider">{stat.label}</p>
                <p className="font-display font-extrabold text-neon-lime mt-3" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                  {stat.value}
                </p>
                <p className="text-neon-lime text-sm font-medium mt-2 flex items-center gap-1">
                  <span>↑</span> {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURE GRID ===== */}
      <section ref={featuresRef} className="relative bg-deep-space py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="features-eyebrow font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">
            WHY COZANET
          </p>
          <h2 className="features-title font-display font-bold text-white mt-3 max-w-[700px]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            Built for the way Africa moves money
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="feature-card liquid-glass p-10 border border-white/[0.08] hover:border-neon-gold/30 transition-all duration-300"
              >
                <card.icon size={48} className="text-neon-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-white text-[22px]">{card.title}</h3>
                <p className="text-off-white text-base leading-relaxed mt-3">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HERO VIDEO SECTION ===== */}
      <section className="relative bg-deep-space py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              style={{ maxHeight: '60vh', objectFit: 'cover' }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />

      {/* AI Agent Floating Widget */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <div className="liquid-glass p-5 w-[280px] rounded-2xl mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-neon-lime" />
              <span className="font-display font-semibold text-white text-sm">Aegis AI Agent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
              <span className="text-off-white text-xs">Online</span>
            </div>
          </div>
          <div className="mt-3 bg-white/5 rounded-lg px-3.5 py-2.5">
            <p className="text-off-white text-xs">How do I fund my wallet quickly?</p>
          </div>
        </div>
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-gold to-neon-lime flex items-center justify-center shadow-[0_4px_20px_rgba(255,195,0,0.4)] hover:scale-110 transition-transform float-right">
          <MessageSquare size={24} className="text-deep-space" />
        </button>
      </div>
    </div>
  )
}
