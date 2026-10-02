import { lazy, Suspense, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Outlet, useLocation } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import QuickMenu from '@/components/QuickMenu'
import Rail from '@/components/Rail'
import IntroOverlay from '@/components/IntroOverlay'
import CursorRing from '@/components/CursorRing'
import AccessMenu from '@/components/AccessMenu'
import PortfolioBot from '@/components/PortfolioBot'
import { motionReduced } from '@/lib/a11y'
import { useLenis, SCROLLER_ID } from '@/hooks/useLenis'
import { useIsPhone } from '@/hooks/useMediaQuery'
import { getPerfTier, watchFrameHealth, PERF_TIER_EVENT } from '@/lib/perf'






const HeroCanvas = lazy(() => import('@/components/HeroCanvasV2'))










export default function App() {
  useLenis()

  const { pathname } = useLocation()
  const FIXED_ROUTES = ['/', '/projects', '/credentials', '/testimonials', '/about', '/contact']
  const isFixed = FIXED_ROUTES.includes(pathname)




  const phone = useIsPhone()
  const panelRef = useRef<HTMLElement>(null)



  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])





  const firstPath = useRef(pathname)
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.classList.add('has-navigated')
  }, [pathname])




  const [perfTier, setPerfTier] = useState(getPerfTier)
  useEffect(() => {
    const onTier = (e: Event) => setPerfTier((e as CustomEvent).detail)
    window.addEventListener(PERF_TIER_EVENT, onTier)
    void watchFrameHealth()
    return () => window.removeEventListener(PERF_TIER_EVENT, onTier)
  }, [])

  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    if (reduced || isMobile) return



    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }


    const start = () => {
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setShouldLoadCanvas(true), { timeout: 3000 })
      } else {
        window.setTimeout(() => setShouldLoadCanvas(true), 1500)
      }
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }, [])

  return (
    <>
      <IntroOverlay />
      <CursorRing />
      <a href={`#${SCROLLER_ID}`} className="skip-link">Skip to main content</a>
      {shouldLoadCanvas && perfTier !== 'low' && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}
      {phone && pathname !== '/' && <QuickMenu className="qmenu--float" />}
      <div className="shell">
        <Rail />
        <main
          ref={panelRef}
          id={SCROLLER_ID}
          className="shell__panel"
          data-fixed={isFixed ? 'true' : 'false'}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      {phone && <TabBar />}
      <AccessMenu />
      <PortfolioBot />
      <Analytics />
    </>
  )
}
