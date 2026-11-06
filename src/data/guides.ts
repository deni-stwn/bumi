/** A run of text, or a link drawn exactly like the text around it (design-notes BG2). */
export type GuideInline = string | { text: string; to: string }
/** A paragraph or list item: plain text, or runs when it contains a link. */
export type GuideText = string | GuideInline[]

/** One "Section" row: title on the left, one text box on the right (paragraphs, bullets, a note). */
export type GuideTopic = {
  title: string
  /** Paragraphs before the bullets. */
  lead: GuideText[]
  bullets?: GuideText[]
  /** The line after the bullets ("Pro Tip: …"). */
  note?: GuideText
}

export type Guide = {
  slug: string
  name: string
  metaDescription: string
  title: string
  description: string
  topics: GuideTopic[]
}

/** Buyer Guide frames 7047 / 7686 / 10598, copy as designed (straight and curly apostrophes as drawn). */
const buyerGuide: Guide = {
  slug: 'buyer-guide',
  name: 'Buyer’s Guide',
  metaDescription:
    'Your ultimate property buying guide: understanding your needs, budget planning, exploring the market, working with professionals and closing the deal.',
  title: 'Your Ultimate Property Buying Guide',
  description:
    'Navigate the property market with confidence. Our comprehensive guide is here to help you every step of the way.',
  topics: [
    {
      title: 'Introduction',
      lead: [
        'Buying a property is a significant investment, and we’re here to make the process easier for you. From understanding market trends to securing financing, our guide covers everything you need to know to find your dream home or the perfect investment property.',
      ],
    },
    {
      title: 'Understanding Your Needs',
      lead: [
        'Define your goals and priorities. Are you looking for a family home, an investment property, or a vacation getaway? Knowing what you need helps narrow down your options.',
        'Before you dive into the property market, start by defining your needs:',
      ],
      bullets: [
        'Are you looking for a long-term home, a rental property, or a seasonal retreat?',
        'What features are non-negotiable for you, such as location, size, or amenities?',
        'How will your lifestyle or future plans influence your choice?',
      ],
    },
    {
      title: 'Budget Planning',
      lead: [
        'Learn how to set a realistic budget, calculate your mortgage affordability, and factor in additional costs like taxes, maintenance, and insurance.',
        "Knowing your financial capacity is critical. Here's how you can prepare:",
      ],
      bullets: [
        [
          'Calculate your affordability: Determine how much you can borrow using our ',
          { text: 'Mortgage Calculator', to: '/resources/mortgage-calculator' },
          '.',
        ],
        'Factor in hidden costs: Include taxes, maintenance fees, and insurance.',
        'Get pre-approved for a loan: Pre-approval helps you set a clear budget and strengthens your offers.',
      ],
      note: 'Pro Tip: Work with a trusted mortgage advisor to explore financing options tailored to your needs.',
    },
    {
      title: 'Exploring the Market',
      lead: [
        'Get tips on researching neighborhoods, comparing property types, and evaluating market trends to make informed decisions.',
        'The property market is dynamic, and knowledge is power. Here’s how to start:',
      ],
      bullets: [
        'Compare property values across neighborhoods.',
        'Analyze market trends to identify the best time to buy.',
        'Visit open houses and virtual tours to get a feel for the options available.',
      ],
      note: [
        'Resource Highlight: Check out our ',
        { text: 'Market Trends', to: '/resources/market-trends' },
        ' page for up-to-date data and insights.',
      ],
    },
    {
      title: 'Working with Professionals',
      lead: [
        'Discover the benefits of partnering with real estate agents, mortgage brokers, and legal advisors who can streamline the buying process.',
        'A skilled team can make all the difference. Consider these professionals:',
      ],
      bullets: [
        'Real Estate Agent: Find someone with in-depth knowledge of the local market.',
        'Mortgage Broker: Get help finding the best loan terms.',
        'Legal Advisor: Ensure all your contracts are legally sound.',
      ],
      note: 'Tip: Always check reviews and references before selecting professionals.',
    },
    {
      title: 'Closing the Deal',
      lead: [
        'Understand the steps involved in making an offer, negotiating terms, and completing the paperwork to finalize your purchase.',
        'Once you’ve found the right property, it’s time to move forward:',
      ],
      bullets: [
        'Making an Offer: Understand how to negotiate and set terms.',
        'Home Inspection: Ensure the property is in good condition before proceeding.',
        'Final Paperwork: Work with your legal advisor to complete and sign documents.',
      ],
      note: 'Reminder: Don’t hesitate to ask questions or request clarifications during this stage.',
    },
  ],
}

/**
 * Selling Guide frames 8321 / 7749 / 10995: only the title differs; the description and every topic
 * repeat the Buyer Guide copy as designed ("Buying a property…", design-notes SG1).
 */
const sellingGuide: Guide = {
  ...buyerGuide,
  slug: 'selling-guide',
  name: 'Selling Guide',
  metaDescription:
    'Your ultimate property selling guide: navigate the property market with confidence, every step of the way.',
  title: 'Your Ultimate Property Selling Guide',
}

export const guides: Record<string, Guide> = {
  [buyerGuide.slug]: buyerGuide,
  [sellingGuide.slug]: sellingGuide,
}
