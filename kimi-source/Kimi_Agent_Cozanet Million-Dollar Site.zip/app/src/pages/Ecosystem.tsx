import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const providers = [
  { name: 'Quidax', type: 'Exchange' },
  { name: 'Binance P2P', type: 'P2P' },
  { name: 'Yellow Card', type: 'Exchange' },
  { name: 'Paxful', type: 'P2P' },
  { name: 'Luno', type: 'Exchange' },
  { name: 'Busha', type: 'Exchange' },
  { name: 'Chipper Cash', type: 'Fintech' },
  { name: 'Eversend', type: 'Fintech' },
  { name: 'Bitnob', type: 'Exchange' },
  { name: 'Payday', type: 'Fintech' },
  { name: 'Fluidcoins', type: 'Payments' },
  { name: 'BuyCoins', type: 'Exchange' },
  { name: 'Trove', type: 'Investment' },
  { name: 'Pillow', type: 'Savings' },
  { name: 'Mazzuma', type: 'Payments' },
  { name: 'Changera', type: 'Fintech' },
]

const countries = [
  { flag: '🇳🇬', name: 'Nigeria', code: 'NGN' },
  { flag: '🇬🇭', name: 'Ghana', code: 'GHS' },
  { flag: '🇰🇪', name: 'Kenya', code: 'KES' },
  { flag: '🇿🇦', name: 'South Africa', code: 'ZAR' },
  { flag: '🇨🇲', name: 'Cameroon', code: 'XAF' },
  { flag: '🇺🇬', name: 'Uganda', code: 'UGX' },
  { flag: '🇹🇿', name: 'Tanzania', code: 'TZS' },
  { flag: '🇷🇼', name: 'Rwanda', code: 'RWF' },
  { flag: '🇿🇲', name: 'Zambia', code: 'ZMW' },
  { flag: '🇨🇮', name: 'Ivory Coast', code: 'XOF' },
  { flag: '🇸🇳', name: 'Senegal', code: 'XOF' },
  { flag: '🇪🇹', name: 'Ethiopia', code: 'ETB' },
  { flag: '🇪🇬', name: 'Egypt', code: 'EGP' },
  { flag: '🇲🇦', name: 'Morocco', code: 'MAD' },
  { flag: '🇹🇳', name: 'Tunisia', code: 'TND' },
]

const stats = [
  { value: '$4.1M+', label: 'Total Value Routed' },
  { value: '3,450+', label: 'Transactions Today' },
  { value: '24', label: 'Active Corridors' },
  { value: '15+', label: 'African Currencies' },
]

export default function Ecosystem() {
  const pageRef = useRef<HTMLDivElement>(null)
  const providersRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    if (providersRef.current) {
      const st = ScrollTrigger.create({
        trigger: providersRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.provider-card', { opacity: 0, y: 30, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
        },
        once: true,
      })
      triggers.push(st)
    }

    if (statsRef.current) {
      const st = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.eco-stat', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
        },
        once: true,
      })
      triggers.push(st)
    }

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <div ref={pageRef} className="relative z-[1]">
      {/* Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">ECOSYSTEM</p>
          <h1 className="font-display font-bold text-white mt-4" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            A network built for Africa
          </h1>
          <p className="text-off-white text-xl leading-relaxed mt-5">
            Connected corridors, local providers, and global liquidity — all woven into one intelligent network.
          </p>
        </div>
      </section>

      {/* Network Map Visualization */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Animated network lines background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            {/* Grid lines */}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFC300" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#FFC300" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Connection lines between cities */}
            <line x1="200" y1="350" x2="500" y2="300" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="300" x2="800" y2="250" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="300" x2="700" y2="400" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="350" x2="350" y2="450" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.2s" repeatCount="indefinite" />
            </line>
            <line x1="800" y1="250" x2="1000" y2="200" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.8s" repeatCount="indefinite" />
            </line>

            {/* City nodes */}
            {[
              { x: 200, y: 350, name: 'Lagos', pulse: true },
              { x: 500, y: 300, name: 'Accra' },
              { x: 350, y: 450, name: 'Abidjan' },
              { x: 700, y: 400, name: 'Nairobi' },
              { x: 800, y: 250, name: 'London' },
              { x: 1000, y: 200, name: 'Dubai' },
            ].map((city) => (
              <g key={city.name}>
                {city.pulse && (
                  <circle cx={city.x} cy={city.y} r="12" fill="none" stroke="#FFC300" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={city.x} cy={city.y} r="5" fill="#FFC300" />
                <text x={city.x} y={city.y + 18} textAnchor="middle" fill="#C5C6C7" fontSize="11" fontFamily="JetBrains Mono">
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Floating Stats */}
        <div className="absolute top-8 left-8 liquid-glass px-5 py-3 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-xs text-off-white">Network Status: ACTIVE</span>
          </div>
          <p className="font-mono text-[10px] text-off-white/60 mt-1">BSC GAS: 3 Gwei</p>
        </div>

        <div className="absolute top-1/3 left-8 liquid-glass px-6 py-4 rounded-xl">
          <p className="font-mono text-[10px] uppercase text-off-white tracking-wider">Total Value Routed</p>
          <p className="font-display font-extrabold text-5xl text-neon-lime mt-1">$4.1M</p>
        </div>

        <div className="absolute top-1/3 right-8 liquid-glass px-6 py-4 rounded-xl">
          <p className="font-mono text-[10px] uppercase text-off-white tracking-wider">Active Corridors</p>
          <p className="font-display font-extrabold text-5xl text-neon-lime mt-1">24</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 liquid-glass px-6 py-4 rounded-xl">
          <p className="font-mono text-[10px] uppercase text-off-white tracking-wider text-center">Avg. Settlement</p>
          <p className="font-display font-extrabold text-4xl text-neon-lime mt-1 text-center">112s</p>
        </div>
      </section>

      {/* Provider Network */}
      <section ref={providersRef} className="py-32 px-6 bg-deep-space">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">PROVIDERS</p>
          <h2 className="font-display font-bold text-white mt-3" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            20+ providers, one smart router
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
            {providers.map((p) => (
              <div
                key={p.name}
                className="provider-card bg-surface-dark rounded-xl p-6 border border-white/[0.06] hover:border-neon-gold/30 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-gold/20 to-neon-lime/20 flex items-center justify-center mx-auto text-neon-gold font-bold text-sm">
                  {p.name[0]}
                </div>
                <p className="font-display font-semibold text-white text-base mt-3">{p.name}</p>
                <p className="text-off-white text-xs mt-1">{p.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corridor Coverage */}
      <section className="py-20 px-6 bg-deep-space">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-bold text-white text-3xl">Coverage Map</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
            {countries.map((c) => (
              <div
                key={c.code}
                className="bg-surface-dark rounded-lg p-4 flex items-center gap-3 border border-white/[0.06] hover:border-neon-gold/20 transition-colors"
              >
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <p className="font-mono text-neon-gold text-xs">{c.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section ref={statsRef} className="py-20 px-6 bg-deep-space">
        <div className="max-w-[1000px] mx-auto">
          <div className="w-full h-0.5 bg-gradient-to-r from-neon-gold to-neon-lime mb-16" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="eco-stat text-center">
                <p className="font-display font-extrabold text-5xl text-neon-lime">{stat.value}</p>
                <p className="text-off-white text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
