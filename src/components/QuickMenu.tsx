import { useCallback, useEffect, useId, useRef, useState, type FocusEvent } from 'react'
import { Gear, CaretRight, DotsThree } from '@/components/slab'
import ThemeGlyph from './ThemeGlyph'
import { A11Y_OPEN_EVENT } from './AccessMenu'
import { getTheme, toggleTheme, type Theme } from '@/lib/theme'
import { useDismiss, type DismissReason } from '@/hooks/useDismiss'













export default function QuickMenu({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>(getTheme)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()


  useEffect(() => {
    const onTheme = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail)
    window.addEventListener('themechange', onTheme)
    return () => window.removeEventListener('themechange', onTheme)
  }, [])

  const close = useCallback((reason: DismissReason) => {
    setOpen(false)
    if (reason === 'escape') buttonRef.current?.focus()
  }, [])
  useDismiss(open, rootRef, close)


  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false)
  }

  const openSettings = () => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent(A11Y_OPEN_EVENT, { detail: buttonRef.current }))
  }

  return (
    <div className={`qmenu ${className}`.trim()} ref={rootRef} onBlur={onBlur}>
      <button
        type="button"
        className="qmenu__button"
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Theme and settings"
      >
        <DotsThree size={22} weight="bold" aria-hidden="true" />
      </button>

      <div id={panelId} className={`qmenu__panel${open ? ' is-open' : ''}`} inert={!open || undefined}>
        <button
          type="button"
          role="switch"
          aria-checked={theme === 'dark'}
          className="qmenu__row"
          onClick={(e) => setThemeState(toggleTheme(e.currentTarget))}
        >
          <ThemeGlyph theme={theme} size={19} />
          <span className="qmenu__label">Dark theme</span>
          <span className="qmenu__switch" aria-hidden="true" />
        </button>
        <span className="qmenu__sep" aria-hidden="true" />
        <button type="button" className="qmenu__row" aria-haspopup="dialog" onClick={openSettings}>
          <Gear size={19} aria-hidden="true" />
          <span className="qmenu__label">Settings</span>
          <CaretRight size={15} weight="bold" aria-hidden="true" className="qmenu__caret" />
        </button>
      </div>
    </div>
  )
}
