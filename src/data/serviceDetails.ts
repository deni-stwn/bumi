import { images, type ImageAsset } from '@/assets/images'

/**
 * A photo as designed (`image`; black and white ones have the filter baked in) and, for those, the
 * unfiltered colour original shown while it is the active photo (hover, design-notes SV13).
 */
export type ServicePhoto = { image: ImageAsset; color?: ImageAsset; alt: string }

/** Text, three bullet points and three photos ("Section Content" / "Frame" blocks). */
export type ServiceFeature = {
  title: string
  description: string
  features: string[]
  photos: ServicePhoto[]
  /** Photos shown below 1024 px when the tablet and mobile frames use other ones. */
  photosCompact?: ServicePhoto[]
}

/** Three photo cards with a caption, then a title and description. */
export type ServiceHighlight = {
  title: string
  description: string
  cards: { label: string; photo: ServicePhoto }[]
}

export type ServiceDetail = {
  slug: string
  name: string
  metaDescription: string
  hero: { title: string; description: string }
  /** The first block keeps its text centred against the photos, the second spreads it to their edges. */
  features: [ServiceFeature, ServiceFeature]
  highlight: ServiceHighlight
  cta: {
    heading: string
    /** A second sentence only the desktop frame shows (tablet and mobile end after the first). */
    headingDesktop?: string
    label: string
    to: string
  }
}

// Photos that appear on more than one service page (same image and filters in the design).
const patio: ServicePhoto = {
  image: images.managementUpkeepPatio,
  color: images.managementUpkeepPatioColor,
  alt: 'A covered patio with outdoor seating',
}
const facade: ServicePhoto = {
  image: images.managementUpkeepFacade,
  color: images.managementUpkeepFacadeColor,
  alt: 'An apartment block lined with air-conditioning units',
}
const doorway: ServicePhoto = {
  image: images.managementTenantDoorway,
  color: images.managementTenantDoorwayColor,
  alt: 'An older man welcoming someone at his front door',
}
const workers: ServicePhoto = {
  image: images.managementTenantWorkers,
  color: images.managementTenantWorkersColor,
  alt: 'Two contractors in hard hats repairing a timber wall',
}
const bridge: ServicePhoto = {
  image: images.managementFinanceBridge,
  color: images.managementFinanceBridgeColor,
  alt: 'A suspension bridge over a rocky shore',
}
const desk: ServicePhoto = {
  image: images.managementFinanceDesk,
  color: images.managementFinanceDeskColor,
  alt: 'A desk with a laptop, a tablet and a pair of glasses',
}

const upkeep: ServicePhoto[] = [
  {
    image: images.managementUpkeepRenovation,
    alt: 'A house being renovated, with exposed brick and timber framing',
  },
  patio,
  facade,
]

/**
 * Copy as designed, including the stray opening quote of the tenants description (design-notes PM4)
 * and the stray closing quote of the consultation hero (RC2).
 */
