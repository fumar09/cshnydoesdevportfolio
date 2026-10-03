












export type Theme = 'light' | 'dark'

import { motionReduced } from './a11y'

const KEY = 'theme'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme


  const page = getComputedStyle(root).getPropertyValue('--cream').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', page)
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode: the theme just does not persist */
  }
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }))
}

export type SweepOrigin = { x: number; y: number }

type WithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}











export function setTheme(theme: Theme, origin?: SweepOrigin) {
  const doc = document as WithViewTransition
  const root = document.documentElement
  const reduce =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
  if (!doc.startViewTransition || reduce || getTheme() === theme) {
    applyTheme(theme)
    return
  }
  const x = Math.max(0, Math.min(window.innerWidth, origin?.x ?? window.innerWidth / 2))
  const y = Math.max(0, Math.min(window.innerHeight, origin?.y ?? window.innerHeight / 2))
  const radius = Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  ) + 2
  root.style.setProperty('--theme-sweep-x', `${x}px`)
  root.style.setProperty('--theme-sweep-y', `${y}px`)
  root.style.setProperty('--theme-sweep-radius', `${radius}px`)
  root.style.setProperty('--theme-sweep-diameter', `${radius * 2}px`)
  root.dataset.themeSweep = 'on'
  doc
    .startViewTransition(() => applyTheme(theme))
    .finished.finally(() => {
      delete root.dataset.themeSweep
      root.style.removeProperty('--theme-sweep-x')
      root.style.removeProperty('--theme-sweep-y')
      root.style.removeProperty('--theme-sweep-radius')
      root.style.removeProperty('--theme-sweep-diameter')
    })
}


export function toggleTheme(from?: Element | null, clickOrigin?: SweepOrigin): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  const r = from?.getBoundingClientRect()
  const origin = clickOrigin ?? (r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  setTheme(next, origin)
  return next
}
