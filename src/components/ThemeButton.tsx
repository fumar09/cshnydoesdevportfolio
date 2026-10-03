import { useEffect, useState } from 'react'
import ThemeGlyph from './ThemeGlyph'
import { getTheme, toggleTheme, type Theme } from '@/lib/theme'





export default function ThemeButton({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => setTheme(getTheme()), [])
  return (
    <button
      type="button"
      className={`theme-btn ${className}`.trim()}
      onClick={(e) => setTheme(toggleTheme(e.currentTarget, e.detail > 0 ? { x: e.clientX, y: e.clientY } : undefined))}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <ThemeGlyph theme={theme} size={20} />
    </button>
  )
}
