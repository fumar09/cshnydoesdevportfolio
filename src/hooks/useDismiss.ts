import { useEffect, type RefObject } from 'react'

export type DismissReason = 'escape' | 'outside'









export function useDismiss(
  open: boolean,
  rootRef: RefObject<HTMLElement | null>,
  onClose: (reason: DismissReason) => void,
) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose('escape')
    }
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onClose('outside')
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open, rootRef, onClose])
}
