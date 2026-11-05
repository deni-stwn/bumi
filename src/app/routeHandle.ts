import type { NavTone } from '@/components/layout/navTone'

/** Per-route layout options, read by SiteLayout through `useMatches`. */
export type RouteHandle = {
  navbar: { tone: NavTone; overlay?: boolean; hideOnTablet?: boolean }
}

export const onLight: RouteHandle = { navbar: { tone: 'onLight' } }
export const onImage: RouteHandle = { navbar: { tone: 'onImage', overlay: true } }
