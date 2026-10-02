import { useEffect } from 'react'
import { applyShellScroller } from '@/lib/scrolltrigger'






export const SCROLLER_ID = 'main-content'

export function getScroller(): HTMLElement | null {
  return document.getElementById(SCROLLER_ID)
}


















export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return











    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches




    const isNarrow = window.innerWidth < 900
    if (isMobile || isNarrow) return

    let cancelled = false
    let cleanup = () => {}

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      applyShellScroller(ScrollTrigger)




      const panel = getScroller()
      const usesPanel = !!panel && window.innerWidth >= 1100
      const content = panel?.firstElementChild as HTMLElement | undefined

      const lenis = new Lenis({
        ...(usesPanel && content ? { wrapper: panel, content } : {}),




        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })


      lenis.on('scroll', ScrollTrigger.update)


      const tick = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)



      const NAV_OFFSET = -88
      const onAnchorClick = (e: MouseEvent) => {

        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
        if (!link) return
        const href = link.getAttribute('href')
        if (!href || href === '#') return

        if (href === `#${SCROLLER_ID}`) return

        if (href === '#top') {
          e.preventDefault()
          lenis.scrollTo(0, { duration: 1.1 })
          history.replaceState(null, '', ' ')
          return
        }
        const target = document.querySelector(href) as HTMLElement | null
        if (!target) return
        e.preventDefault()
        lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 })
        history.replaceState(null, '', href)
      }
      document.addEventListener('click', onAnchorClick)

      cleanup = () => {
        document.removeEventListener('click', onAnchorClick)
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
