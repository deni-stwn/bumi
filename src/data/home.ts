import { images, type ImageAsset } from '@/assets/images'
import { PartnerFlowsLogo } from '@/components/icons/PartnerFlowsLogo'
import { PartnerPinesLogo } from '@/components/icons/PartnerPinesLogo'
import { PartnerXarseLogo } from '@/components/icons/PartnerXarseLogo'
import { PartnerZampeyLogo } from '@/components/icons/PartnerZampeyLogo'

// placeholder: partner brands from the design; `lines` is how each name breaks in the design.
export const partners = [
  { name: 'Xarse Contractor', lines: ['Xarse', 'Contractor'], Logo: PartnerXarseLogo },
  { name: 'Zampey', lines: ['Zampey'], Logo: PartnerZampeyLogo },
  { name: 'Flows Properties', lines: ['Flows', 'Properties'], Logo: PartnerFlowsLogo },
  { name: 'Pines Real Estate', lines: ['Pines', 'Real Estate'], Logo: PartnerPinesLogo },
]

/** "Your Vision, Our Expertise." cards. */
export const homeServices = [
  {
    title: 'Property Management',
    description:
      'Comprehensive care for your investments, ensuring seamless operations and peace of mind.',
    to: '/services/property-management',
  },
  {
    title: 'Real Estate Consultation',
    description:
      'Expert guidance to help you navigate the complexities of buying, selling, or investing.',
    to: '/services/real-estate-consultation',
  },
  {
    title: 'Invest Opportunities',
    description:
      'Unlock lucrative real estate opportunities designed to grow your wealth and portfolio.',
    to: '/services/investment-opportunities',
  },
]

export type Insight = {
  slug: string
  title: string
  excerpt?: string
  date: string
  dateTime: string
  image: ImageAsset
  alt: string
}

// placeholder: article copy as designed.
const title = 'This is an article title, don’t expect to much on this'
const excerpt =
  'We are a trusted property agency connecting you with the best opportunities in the market. With years of experience, we are ready to guide you through every step of buying, selling, or investing in real estate.'
const date = { date: '12 November 2024', dateTime: '2024-11-12' }

export const insights: Insight[] = [
  {
    slug: 'aerial-neighbourhood',
    title,
    excerpt,
    ...date,
    image: images.articlesAerialRoundabout,
    alt: 'Aerial view of a neighbourhood around a roundabout',
  },
  {
    slug: 'glass-tower',
    title,
    ...date,
    image: images.articlesGlassTower,
    alt: 'Glass office tower against a blue sky',
  },
  {
    slug: 'white-kitchen',
    title,
    ...date,
    image: images.articlesWhiteKitchen,
    alt: 'Bright white kitchen with bar stools',
  },
  {
    slug: 'house-blue-sky',
    title,
    ...date,
    image: images.articlesHouseBlueSky,
    alt: 'Two-storey house under a blue sky',
  },
]

export type Testimonial = {
  name: string
  meta: [string, string]
  quote: string
  year: string
  avatar: ImageAsset
}

// placeholder: quotes copied as designed (closing quote mark only, design-notes H7).
export const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    meta: ['New Jersey', 'USA'],
    quote:
      'Bumi made finding our dream home stress-free and enjoyable!” Working with Bumi was an absolute pleasure. They understood exactly what we were looking for and went above and beyond to make the process seamless.',
    year: '2024',
    avatar: images.testimonialsAvatarJohnDoe,
  },
  {
    name: 'John Doe',
    meta: ['Texas', 'USA'],
    quote:
      'Professional, responsive, and results-driven—highly recommend Bumi!” The team at Bumi helped me sell my property in record time. Their expertise and guidance were invaluable.',
    year: '2024',
    avatar: images.testimonialsAvatarTexas,
  },
  {
    name: 'John Doe',
    meta: ['Chief Tech Officer', 'Google'],
    quote: excerpt,
    year: '2024',
    avatar: images.testimonialsAvatarCto,
  },
]
