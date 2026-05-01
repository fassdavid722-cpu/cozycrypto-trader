import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    num: '01',
    title: 'Transparency First',
    desc: 'We believe in radical transparency. Every fee, every rate, every routing decision is visible to you.',
  },
  {
    num: '02',
    title: 'Africa-First Design',
    desc: 'Built by Africans, for Africans. We understand the unique challenges of moving money on this continent.',
  },
  {
    num: '03',
    title: 'Security Without Compromise',
    desc: 'Your assets are yours. Our non-custodial approach means we never hold your funds or keys.',
  },
]

const team = [
  {
    name: 'Adaobi Nwosu',
    role: 'CEO & Co-Founder',
    bio: 'Former fintech lead at Flutterwave. Obsessed with making payments invisible.',
    initials: 'AN',
  },
  {
    name: 'Kofi Mensah',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google engineer. Built routing algorithms that process millions of transactions.',
    initials: 'KM',
  },
  {
    name: 'Amara Okafor',
    role: 'Head of Product',
    bio: 'Product leader with 10+ years in African fintech.',
    initials: 'AO',
  },
  {
    name: 'Tunde Bakare',
    role: 'Head of Engineering',
    bio: 'Distributed systems expert. Previously at Paystack.',
    initials: 'TB',
  },
]

const pressLogos = ['TechCrunch', 'TechCabal', 'Disrupt Africa', 'Bloomberg', 'CNN Africa']

export default function Company() {
  const pageRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    if (valuesRef.current) {
      const st = ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.value-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out' })
        },
        once: true,
      })
      triggers.push(st)
    }

    if (teamRef.current) {
      const st = ScrollTrigger.create({
        trigger: teamRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.from('.team-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
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
          <p className="font-mono text-xs uppercase text-neon-gold tracking-[0.1em]">COMPANY</p>
          <h1 className="font-display font-bold text-white mt-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Building the financial infrastructure Africa deserves
          </h1>
          <p className="text-off-white text-xl leading-relaxed mt-5">
            We believe moving money across Africa should be as easy as sending a text message.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-surface-dark rounded-3xl p-16 border border-white/[0.06] text-center">
            <span className="text-8xl text-neon-gold/20 font-display font-bold leading-none">❝</span>
            <p className="font-display font-semibold text-white text-2xl lg:text-[28px] leading-relaxed italic -mt-4">
              Our mission is to make cross-border payments invisible — so fast, so cheap, and so reliable that you never have to think about them again.
            </p>
            <p className="text-neon-gold font-medium mt-8">— The Cozanet Team</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-bold text-white text-3xl text-center">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {values.map((v) => (
              <div
                key={v.num}
                className="value-card bg-surface-dark rounded-2xl p-10 border border-white/[0.06]"
              >
                <span className="font-display font-extrabold text-5xl text-neon-gold/15">{v.num}</span>
                <h3 className="font-display font-semibold text-white text-[22px] mt-4">{v.title}</h3>
                <p className="text-off-white text-base leading-relaxed mt-3">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display font-bold text-white text-3xl">Meet the Team</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {team.map((member) => (
              <div key={member.name} className="team-card text-center">
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-neon-gold to-neon-lime p-[3px] mx-auto">
                  <div className="w-full h-full rounded-full bg-surface-dark flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-neon-gold">{member.initials}</span>
                  </div>
                </div>
                <h4 className="font-display font-semibold text-white text-lg mt-4">{member.name}</h4>
                <p className="text-neon-gold text-sm">{member.role}</p>
                <p className="text-off-white text-sm mt-2 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display font-bold text-white text-3xl">In the Press</h2>
          <div className="flex flex-wrap items-center justify-center gap-12 mt-10">
            {pressLogos.map((logo) => (
              <span
                key={logo}
                className="text-off-white/50 hover:text-white text-lg font-display font-semibold tracking-wide transition-opacity cursor-pointer"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 px-6 pb-32">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-gradient-to-br from-neon-gold/10 to-neon-lime/5 rounded-3xl p-14 text-center border border-neon-gold/20">
            <h2 className="font-display font-bold text-white text-4xl">Join our mission</h2>
            <p className="text-off-white text-lg mt-4">
              We're always looking for exceptional people who want to build the future of African finance.
            </p>
            <button className="mt-6 bg-neon-gold text-deep-space font-bold text-base px-8 py-4 rounded-lg hover:bg-neon-lime transition-colors inline-flex items-center gap-2">
              View Open Positions
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
