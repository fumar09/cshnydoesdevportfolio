import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ArrowCounterClockwise } from '@/components/slab'
import { DEFAULT_PREFS, readPrefs, savePrefs, type A11yPrefs, type TextSize } from '@/lib/a11y'
import { useDismiss, type DismissReason } from '@/hooks/useDismiss'







const SIZES: { value: TextSize; label: string; hint: string }[] = [
  { value: 'md', label: 'A', hint: 'Default text size' },
  { value: 'lg', label: 'A+', hint: 'Larger text' },
  { value: 'xl', label: 'A++', hint: 'Largest text' },
]

const SWITCHES: { key: 'contrast' | 'motion' | 'links'; label: string; desc: string }[] = [
  { key: 'contrast', label: 'High contrast', desc: 'Darker text, stronger edges' },
  { key: 'motion', label: 'Reduce motion', desc: 'No animation or drifting' },
  { key: 'links', label: 'Underline links', desc: 'Every link gets a line' },
]




export const A11Y_OPEN_EVENT = 'a11y:open'

export default function AccessMenu() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<A11yPrefs>(readPrefs)
  const [panelPosition, setPanelPosition] = useState({ left: 16, top: 16, transformOrigin: 'top left' })
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const returnRef = useRef<HTMLElement | null>(null)

  const close = useCallback((reason: DismissReason | 'button') => {
    setOpen(false)


    if (reason !== 'outside') {
      const opener = returnRef.current
      if (opener?.isConnected) opener.focus()
    }
    returnRef.current = null
  }, [])
  useDismiss(open, rootRef, close)



  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onOpen = (e: Event) => {
      const opener = (e as CustomEvent<HTMLElement | null>).detail
      returnRef.current = opener

      if (opener) {
        const rect = opener.getBoundingClientRect()
        const panelRect = panelRef.current?.getBoundingClientRect()
        const panelWidth = panelRect?.width || Math.min(300, window.innerWidth - 32)
        const panelHeight = panelRect?.height || 360
        const maxLeft = Math.max(16, window.innerWidth - panelWidth - 16)
        const maxTop = Math.max(16, window.innerHeight - panelHeight - 16)
        const isQuickMenu = opener.closest('.qmenu') !== null
        const left = isQuickMenu
          ? Math.min(maxLeft, Math.max(16, rect.right - panelWidth))
          : Math.min(maxLeft, Math.max(16, rect.right + 12))
        const top = isQuickMenu
          ? Math.min(maxTop, Math.max(16, rect.bottom + 8))
          : Math.min(maxTop, Math.max(16, rect.top - panelHeight / 2))

        setPanelPosition({
          left,
          top,
          transformOrigin: isQuickMenu ? 'top right' : 'center left',
        })
      }

      setOpen(true)
    }
    window.addEventListener(A11Y_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(A11Y_OPEN_EVENT, onOpen)
  }, [])

  function update(next: A11yPrefs) {
    setPrefs(next)
    savePrefs(next)
  }

  const changed = prefs.text !== 'md' || prefs.contrast || prefs.motion || prefs.links

  return (
    <div className={`a11y${open ? ' is-open' : ''}`} data-widget="a11y" ref={rootRef}>
      <div
        className="a11y__panel"
        role="dialog"
        aria-label="Accessibility settings"
        tabIndex={-1}
        ref={panelRef}
        style={panelPosition}
        inert={!open || undefined}
      >
        <header className="a11y__head">
          <span className="a11y__title">Settings</span>
          <button
            type="button"
            className="a11y__close"
            onClick={() => close('button')}
            aria-label="Close accessibility options"
          >
            <X size={16} weight="bold" aria-hidden="true" />
          </button>
        </header>

        <div className="a11y__group" role="group" aria-label="Text size">
          <span className="a11y__label">Text size</span>
          <div className="a11y__sizes">
            {SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                className={`a11y__size${prefs.text === s.value ? ' is-on' : ''}`}
                aria-pressed={prefs.text === s.value}
                aria-label={s.hint}
                onClick={() => update({ ...prefs, text: s.value })}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="a11y__list">
          {SWITCHES.map((s) => (
            <li key={s.key}>
              <button
                type="button"
                className={`a11y__switch${prefs[s.key] ? ' is-on' : ''}`}
                aria-pressed={prefs[s.key]}
                onClick={() => update({ ...prefs, [s.key]: !prefs[s.key] })}
              >
                <span className="a11y__switch-text">
                  <span className="a11y__switch-label">{s.label}</span>
                  <span className="a11y__switch-desc">{s.desc}</span>
                </span>
                <span className="a11y__toggle" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="a11y__reset"
          onClick={() => update(DEFAULT_PREFS)}
          disabled={!changed}
        >
          <ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />
          Reset to default
        </button>
      </div>
    </div>
  )
}
