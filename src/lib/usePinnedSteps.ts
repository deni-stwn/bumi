import type { RefObject } from 'react'
import { gsap, MOTION_QUERY, ScrollTrigger, useGSAP } from './motion'

/**
 * Scroll-driven steps: the `[data-step]` children of `root` share one screen. While the section is
 * pinned (one screen of scrolling per step), the step on screen follows the scroll position at once:
 * crossing halfway to the next step swaps it, with a short transition in which the old step has left
 * before the new one arrives (no lag behind the scroll, no snapping, never two steps on top of each
 * other). Then the page scrolls on. Sets `data-pinned` on the root so its CSS can stack the steps.
 * Only where a step fits the screen and motion is welcome (`query`, a media query list); elsewhere the
 * steps stay in the page's normal flow, as designed.
 */
export function usePinnedSteps(root: RefObject<HTMLElement | null>, query: string) {
  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()
      const media = query
        .split(',')
        .map((q) => `${MOTION_QUERY} and ${q.trim()}`)
        .join(', ')
      mm.add(media, () => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]', el)
        if (steps.length < 2) return
        el.dataset.pinned = ''
        const last = steps.length - 1
        let current = 0

        const show = (next: number, direction: number) => {
          if (next === current) return
          const previous = steps[current]
          current = next
          steps.forEach((s, k) => {
            // Only the step on screen takes the mouse; keyboard focus moves the scroll (below).
            s.style.pointerEvents = k === next ? '' : 'none'
            s.style.zIndex = k === next ? '1' : ''
            if (k !== next && s !== previous) gsap.set(s, { opacity: 0, y: 0, overwrite: true })
          })
          gsap.to(previous, {
            opacity: 0,
            y: -16 * direction,
            duration: 0.12,
            ease: 'power2.in',
            overwrite: true,
          })
          gsap.fromTo(
            steps[next],
            { opacity: 0, y: 16 * direction },
            { opacity: 1, y: 0, duration: 0.28, delay: 0.1, ease: 'house-out', overwrite: true },
          )
        }

        gsap.set(steps.slice(1), { opacity: 0 })
        steps.forEach((s, k) => {
          s.style.pointerEvents = k === 0 ? '' : 'none'
          s.style.zIndex = k === 0 ? '1' : ''
        })

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * last}`,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => show(Math.round(self.progress * last), self.direction),
        })

        // Tabbing into a step that is not on screen scrolls to it.
        const onFocus = (event: FocusEvent) => {
          const i = steps.findIndex((s) => s.contains(event.target as Node))
          if (i < 0 || i === current) return
          window.scrollTo({ top: trigger.start + ((trigger.end - trigger.start) * i) / last })
        }
        el.addEventListener('focusin', onFocus)
        ScrollTrigger.refresh()

        return () => {
          el.removeEventListener('focusin', onFocus)
          trigger.kill()
          delete el.dataset.pinned
          steps.forEach((s) => {
            s.style.pointerEvents = ''
            s.style.zIndex = ''
          })
          gsap.set(steps, { clearProps: 'opacity,transform' })
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )
}
