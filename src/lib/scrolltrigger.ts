import { SCROLLER_ID } from '@/hooks/useLenis'

type ST = { defaults: (config: Record<string, unknown>) => unknown }












export function applyShellScroller(ScrollTrigger: ST) {
  if (typeof window === 'undefined') return
  if (window.innerWidth < 1100) return
  const scroller = document.getElementById(SCROLLER_ID)
  if (scroller) ScrollTrigger.defaults({ scroller })
}
