import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A native horizontal scroller driven by prev/next buttons. Slides are the track's direct children;
 * `index` is the slide nearest the track's start edge, kept in sync with touch/trackpad scrolling.
 */
export function useCarousel<T extends HTMLElement>(count: number) {
  const track = useRef<T>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const slides = Array.from(el.children) as HTMLElement[]
      const distance = (s: HTMLElement) => Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft)
      let nearest = 0
      slides.forEach((s, i) => {
        if (distance(s) < distance(slides[nearest])) nearest = i
      })
      setIndex(nearest)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const go = useCallback((i: number) => {
    const el = track.current
    const target = el?.children[i] as HTMLElement | undefined
    if (!el || !target) return
    setIndex(i)
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  return {
    track,
    index,
    go,
    // Wraps around: the design shows both buttons active on the first slide.
    prev: () => go((index - 1 + count) % count),
    next: () => go((index + 1) % count),
  }
}
