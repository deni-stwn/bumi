export type Service = {
  slug: string
  number: string
  title: string
  summary: string
  features: string[]
}

/** Services frames 9349 / 7131 / 10042, copy as designed (the stray closing quote included, design-notes SV3). */
export const services: Service[] = [
  {
    slug: 'property-management',
    number: '01',
    title: 'Properties Management',
    summary:
      'Our property management service ensures your assets are well-maintained and yield maximum returns. From tenant handling to property upkeep, we take care of everything.',
    features: ['Property maintenance and repairs.', 'Tenant management.', 'Revenue optimization.'],
  },
  {
    slug: 'real-estate-consultation',
    number: '02',
    title: 'Real Estate Consultation',
    summary:
      'Receive expert advice on buying, selling, or investing in real estate. With our deep market knowledge, we guide you through every step to make informed decisions."',
    features: [
      'Market analysis.',
      'Property recommendations.',
      'Assistance with buying/selling processes.',
    ],
  },
  {
    slug: 'investment-opportunities',
    number: '03',
    title: 'Investment Opportunities',
    summary:
      'Discover high-yield property investment opportunities tailored to your financial goals. Our team identifies and evaluates profitable projects for your success.',
    features: [
      'Commercial property investments.',
      'New development projects.',
      'Data-driven investment insights.',
    ],
  },
]