export const serviceDetails: Record<string, ServiceDetail> = {
  'property-management': {
    slug: 'property-management',
    name: 'Property Management',
    metaDescription:
      'Let Bumi handle the details of property ownership: maintenance, tenant management and revenue optimization.',
    hero: {
      title: 'Expert Property Management for Stress-Free Ownership',
      description:
        'Let Bumi handle the details while you enjoy the rewards of property ownership. From maintenance to tenant management, we ensure your investments are in safe hands.',
    },
    features: [
      {
        title: 'Keeping Your Property in Prime Condition',
        description:
          'Our dedicated team ensures your property remains in excellent shape, inside and out. From routine maintenance to emergency repairs, we provide proactive solutions that protect your investment and enhance its value.',
        features: [
          'Scheduled property inspections and upkeep',
          'Reliable emergency repair services',
          'Professional vendor and contractor management',
        ],
        photos: upkeep,
      },
      {
        title: 'Maximizing Your Property’s Financial Potential',
        description:
          'Our expertise ensures your property generates the highest returns. With data-driven insights and market strategies, we optimize rental income and reduce vacancies.',
        features: [
          'Competitive pricing strategies',
          'Minimizing vacancy periods',
          'Regular financial reporting and analysis',
        ],
        photos: [
          { image: images.managementFinanceCall, alt: 'A man on a phone call at his laptop' },
          bridge,
          desk,
        ],
        // The tablet and mobile frames repeat the photos of the first block (design-notes PM5).
        photosCompact: upkeep,
      },
    ],
    highlight: {
      title: 'Streamlined Tenant Experiences, Happy Tenants',
      description:
        '"We make tenant management effortless. From tenant screening to addressing concerns, our hands-on approach ensures a positive experience for both you and your tenants, fostering long-term relationships.',
      cards: [
        {
          label: 'Comprehensive tenant screening and onboarding',
          photo: {
            image: images.managementTenantHandshake,
            alt: 'Two people shaking hands outdoors',
          },
        },
        { label: '24/7 support for tenant requests and issues', photo: doorway },
        { label: 'Lease management and renewal assistance', photo: workers },
      ],
    },
    cta: {
      heading: 'Ready to experience worry-free property management?',
      label: 'Get Started',
      to: '/contact',
    },
  },
  'investment-opportunities': {
    slug: 'investment-opportunities',
    name: 'Investment Opportunities',
    metaDescription:
      'Smart real estate investments with Bumi: commercial properties, new development projects and data-driven insights.',
    hero: {
      title: 'Smart Investment Opportunities for Sustainable Growth',
      description:
        'Discover lucrative real estate investments with Bumi. From commercial properties to new developments, our expertise and insights pave the way for your financial success.',
    },
    features: [
      {
        title: 'Unlock the Potential of Commercial Real Estate',
        description:
          "Invest in high-demand commercial properties that deliver steady returns. Whether you're targeting office spaces, retail centers, or mixed-use developments, our team guides you to opportunities that align with your financial goals.",
        features: [
          'Strategic investment advice for commercial properties',
          'Market analysis for high-growth areas',
          'Full support from acquisition to management',
        ],
        photos: [
          {
            image: images.investmentCommercialBuilding,
            alt: 'A modern office building with a glass and stone facade',
          },
          {
            image: images.investmentCommercialTicker,
            color: images.investmentCommercialTickerColor,
            alt: 'Screens full of stock market charts',
          },
          {
            image: images.investmentCommercialAdvisor,
            color: images.investmentCommercialAdvisorColor,
            alt: 'A smiling young man in a suit and tie',
          },
        ],
      },
      {
        title: 'Make Informed Decisions with Confidence',
        description:
          'Leverage the power of data to maximize your investment success. Our advanced analytics provide a deep understanding of market trends, property performance, and potential risks, giving you a competitive edge.',
        features: [
          'Comprehensive market trend reports',
          'Risk assessment and mitigation strategies',
          'Ongoing performance tracking and optimization',
        ],
        photos: [
          {
            image: images.investmentInsightsMeeting,
            alt: 'Colleagues discussing figures around a meeting table with laptops',
          },
          {
            image: images.investmentInsightsExecutive,
            color: images.investmentInsightsExecutiveColor,
            alt: 'A man in a suit buttoning his jacket on a staircase',
          },
          {
            image: images.investmentInsightsChart,
            color: images.investmentInsightsChartColor,
            alt: 'A price chart on a laptop screen',
          },
        ],
      },
    ],
    highlight: {
      title: 'Be Part of Tomorrow’s Landmarks',
      description:
        'Join groundbreaking development projects that shape the future of real estate. From residential communities to mixed-use hubs, we connect you with developments offering exceptional ROI and long-term value.',
      cards: [
        {
          label: 'Exclusive access to pre-market opportunities',
          photo: {
            image: images.investmentDevelopmentTeam,
            alt: 'Four men in shirts and ties reviewing documents at a table',
          },
        },
        {
          label: 'Insights into high-potential development areas',
          photo: {
            image: images.investmentDevelopmentModelHouse,
            color: images.investmentDevelopmentModelHouseColor,
            alt: 'A small model house resting on an open hand',
          },
        },
        {
          label: 'Collaboration with leading developers',
          photo: {
            image: images.investmentDevelopmentMeeting,
            color: images.investmentDevelopmentMeetingColor,
            alt: 'A team meeting around a table with laptops',
          },
        },
      ],
    },
    cta: {
      heading: 'Ready to elevate your portfolio?',
      label: 'Explore Investment Options',
      to: '/properties',
    },
  },
  'real-estate-consultation': {
    slug: 'real-estate-consultation',
    name: 'Real Estate Consultation',
    metaDescription:
      'Expert real estate guidance from Bumi: market analysis, personalized property options and support from start to finish.',
    hero: {
      title: 'Expert Guidance for Every Real Estate Journey',
      description:
        'At Bumi, we turn complex real estate decisions into simple, confident choices. Whether buying, selling, or investing, our tailored consultation services empower you every step of the way."',
    },
    features: [
      {
        title: 'Understand the Market Like a Pro',
        description:
          'Our in-depth market analysis equips you with the knowledge you need to make informed decisions. With a focus on trends, valuations, and opportunities, we help you navigate the ever-changing real estate landscape.',
        features: [
          'Comprehensive market trend analysis',
          'Property valuation insights',
          'Local market expertise for targeted strategies',
        ],
        photos: [
          {
            image: images.consultationMarketTicker,
            alt: 'A trading app showing index and gold prices with a falling chart',
          },
          patio,
          facade,
        ],
      },
      {
        title: 'Your Trusted Partner from Start to Finish',
        description:
          'Let us simplify the buying or selling process for you. From paperwork to negotiations, we handle the details so you can focus on achieving your real estate dreams.',
        features: [
          'Step-by-step support for buying and selling',
          'Negotiation expertise to secure the best deals',
          'Guidance through legal and financial procedures',
        ],
        photos: [
          {
            image: images.consultationPartnerMeeting,
            alt: 'Three colleagues in discussion around a meeting table with laptops',
          },
          bridge,
          desk,
        ],
      },
    ],
    highlight: {
      title: 'Personalized Options, Perfect Properties',
      description:
        "We match you with properties that meet your unique needs and goals. From family homes to lucrative investments, our tailored recommendations ensure you find exactly what you're looking for",
      cards: [
        {
          label: 'Customized property suggestions',
          photo: {
            image: images.consultationOptionsLivingRoom,
            alt: 'A living room with a yellow armchair, a brass floor lamp and framed art',
          },
        },
        { label: 'Access to exclusive listings', photo: doorway },
        { label: 'Expert advice tailored to your goals', photo: workers },
      ],
    },
    cta: {
      heading: 'Ready to make your next real estate move with confidence?',
      headingDesktop: 'Reach out to Bumi and let us guide you to success.',
      label: 'Get Expert Advice Today',
      to: '/contact',
    },
  },
}
