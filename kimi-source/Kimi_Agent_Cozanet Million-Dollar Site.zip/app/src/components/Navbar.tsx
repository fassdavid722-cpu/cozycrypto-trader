import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'How it works', path: '/features' },
  { label: 'For you', path: '/features' },
  { label: 'Ecosystem', path: '/ecosystem' },
  { label: 'Company', path: '/company' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-deep-space/85 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
      style={{ height: 64 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-gold to-neon-lime flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="font-display font-bold text-white text-xl tracking-tight">Cozanet</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-white border-b-2 border-neon-gold pb-0.5'
                    : 'text-off-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-off-white hover:text-white transition-colors">
            <Moon size={20} />
          </button>
          <button className="text-white font-medium text-sm">Log in</button>
          <Link
            to="/dashboard"
            className="bg-neon-gold text-deep-space font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-neon-lime transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-deep-space/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="block py-3 text-sm font-medium uppercase tracking-wider text-off-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button className="text-white font-medium text-sm text-left py-2">Log in</button>
              <Link
                to="/dashboard"
                className="bg-neon-gold text-deep-space font-bold text-sm px-6 py-3 rounded-lg text-center hover:bg-neon-lime transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
