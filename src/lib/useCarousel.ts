import { useCallback, useEffect, useRef, useState } from 'react'

/** Where each slide sits when scrolled to the track's start edge, clamped to the scroll range. */
function slidePositions(el: HTMLElement) {
  const max = el.scrollWidth - el.clientWidth
  return (Array.from(el.children) as HTMLElement[]).map((s) =>
    Math.min(Math.max(s.offsetLeft - el.offsetLeft, 0), max),
  )
}

/**
 * A native horizontal scroller driven by prev/next buttons. Slides are the track's direct children;
 * `index` is the slide nearest the track's start edge, kept in sync with touch/trackpad scrolling.
 * Slides that cannot reach the start edge (the last ones, when the track ends) share the end
 * position: next and prev skip them instead of standing still, and wrap around at the ends.
 */
export function useCarousel<T extends HTMLElement>(count: number) {
  const track = useRef<T>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const positions = slidePositions(el)
      let nearest = 0
      positions.forEach((p, i) => {
        if (Math.abs(p - el.scrollLeft) < Math.abs(positions[nearest] - el.scrollLeft)) nearest = i
      })
      setIndex(nearest)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((left: number) => {
    const el = track.current
    if (!el) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  const go = useCallback(
    (i: number) => {
      const el = track.current
      if (!el || i < 0 || i >= el.children.length) return
      setIndex(i)
      scrollTo(slidePositions(el)[i])
    },
    [scrollTo],
  )

  /** The next (step 1) or previous (step -1) slide that actually moves the track, wrapping around. */
  const step = useCallback(
    (direction: 1 | -1) => {
      const el = track.current
      if (!el) return
      const positions = slidePositions(el)
      const here = positions[index] ?? el.scrollLeft
      const order = Array.from(
        { length: count - 1 },
        (_, k) => (index + direction * (k + 1) + count) % count,
      )
      const target = order.find((i) => Math.abs(positions[i] - here) > 1) ?? index
      go(target)
    },
    [count, go, index],
  )

  return {
    track,
    index,
    go,
    // Wraps around: the design shows both buttons active on the first slide.
    prev: () => step(-1),
    next: () => step(1),
  }
}
