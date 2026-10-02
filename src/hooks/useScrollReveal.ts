import { useEffect } from 'react'










export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )


    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' },
    )

    els.forEach((el) => obs.observe(el))





    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        for (const node of rec.addedNodes) {
          if (!(node instanceof HTMLElement)) continue
          const fresh = node.matches('[data-reveal]')
            ? [node]
            : Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]'))
          fresh.forEach((el) => {
            if (!el.classList.contains('is-revealed')) obs.observe(el)
          })
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      obs.disconnect()
    }
  }, [])
}
