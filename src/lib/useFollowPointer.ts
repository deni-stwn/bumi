import type { RefObject } from 'react'
import { gsap, MOTION_QUERY, useGSAP } from './motion'

/**
 * The `[data-follow-pointer]` element inside `area` follows the mouse while it is over the area,
 * kept inside the area's box, and glides back to its place when the mouse leaves, including when a
 * scroll carries the area away from under a still mouse (no pointerleave fires then). Only for a fine
 * pointer that can hover, and not when the visitor prefers less motion: touch and keyboard users get
 * the button where the design puts it.
 */
export function useFollowPointer(area: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const el = area.current
      const target = el?.querySelector<HTMLElement>('[data-follow-pointer]')
      if (!el || !target) return
      const mm = gsap.matchMedia()
      mm.add(`${MOTION_QUERY} and (hover: hover) and (pointer: fine)`, () => {
        const toX = gsap.quickTo(target, 'x', { duration: 0.7, ease: 'power3.out' })
        const toY = gsap.quickTo(target, 'y', { duration: 0.7, ease: 'power3.out' })
        let pointer: { x: number; y: number } | null = null
        const move = (event: PointerEvent) => {
          pointer = { x: event.clientX, y: event.clientY }
          const box = el.getBoundingClientRect()
          const button = target.getBoundingClientRect()
          // The button's resting centre: where it is now, less the offset it has moved by.
          const restX = button.left + button.width / 2 - Number(gsap.getProperty(target, 'x'))
          const restY = button.top + button.height / 2 - Number(gsap.getProperty(target, 'y'))
          const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
          toX(
            clamp(event.clientX, box.left + button.width / 2, box.right - button.width / 2) - restX,
          )
          toY(
            clamp(event.clientY, box.top + button.height / 2, box.bottom - button.height / 2) -
              restY,
          )
        }
        const leave = () => {
          pointer = null
          toX(0)
          toY(0)
        }
        const scroll = () => {
          if (!pointer) return
          const box = el.getBoundingClientRect()
          const inside =
            pointer.x >= box.left &&
            pointer.x <= box.right &&
            pointer.y >= box.top &&
            pointer.y <= box.bottom
          if (!inside) leave()
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        window.addEventListener('scroll', scroll, { passive: true })
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
          window.removeEventListener('scroll', scroll)
          gsap.set(target, { clearProps: 'transform' })
        }
      })
      return () => mm.revert()
    },
    { scope: area },
  )
}
