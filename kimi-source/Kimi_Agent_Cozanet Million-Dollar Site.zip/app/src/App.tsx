import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import NeonNetwork from '@/components/NeonNetwork'

const Home = lazy(() => import('@/pages/Home'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Features = lazy(() => import('@/pages/Features'))
const Ecosystem = lazy(() => import('@/pages/Ecosystem'))
const Company = lazy(() => import('@/pages/Company'))

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Pages where WebGL background should be active
const webGLPages = ['/', '/ecosystem']

function App() {
  const location = useLocation()
  const showWebGL = webGLPages.includes(location.pathname)
  const isDashboard = location.pathname === '/dashboard'

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />

      {/* WebGL Background - only on specific pages */}
      {showWebGL && <NeonNetwork />}

      {/* Navigation - hidden on dashboard */}
      {!isDashboard && <Navbar />}

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-deep-space">
              <div className="w-8 h-8 border-2 border-neon-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/features" element={<Features />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/company" element={<Company />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
