












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
  const amplitude = Math.min(Math.max(window.innerHeight * 0.12, 48), 160)
  const width = window.innerWidth
  const height = window.innerHeight
  const value = (number: number) => Number(number.toFixed(2))
  const point = (px: number, py: number) => `${value(px)} ${value(py)}`
  const curve = (c1x: number, c1y: number, c2x: number, c2y: number, px: number, py: number) =>
    `C ${point(c1x, c1y)}, ${point(c2x, c2y)}, ${point(px, py)}`
  const source = point(x, y)
  const fromPath = `M ${source} ${Array.from({ length: 6 }, () => `C ${source}, ${source}, ${source}`).join(' ')} Z`
  const middlePath = [
    `M ${source}`,
    curve(x + (width - x) * 0.25, y - amplitude, x + (width - x) * 0.75, y - amplitude, width, y - amplitude * 0.24),
    curve(width, y - amplitude * 0.24, width, y + amplitude * 0.24, width, y + amplitude * 0.24),
    curve(x + (width - x) * 0.75, y + amplitude, x + (width - x) * 0.25, y + amplitude, x, y),
    curve(x * 0.25, y + amplitude, x * 0.75, y + amplitude, 0, y + amplitude * 0.24),
    curve(0, y + amplitude * 0.24, 0, y - amplitude * 0.24, 0, y - amplitude * 0.24),
    curve(x * 0.75, y - amplitude, x * 0.25, y - amplitude, x, y),
    'Z',
  ].join(' ')
  const fullPath = [
    `M ${source}`,
    curve(x, 0, 0, 0, 0, 0),
    curve(width * 0.25, 0, width * 0.75, 0, width, 0),
    curve(width, height * 0.25, width, height * 0.75, width, height),
    curve(width * 0.75, height, width * 0.25, height, 0, height),
    curve(0, height * 0.75, 0, height * 0.25, 0, 0),
    curve(0, 0, x, 0, x, y),
    'Z',
  ].join(' ')
  root.style.setProperty('--theme-wave-from', `path("${fromPath}")`)
  root.style.setProperty('--theme-wave-middle', `path("${middlePath}")`)
  root.style.setProperty('--theme-wave-full', `path("${fullPath}")`)
  root.dataset.themeSweep = 'on'
  doc
    .startViewTransition(() => applyTheme(theme))
    .finished.finally(() => {
      delete root.dataset.themeSweep
      root.style.removeProperty('--theme-wave-from')
      root.style.removeProperty('--theme-wave-middle')
      root.style.removeProperty('--theme-wave-full')
    })
}


export function toggleTheme(from?: Element | null): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  const r = from?.getBoundingClientRect()
  setTheme(next, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined)
  return next
}
