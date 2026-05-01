import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Route, TrendingUp, Eye, Globe, Lock, Bot, Check, X, ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Enter Your Details',
    desc: 'Tell us how much you want to send, which currency, and your destination wallet. Our system supports 15+ African currencies and all major crypto networks.',
    align: 'left' as const,
  },
  {
    num: '02',
    title: 'Aegis Scans the Market',
    desc: 'In under 2 seconds, our AI engine queries 20+ liquidity providers, P2P markets, and institutional corridors across Africa. We analyze fees, speed, reliability, and risk in real-time.',
    align: 'right' as const,
  },
  {
    num: '03',
    title: 'Get Your Best Route',
    desc: 'See a clear comparison of all available options. Our AI Insight explains why the recommended route is best for your specific transfer, including exactly how much you\'ll save.',
    align: 'left' as const,
  },
  {
    num: '04',
    title: 'Complete Your Transfer',
    desc: 'Follow our step-by-step guide to complete the transfer with your chosen provider. Track progress in real-time and receive confirmation when your funds arrive.',
    align: 'right' as const,
  },
]

const featureCards = [
  { icon: Route, title: 'Smart Route Finder', desc: 'AI-powered comparison across 20+ providers to find the optimal path for every transfer.' },
  { icon: TrendingUp, title: 'Real-Time Rates', desc: 'Live exchange rates updated every 30 seconds from multiple sources.' },
  { icon: Eye, title: 'Fee Transparency', desc: 'See every fee upfront. No hidden charges, no surprises. Ever.' },
  { icon: Globe, title: 'Multi-Currency Support', desc: '15+ African currencies and all major stablecoins including USDT, USDC, and BUSD.' },
  { icon: Lock, title: 'Bank-Grade Security', desc: '256-bit encryption, non-custodial architecture, and multi-sig protection.' },
  { icon: Bot, title: '24/7 AI Support', desc: 'Our Aegis AI agent is always online to answer questions and guide you.' },
]

const comparisonRows = [
  { feature: 'Transfer Speed', cozanet: '2-15 minutes', banks: '1-5 days', other: '30min-2hrs', cozanetGood: true },
  { feature: 'Fees', cozanet: '0.5% - 3.2%', banks: '5% - 12%', other: '2% - 8%', cozanetGood: true },
  { feature: 'Currency Support', cozanet: '15+ African', banks: '3-5 major', other: '5-10', cozanetGood: true },
  { feature: 'Hidden Fees', cozanet: 'None', banks: 'Common', other: 'Sometimes', cozanetGood: true, banksBad: true },
  { feature: 'AI Routing', cozanet: 'Yes', banks: 'No', other: 'No', cozanetGood: true, banksBad: true, otherBad: true },
  { feature: '24/7 Support', cozanet: 'Yes', banks: 'Limited', other: 'Varies', cozanetGood: true },
]

export default function Features() {
  const pageRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    // Steps animation
    if (stepsRef.current) {
      const stepEls = stepsRef.current.querySelectorAll('.step-item')
      stepEls.forEach((el, i) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            gsap.from(el, {
              opacity: 0,
              x: i % 2 === 0 ? -40 : 40,
              duration: 0.7,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        triggers.push(st)
      })
    }

    // Feature cards
    if (cardsRef.current) {
      const st = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.feature-grid-card', {
            opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          })
        },
        once: true,
      })
      triggers.push(st)
    }

    // Table
    if (tableRef.current) {
      const st = ScrollTrigger.create({
        trigger: tableRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.comp-row', {
            opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          })
        },
        once: true,
      })
      triggers.push(st)
    }

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <div ref={pageRef} className="relative z-[1] bg-deep-space">
      {/* Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">HOW IT WORKS</p>
          <h1 className="font-display font-bold text-white mt-4" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            Smart routing for every transfer
          </h1>
          <p className="text-off-white text-xl leading-relaxed mt-5 max-w-[640px] mx-auto">
            Our Aegis engine scans 20+ providers across Africa to find you the fastest, cheapest, and safest route every single time.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section ref={stepsRef} className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-gold to-neon-lime hidden md:block -translate-x-1/2" />

          {steps.map((step) => (
            <div
              key={step.num}
              className={`step-item relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 last:mb-0 ${
                step.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${step.align === 'right' ? 'md:text-right' : ''}`}>
                <span className="font-display font-extrabold text-7xl text-neon-gold/15 absolute -top-4">
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-white text-3xl relative z-10">{step.title}</h3>
                <p className="text-off-white text-base leading-relaxed mt-3 relative z-10">{step.desc}</p>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:flex w-4 h-4 rounded-full bg-neon-gold border-4 border-deep-space shrink-0 z-10" />

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section ref={cardsRef} className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">FEATURES</p>
          <h2 className="font-display font-bold text-white mt-3" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            Everything you need to move money
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="feature-grid-card bg-surface-dark rounded-2xl p-8 border border-white/[0.06] hover:border-neon-gold/30 hover:-translate-y-1 transition-all duration-300"
              >
                <card.icon size={40} className="text-neon-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-white text-xl">{card.title}</h3>
                <p className="text-off-white text-[15px] leading-relaxed mt-2.5">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={tableRef} className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display font-bold text-white text-3xl text-center">How we compare</h2>

          <div className="mt-12 bg-surface-dark rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-neon-gold/8">
              {['Feature', 'Cozanet', 'Traditional Banks', 'Other P2P'].map((h, i) => (
                <div key={h} className={`px-6 py-4 text-sm font-semibold ${i === 0 ? 'text-white' : 'text-off-white'} ${i === 1 ? 'text-neon-gold' : ''}`}>
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparisonRows.map((row, idx) => (
              <div
                key={row.feature}
                className={`comp-row grid grid-cols-4 ${idx % 2 === 1 ? 'bg-white/[0.02]' : ''} border-b border-white/[0.05] last:border-b-0`}
              >
                <div className="px-6 py-4 text-white text-sm font-medium">{row.feature}</div>
                <div className="px-6 py-4 text-neon-lime text-sm font-medium flex items-center gap-1.5">
                  <Check size={14} /> {row.cozanet}
                </div>
                <div className={`px-6 py-4 text-sm flex items-center gap-1.5 ${row.banksBad ? 'text-red-400' : 'text-off-white'}`}>
                  {row.banksBad ? <X size={14} /> : null} {row.banks}
                </div>
                <div className={`px-6 py-4 text-sm flex items-center gap-1.5 ${row.otherBad ? 'text-red-400' : 'text-off-white'}`}>
                  {row.otherBad ? <X size={14} /> : null} {row.other}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-gradient-to-br from-neon-gold/10 to-neon-lime/5 rounded-3xl p-16 text-center border border-neon-gold/20">
            <h2 className="font-display font-bold text-white text-4xl">Ready to experience the future?</h2>
            <p className="text-off-white text-lg mt-4">Join 10,000+ Africans who trust Cozanet for their transfers.</p>
            <button className="mt-8 bg-neon-gold text-deep-space font-bold text-base px-10 py-4 rounded-lg hover:bg-neon-lime transition-colors inline-flex items-center gap-2">
              Get Started for Free
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
