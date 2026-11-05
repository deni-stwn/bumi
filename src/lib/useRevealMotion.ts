import { gsap, MOTION_QUERY, ScrollTrigger, SplitText, useGSAP } from './motion'

/**
 * Declarative scroll reveals. Mark an element with `data-reveal` and this hook animates it the
 * first time it enters the viewport:
 *
 * - `lines`   masked line-by-line rise (headings, statements). Split with SplitText, restored after.
 * - `up`      fade and 24 px rise of the whole element.
 * - `fade`    opacity only (navbar, small UI).
 * - `stagger` fade and rise of each direct child in turn (card grids, lists, rows).
 * - `media`   fade, and the first `img` inside settles from a 12 % zoom (needs `overflow-hidden`).
 * - `bars`    each `[data-bar]` inside rises from the bottom via clip-path (charts; text is not distorted).
 * - `count`   the first number in the text counts up from 0 (prefix, suffix and format kept).
 * - `wordmark` the child slides up from behind the element's lower edge (footer logo).
 * - `drive`   glides in from the left and settles (a hero object such as a product shot).
 *
 * Optional `data-reveal-delay="0.2"` adds seconds. Elements already in view on load play in DOM
 * order as the intro sequence. A reveal nested inside an `up` or `stagger` element is skipped, so a
 * block never animates twice (except `count` and `bars`, which don't fade the element itself).
 *
 * Rules: only opacity and transforms (no layout shift), cleared when done so CSS hovers keep
 * working; nothing uses `visibility`, so unrevealed
 * content stays reachable by keyboard (focus scrolls it in, which reveals it); with
 * `prefers-reduced-motion: reduce` or without JS nothing is hidden at all.
 */
export function useRevealMotion(routeKey: string) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_QUERY, (context) => {
        const all = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
        // `count` and `bars` don't touch the element's own opacity, so they may sit inside a fading block.
        const targets = all.filter(
          (el) =>
            el.dataset.reveal === 'count' ||
            el.dataset.reveal === 'bars' ||
            !el.parentElement?.closest('[data-reveal="up"], [data-reveal="stagger"]'),
        )

        // Intro: whatever is already on screen plays top to bottom, 80 ms apart. A heading holds
        // the queue a little longer so the copy under it never lands before it.
        let introIndex = 0
        const introDelay = (el: HTMLElement) => {
          const extra = Number(el.dataset.revealDelay ?? 0)
          if (el.getBoundingClientRect().top >= window.innerHeight * 0.9) return extra
          const delay = 0.1 + introIndex * 0.08 + extra
          introIndex += el.dataset.reveal === 'lines' ? 4 : 1
          return delay
        }
        const trigger = (el: HTMLElement) => ({ trigger: el, start: 'top 90%', once: true })
        const rise = (el: HTMLElement, delay: number) =>
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: 'house-out',
            delay,
            scrollTrigger: trigger(el),
            clearProps: 'opacity,transform',
          })

        for (const el of targets) {
          const delay = introDelay(el)
          switch (el.dataset.reveal) {
            case 'lines': {
              // autoSplit re-splits when the web font arrives (or the width changes) and carries the
              // tween's progress over, so lines start at once and still break where the final text does.
              const split = SplitText.create(el, {
                type: 'lines',
                mask: 'lines',
                // Lines keep words whole, so screen readers read the split text as is. ("auto" would
                // put aria-label on the element, which is not allowed on a <p>.)
                aria: 'none',
                // Browsers also wrap after a hyphen between letters ("technology-/driven"); SplitText
                // only breaks between its word boxes, so split after spaces and those hyphens (kept in
                // the word) or the split text wraps differently and shifts the page while it animates.
                wordDelimiter: { delimiter: /(?<= )|(?<=\p{L}-)(?=\p{L})/u, replaceWith: '' },
                autoSplit: true,
                onSplit: (self) => {
                  // A word wider than its box breaks mid-word (overflow-wrap, as FigCraft does), but a
                  // split word can't: then the element rises as a whole instead of wrapping differently.
                  if (self.lines.some((line) => line.scrollWidth > line.clientWidth + 1)) {
                    self.kill()
                    self.revert()
                    return rise(el, delay)
                  }
                  return gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.2,
                    ease: 'house-out',
                    stagger: 0.08,
                    delay,
                    scrollTrigger: trigger(el),
                    // Done: stop listening and restore the original markup (no stray wrappers).
                    onComplete: () => {
                      split.kill()
                      split.revert()
                    },
                  })
                },
              })
              break
            }
            case 'up':
              rise(el, delay)
              break
            case 'fade':
              gsap.from(el, {
                opacity: 0,
                duration: 0.8,
                ease: 'power1.out',
                delay,
                scrollTrigger: trigger(el),
                clearProps: 'opacity',
              })
              break
            case 'stagger':
              gsap.from(el.children, {
                opacity: 0,
                y: 32,
                duration: 1,
                ease: 'house-out',
                stagger: 0.09,
                delay,
                scrollTrigger: trigger(el),
                clearProps: 'opacity,transform',
              })
              break
            case 'media': {
              const img = el.querySelector('img')
              const tl = gsap.timeline({ delay, scrollTrigger: trigger(el) })
              tl.from(el, { opacity: 0, duration: 0.9, ease: 'power1.out', clearProps: 'opacity' })
              if (img) {
                tl.from(
                  img,
                  { scale: 1.12, duration: 1.6, ease: 'house', clearProps: 'transform' },
                  0,
                )
              }
              break
            }
            case 'bars':
              gsap.fromTo(
                el.querySelectorAll('[data-bar]'),
                { clipPath: 'inset(100% 0% 0% 0%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.2,
                  ease: 'house',
                  stagger: 0.12,
                  delay,
                  scrollTrigger: trigger(el),
                  clearProps: 'clipPath',
                },
              )
              break
            case 'count': {
              const text = el.textContent ?? ''
              const match = text.match(/\d[\d,]*(\.\d+)?/)
              if (!match) break
              const [raw, fraction] = match
              const end = Number(raw.replace(/,/g, ''))
              const decimals = fraction ? fraction.length - 1 : 0
              const grouped = raw.includes(',')
              const before = text.slice(0, match.index)
              const after = text.slice((match.index ?? 0) + raw.length)
              const counter = { value: 0 }
              const format = (n: number) =>
                n.toLocaleString('en-US', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                  useGrouping: grouped,
                })
              el.textContent = before + format(0) + after
              gsap.to(counter, {
                value: end,
                duration: 1.6,
                ease: 'power2.out',
                delay,
                scrollTrigger: trigger(el),
                onUpdate: () => {
                  el.textContent = before + format(counter.value) + after
                },
                onComplete: () => {
                  el.textContent = text
                },
              })
              // Restore the real text if the page changes mid-count.
              context.add(() => () => {
                el.textContent = text
              })
              break
            }
            case 'drive':
              gsap.from(el, {
                opacity: 0,
                xPercent: -14,
                duration: 1.8,
                ease: 'house',
                delay,
                scrollTrigger: trigger(el),
                clearProps: 'opacity,transform',
              })
              break
            case 'wordmark': {
              const child = el.firstElementChild
              if (!child) break
              gsap.from(child, {
                yPercent: 100,
                duration: 1.4,
                ease: 'house',
                delay,
                scrollTrigger: trigger(el),
                clearProps: 'transform',
              })
              break
            }
          }
        }

        // Images and fonts settle after setup; measure trigger positions again once they have.
        void document.fonts.ready.then(() => ScrollTrigger.refresh())
      })
    },
    { dependencies: [routeKey], revertOnUpdate: true },
  )
}
