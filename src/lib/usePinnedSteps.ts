import type { RefObject } from 'react'
import { gsap, MOTION_QUERY, ScrollTrigger, useGSAP } from './motion'

/**
 * Scroll-driven steps: the `[data-step]` children of `root` share one screen. While the section is
 * pinned, each screen-height of scrolling swaps the current step for the next (out up, in from
 * below), snapping to whole steps; then the page scrolls on. Sets `data-pinned` on the root so its
 * CSS can stack the steps. Only where a step fits the screen and motion is welcome (`query`);
 * elsewhere the steps stay in the page's normal flow, as designed.
 */
export function usePinnedSteps(root: RefObject<HTMLElement | null>, query: string) {
  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const mm = gsap.matchMedia()
      // A media query list: each alternative also needs motion to be welcome.
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
        const setCurrent = (i: number) => {
          current = i
          steps.forEach((s, k) => {
            // Only the step on screen takes the mouse; keyboard focus moves the scroll (below).
            s.style.pointerEvents = k === i ? '' : 'none'
            s.style.zIndex = k === i ? '1' : ''
          })
        }
        gsap.set(steps.slice(1), { opacity: 0, y: 60 })
        setCurrent(0)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${window.innerHeight * last}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            snap: {
              // From where the page actually is (GSAP passes a velocity-projected value, which a
              // keyboard jump would throw to the last step): onwards in the scroll direction, so a
              // short scroll moves one step, but within 8 % of a step it stays there.
              snapTo: () => {
                const st = tl.scrollTrigger
                const at = (st?.progress ?? 0) * last
                const nearest = Math.round(at)
                if (Math.abs(at - nearest) < 0.08) return nearest / last
                const forward = (st?.direction ?? 1) > 0
                return (forward ? Math.ceil(at) : Math.floor(at)) / last
              },
              duration: { min: 0.2, max: 0.6 },
              delay: 0.05,
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const i = Math.round(self.progress * last)
              if (i !== current) setCurrent(i)
            },
          },
        })
        steps.slice(1).forEach((step, k) => {
          tl.to(steps[k], { opacity: 0, y: -60, duration: 1 }, k).to(
            step,
            { opacity: 1, y: 0, duration: 1 },
            k,
          )
        })

        // Tabbing into a step that is not on screen scrolls to it.
        const onFocus = (event: FocusEvent) => {
          const i = steps.findIndex((s) => s.contains(event.target as Node))
          const st = tl.scrollTrigger
          if (i < 0 || i === current || !st) return
          window.scrollTo({ top: st.start + ((st.end - st.start) * i) / last })
        }
        el.addEventListener('focusin', onFocus)
        ScrollTrigger.refresh()

        return () => {
          el.removeEventListener('focusin', onFocus)
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
