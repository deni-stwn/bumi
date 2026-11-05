import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { useRevealMotion } from '@/lib/useRevealMotion'
import { useSmoothAnchors } from '@/lib/useSmoothAnchors'
import { onLight, type RouteHandle } from './routeHandle'

export function SiteLayout() {
  const { pathname } = useLocation()
  const matches = useMatches()
  const handle = (matches.at(-1)?.handle as RouteHandle | undefined) ?? onLight
  useRevealMotion(pathname)
  // In-page links (TOC, Market Trends overview) glide to their section instead of jumping.
  useSmoothAnchors()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-neutral-white px-4 py-3 text-body-xs-semibold text-gray-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar {...handle.navbar} />
      {/* Some rules and carousels run to the frame edge, as in the design: never a page scrollbar. */}
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
