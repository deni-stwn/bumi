import { useEffect, useState } from 'react'

/**
 * The id of the section being read: the last of `ids` whose top has passed a line `offset` of the
 * viewport height from the top (at most 320 px down). The first id until then.
 */
export function useScrollSpy(ids: string[], offset = 0.35) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(' ')
  useEffect(() => {
    const list = key.split(' ')
    // A pending animation frame, so a burst of scroll events measures once per frame.
    const pending = { frame: 0 }
    const update = () => {
      pending.frame = 0
      const line = Math.min(window.innerHeight * offset, 320)
      let current = list[0]
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!pending.frame) pending.frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(pending.frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key, offset])
  return active
}
