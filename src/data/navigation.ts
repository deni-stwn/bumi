export type NavLink = { label: string; to: string }
export type NavItem = NavLink & { children?: NavLink[] }

/** Navbar order and labels from the Navbar component (18553 / 18585). */
export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Properties',
    to: '/properties',
    // Not designed (design-notes G5): the categories of the property filter.
    children: [
      { label: 'All Properties', to: '/properties' },
      { label: 'Residential', to: '/properties?type=residential' },
      { label: 'Commercial', to: '/properties?type=commercial' },
      { label: 'Vacation', to: '/properties?type=vacation' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'All Services', to: '/services' },
      { label: 'Property Management', to: '/services/property-management' },
      { label: 'Real Estate Consultation', to: '/services/real-estate-consultation' },
      { label: 'Investment Opportunities', to: '/services/investment-opportunities' },
    ],
  },
  {
    label: 'Resources',
    to: '/resources',
    children: [
      { label: 'All Resources', to: '/resources' },
      { label: 'Mortgage Calculator', to: '/resources/mortgage-calculator' },
      { label: 'Buyer’s Guide', to: '/resources/buyer-guide' },
      { label: 'Selling Guide', to: '/resources/selling-guide' },
      { label: 'Articles & Blog', to: '/blog' },
      { label: 'Market Trends', to: '/resources/market-trends' },
    ],
  },
  { label: 'Contact Us', to: '/contact' },
]

/** Footer navigation (Footer component 14988): upper-case through CSS, copy as designed. */
export const footerNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Properties', to: '/properties' },
  { label: 'Services', to: '/services' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
]

// placeholder: social profiles have no URL in the design.
export const socialLinks: NavLink[] = [
  { label: 'Medium', to: 'https://medium.com' },
  { label: 'Instagram', to: 'https://instagram.com' },
  { label: 'Youtube', to: 'https://youtube.com' },
  { label: 'X', to: 'https://x.com' },
]

// placeholder: contact details as designed.
export const contact = {
  phone: '(406) 555-0120',
  email: 'Hello@Bumi.Com',
  address: '4517 Washington Ave. Manchester, Kentucky 39495',
}
