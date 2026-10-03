












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
  const radiusX = Math.max(x, window.innerWidth - x) * Math.SQRT2 + 1
  const radiusY = Math.max(y, window.innerHeight - y) * Math.SQRT2 + 1
  root.style.setProperty('--theme-wave-origin-x', `${x}px`)
  root.style.setProperty('--theme-wave-origin-y', `${y}px`)
  root.style.setProperty('--theme-wave-radius-x', `${radiusX}px`)
  root.style.setProperty('--theme-wave-radius-y', `${radiusY}px`)
  root.dataset.themeSweep = 'on'
  doc
    .startViewTransition(() => applyTheme(theme))
    .finished.finally(() => {
      delete root.dataset.themeSweep
      root.style.removeProperty('--theme-wave-origin-x')
      root.style.removeProperty('--theme-wave-origin-y')
      root.style.removeProperty('--theme-wave-radius-x')
      root.style.removeProperty('--theme-wave-radius-y')
    })
}


export function toggleTheme(from?: Element | null): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  const r = from?.getBoundingClientRect()
  setTheme(next, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  return next
}
