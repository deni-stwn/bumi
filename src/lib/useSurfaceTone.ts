import { useEffect, useState, type RefObject } from 'react'

export type SurfaceTone = 'dark' | 'light'

/** Relative luminance of an `rgb()` / `rgba()` colour, or null when it is (nearly) transparent. */
function opaqueLuminance(color: string): number | null {
  const parts = color.match(/[\d.]+/g)?.map(Number)
  if (!parts || parts.length < 3) return null
  const [r, g, b, a = 1] = parts
  if (a < 0.6) return null
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

/** Whether what shows at (x, y), under `self`, is a photo or a dark fill. */
function isDarkAt(x: number, y: number, self: HTMLElement): boolean {
  for (const el of document.elementsFromPoint(x, y)) {
    if (self.contains(el)) continue
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return true
    const luminance = opaqueLuminance(getComputedStyle(el).backgroundColor)
    if (luminance !== null) return luminance < 0.5
  }
  return false
}

/**
 * The tone of the page behind a fixed element, kept in sync while scrolling: `dark` over photos and
 * dark fills, `light` elsewhere. Starts at `initial` (the route's navbar tone) until measured, so the
 * first paint matches the design.
 */
export function useSurfaceTone(ref: RefObject<HTMLElement | null>, initial: SurfaceTone) {
  const [tone, setTone] = useState<SurfaceTone>(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // A new route starts from its own tone; navigation also scrolls, which measures again.
    setTone(initial)
    const pending = { frame: 0 }
    const measure = () => {
      pending.frame = 0
      const box = el.getBoundingClientRect()
      if (!box.width) return
      setTone(isDarkAt(box.left + box.width / 2, box.top + box.height / 2, el) ? 'dark' : 'light')
    }
    const schedule = () => {
      if (!pending.frame) pending.frame = requestAnimationFrame(measure)
    }
    // Late images and reveals change what is behind the logo: measure again shortly after.
    const late = window.setTimeout(schedule, 600)
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(pending.frame)
      window.clearTimeout(late)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, initial])
  return tone
}
