import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { gsap, prefersReducedMotion } from './motion'

/**
 * Glides to the element with this id on the house curve, stopping at its `scroll-margin-top`, then
 * moves focus there like a native anchor jump (so Tab continues from the section). Returns false if
 * there is no such element.
 */
export function scrollToSection(id: string): boolean {
  const target = document.getElementById(id)
  if (!target) return false
  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
  const targetY = () => target.getBoundingClientRect().top + window.scrollY - offset
  const y = targetY()
  const focusTarget = () => {
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1')
      target.dataset.scrollTarget = ''
    }
    target.focus({ preventScroll: true })
  }
  if (prefersReducedMotion()) {
    window.scrollTo(0, y)
    focusTarget()
    return true
  }
  gsap.to(window, {
    // autoKill: a wheel or touch scroll by the visitor takes over at once.
    scrollTo: { y, autoKill: true },
    duration: gsap.utils.clamp(0.6, 1.6, 0.5 + Math.abs(y - window.scrollY) / 2500),
    ease: 'house',
    overwrite: true,
    onComplete: () => {
      // Late layout (a web font arriving mid-glide) can move the section: settle onto it.
      const settled = targetY()
      if (Math.abs(settled - window.scrollY) > 2) {
        gsap.to(window, {
          scrollTo: settled,
          duration: 0.35,
          ease: 'house-out',
          onComplete: focusTarget,
        })
      } else {
        focusTarget()
      }
    },
  })
  return true
}

/**
 * Smooth scrolling for every in-page link (`#id`, `/#id`, `/contact#enquiry`):
 * - same page: glide to the section;
 * - another page (or the same page with another query, e.g. a listing tab): open it, then glide to
 *   the section once it has rendered.
 * The hash is written to the URL afterwards (shareable), without a router navigation, because
 * React Router's ScrollRestoration would jump to it instantly.
 */
export function useSmoothAnchors() {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const pending = useRef<{ page: string; id: string } | null>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }
      const link = (event.target as Element | null)?.closest('a[href]')
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download')) return
      if (link.target && link.target !== '_self') return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.hash.length < 2) return

      const id = decodeURIComponent(url.hash.slice(1))
      // Runs in the capture phase, so React Router's <Link> sees defaultPrevented and stands down
      // (its own onClick, e.g. closing the mobile menu, still runs).
      event.preventDefault()
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        if (scrollToSection(id)) window.history.replaceState(window.history.state, '', url.hash)
      } else {
        pending.current = { page: url.pathname + url.search, id }
        void navigate(url.pathname + url.search)
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate])

  // Arrived on the page the link pointed to (rendered, at the top): let its intro start, then glide.
  useEffect(() => {
    if (pending.current?.page !== pathname + search) return
    const { id } = pending.current
    pending.current = null
    const timer = window.setTimeout(() => {
      if (scrollToSection(id)) {
        window.history.replaceState(window.history.state, '', `#${encodeURIComponent(id)}`)
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [pathname, search])
}
