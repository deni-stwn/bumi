import { useEffect, useState, type RefObject } from 'react'

/** Whether an element's content is wider than the element (so it scrolls sideways). */
export function useOverflowX(ref: RefObject<HTMLElement | null>) {
  const [overflows, setOverflows] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    for (const child of el.children) observer.observe(child)
    return () => observer.disconnect()
  }, [ref])
  return overflows
}
