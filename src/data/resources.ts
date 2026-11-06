export type Resource = {
  title: string
  description: string
  /** Label of the nofill button next to the resource. */
  cta: string
  to: string
}

/** Resources frames 6564 / 7268 / 10179, copy as designed (no full stop after the Buyer's Guide line). */
export const resources: Resource[] = [
  {
    title: 'Mortgage Calculator',
    description: 'Estimate your payments and plan your purchase with our easy-to-use calculator.',
    cta: 'Use the calculator',
    to: '/resources/mortgage-calculator',
  },
  {
    title: 'Buyer’s Guide',
    description: 'A comprehensive guide to help you navigate the buying process like a pro',
    cta: 'Start your journey',
    to: '/resources/buyer-guide',
  },
  {
    title: 'Selling Guide',
    description: 'Learn how to prepare, market, and sell your property for the best value.',
    cta: 'Explore the guide',
    to: '/resources/selling-guide',
  },
  {
    title: 'Articles & Blog',
    description: 'Discover expert advice, tips, and news to enhance your real estate knowledge.',
    cta: 'Read the blog',
    to: '/blog',
  },
  {
    title: 'Market Trends',
    description: 'Stay updated with the latest real estate trends and insights in your area.',
    cta: 'See market trends',
    to: '/resources/market-trends',
  },
]
