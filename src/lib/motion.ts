import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, CustomEase)

/** House curve (0.76, 0, 0.24, 1): media zooms, bars, the car and anything that travels. */
CustomEase.create('house', '0.76,0,0.24,1')
/** Fast start, long settle: entrances (line reveals, fades, rises), so content answers at once. */
CustomEase.create('house-out', '0.16,1,0.3,1')

/** Motion only runs when the visitor has not asked for less of it. */
export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

/** For one-off checks outside gsap.matchMedia (menus, scrolling). */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
