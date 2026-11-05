import type { NavItem } from '@/data/navigation'

/** A nav item is current on its own page, its sub-pages and the pages of its dropdown. */
export function isActive(item: NavItem, pathname: string) {
  if (item.to === '/') return pathname === '/'
  return (
    pathname === item.to ||
    pathname.startsWith(`${item.to}/`) ||
    (item.children ?? []).some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))
  )
}
