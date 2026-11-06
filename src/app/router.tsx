import { createBrowserRouter, type RouteObject } from 'react-router'
import { onImage, onLight, type RouteHandle } from './routeHandle'
import { SiteLayout } from './SiteLayout'

// Pages are added one at a time as they pass the Definition of Done (docs/slicing-rules.md §13).
const pages: RouteObject[] = [
  {
    index: true,
    // Navbar on the photo; the tablet Home frame has none (design-notes H1).
    handle: {
      navbar: { tone: 'onImage', overlay: true, hideOnTablet: true },
    } satisfies RouteHandle,
    lazy: async () => ({ Component: (await import('@/pages/HomePage')).default }),
  },
  {
    path: 'about',
    handle: onImage,
    lazy: async () => ({ Component: (await import('@/pages/AboutPage')).default }),
  },
  {
    path: 'properties',
    handle: onImage,
    lazy: async () => ({ Component: (await import('@/pages/PropertiesPage')).default }),
  },
  {
    path: 'properties/search',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/PropertiesSearchPage')).default }),
  },
  {
    path: 'properties/:slug',
    handle: onImage,
    lazy: async () => ({ Component: (await import('@/pages/PropertyDetailPage')).default }),
  },
  {
    path: 'services',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/ServicesPage')).default }),
  },
  {
    path: 'services/:slug',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/ServiceDetailPage')).default }),
  },
  {
    path: 'resources',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/ResourcesPage')).default }),
  },
  {
    path: 'resources/mortgage-calculator',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/MortgageCalculatorPage')).default }),
  },
  {
    path: 'resources/market-trends',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/MarketTrendsPage')).default }),
  },
  {
    // Buyer and Selling Guide; other resource pages get their own static routes, which rank first.
    path: 'resources/:guide',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/GuidePage')).default }),
  },
  {
    path: 'blog',
    handle: onImage,
    lazy: async () => ({ Component: (await import('@/pages/BlogPage')).default }),
  },
  {
    path: '*',
    handle: onLight,
    lazy: async () => ({ Component: (await import('@/pages/NotFoundPage')).default }),
  },
]

// Component sheet for visual QA of src/components, development builds only.
const devPages: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: '_kit',
        handle: onLight,
        lazy: async () => ({ Component: (await import('@/pages/dev/KitPage')).default }),
      },
    ]
  : []

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    // Pages are lazy routes: nothing to show before the first one has loaded.
    HydrateFallback: () => null,
    children: [...devPages, ...pages],
  },
])
