import { Link } from 'react-router-dom'
import { Twitter, Linkedin, MessageCircle, Send } from 'lucide-react'

const productLinks = [
  { label: 'Aegis Wallet', path: '/dashboard' },
  { label: 'Route Finder', path: '/dashboard' },
  { label: 'Price Monitor', path: '#' },
  { label: 'API Access', path: '#' },
]

const companyLinks = [
  { label: 'About', path: '/company' },
  { label: 'Careers', path: '/company' },
  { label: 'Blog', path: '#' },
  { label: 'Press Kit', path: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', path: '#' },
  { label: 'Terms of Service', path: '#' },
  { label: 'Compliance', path: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-deep-space border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-gold to-neon-lime flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-display font-bold text-white text-xl">Cozanet</span>
            </Link>
            <p className="text-off-white text-sm mt-3 leading-relaxed">
              The future of African remittance.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="#" className="text-off-white hover:text-neon-gold transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-off-white hover:text-neon-gold transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-off-white hover:text-neon-gold transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="text-off-white hover:text-neon-gold transition-colors">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase text-white mb-5 tracking-wide">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-off-white hover:text-neon-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase text-white mb-5 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-off-white hover:text-neon-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase text-white mb-5 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-off-white hover:text-neon-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-16 pt-6 border-t border-white/[0.05]">
          <p className="text-off-white/70 text-xs">
            &copy; 2024 Cozanet. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span className="text-off-white/70 text-xs">Secured by Cozanet</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
