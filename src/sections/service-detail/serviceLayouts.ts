/**
 * Per-page layout of the service template. The three service frames share one structure but differ
 * in a few positions and sizes, reproduced as drawn (design-notes PM1–PM12, IO1–IO8, RC1–RC8).
 * Content lives in src/data/serviceDetails.ts; this file only holds the classes that differ.
 */

/** One photo card of the highlight block, by position (the first is the wide, active one). */
export type HighlightCardLayout = {
  /** Card size below desktop (desktop widths are the component's: the active card fills the row). */
  card: string
  /** Photo box inside the card: offset and size (some photos overhang their card). */
  photo: string
  /** Caption offset from the bottom-left corner, maximum width and type style. */
  caption: string
  sizes: string
}

/** Widths of one photo-and-text block below desktop (it fills the column by default). */
export type FeatureLayout = {
  /** Title and description. */
  text?: string
  /** Photo row. */
  gallery?: string
}

export type ServiceLayout = {
  hero: {
    /** Tablet inset. */
    section: string
    /** Title–description gap below desktop; desktop block width and alignment. */
    block: string
    description: string
  }
  /** Type style of the first, dark list item in both photo-and-text blocks. */
  featureLead: string
  features: [FeatureLayout, FeatureLayout]
  highlight: {
    /** Title–description row: gap below desktop. */
    text: string
    title: string
    description: string
    list: string
    cards: [HighlightCardLayout, HighlightCardLayout, HighlightCardLayout]
  }
  faq: {
    /** The whole section (hidden where a frame has no FAQ). */
    section: string
    /** Gap between the title and the list below desktop. */
    content: string
  }
  cta: {
    section: string
    heading?: string
  }
  /**
   * A loose line at a fixed page position, drawn on top of whatever is there (design-notes RC6):
   * `box` sets the offset from the top of the main content, `line` the left offset.
   */
  rule?: { box: string; line: string }
}

const wideSizes = '(min-width: 1024px) 809px, (min-width: 768px) 664px, 640px'
const narrowSizes = '(min-width: 1024px) 280px, (min-width: 768px) 664px, 400px'

/** 200 px padding at every width, 83 px at the sides from tablet. */
const ctaSection = 'py-50 md:px-20.75'

export const serviceLayouts: Record<string, ServiceLayout> = {
  'property-management': {
    hero: {
      section: 'md:pl-20.5',
      block: 'xl:mx-auto xl:max-w-289.5',
      description: 'w-72.5',
    },
    featureLead: 'first:text-body-xs-bold',
    features: [{}, {}],
    highlight: {
      text: '',
      title: 'w-105 max-w-full',
      description: '',
      // Mobile cards are centred in a fixed 1282 px column (19.5 px above and below).
      list: 'h-320.5 justify-center md:h-auto',
      cards: [
        {
          card: 'h-102.75 md:h-103.5',
          photo: '-top-0.75 right-0 h-103.5 md:top-0',
          caption:
            'right-5 bottom-7.75 left-5 max-w-70 font-gloock text-header-xxs md:right-8 md:bottom-8 md:left-8 md:max-w-120.75 md:text-header-xs',
          sizes: wideSizes,
        },
        {
          card: 'h-99 md:h-103.5',
          photo: '-top-4.5 right-0 h-103.5 md:top-0',
          caption:
            'right-5 bottom-5 left-5 max-w-45.5 text-body-xs-semibold md:bottom-4.5 md:max-w-42.75',
          sizes: narrowSizes,
        },
        {
          card: 'h-99 md:h-103.5 md:max-lg:overflow-visible',
          photo: '-top-4.5 -right-0.5 h-103.5 md:top-0 md:max-lg:-right-0.75 lg:right-0',
          caption:
            'right-3 bottom-4.5 left-3 max-w-44.5 text-body-xs-semibold md:right-5 md:left-5 md:max-w-43.25',
          sizes: narrowSizes,
        },
      ],
    },
    faq: { section: '', content: 'gap-16' },
    cta: { section: ctaSection },
  },
  'investment-opportunities': {
    hero: {
      section: 'md:pl-21',
      block: 'xl:ml-auto xl:max-w-311.25',
      description: 'w-94.25',
    },
    featureLead: 'first:text-body-xs-bold',
    features: [{}, {}],
    highlight: {
      text: '',
      title: 'lg:w-105',
      // Alexandria Light 14 / 190 %, a text layer without a text style (design-notes IO4).
      description: 'font-alexandria font-light',
      list: '',
      cards: [
        {
          // 437 px tall below desktop with a 443 px photo 6 px above it (visible on tablet).
          card: 'h-109.25 md:max-lg:overflow-visible lg:h-103.5',
          photo: '-top-1.5 right-0 h-110.75 lg:top-0 lg:h-103.5',
          caption:
            'right-5 bottom-7.75 left-5 max-w-82.5 font-gloock text-header-xxs md:right-6.25 md:bottom-6.5 md:left-6.25 md:max-w-98.5 md:text-header-xs lg:right-8 lg:bottom-8.25 lg:left-8 lg:max-w-94.25',
          sizes: wideSizes,
        },
        {
          card: 'h-103.5',
          photo: 'top-0 right-0 h-103.5',
          caption:
            'right-5 bottom-5 left-5 max-w-54.5 text-body-xs-semibold md:bottom-4 md:max-w-42.75',
          sizes: narrowSizes,
        },
        {
          card: 'h-103.5 md:max-lg:overflow-visible',
          photo: 'top-0 -right-0.5 h-103.5 md:max-lg:-right-0.75 lg:right-0',
          caption:
            'right-5 bottom-5 left-5 max-w-43.25 text-body-xs-semibold md:bottom-4.5 md:max-w-43.25',
          sizes: narrowSizes,
        },
      ],
    },
    faq: { section: '', content: 'gap-38.25' },
    cta: { section: ctaSection },
  },
  'real-estate-consultation': {
    hero: {
      section: 'md:pl-21',
      // 108 px between title and description in every frame.
      block: 'gap-27 xl:ml-auto xl:max-w-311.25',
      description: 'w-94.25',
    },
    featureLead: 'first:text-body-xs-semibold',
    // The first block is 582 px wide on tablet, its photos 572 (design-notes RC3).
    features: [{ text: 'md:max-lg:w-145.5', gallery: 'md:max-lg:w-143' }, {}],
    highlight: {
      text: 'gap-6 lg:gap-16',
      title: 'w-105 max-w-full',
      description: '',
      list: '',
      // Mobile photos are 3–5 px wider than their card and cropped by it; on tablet the first photo
      // stops 4 px short and the second card is 661 px wide (design-notes RC4).
      cards: [
        {
          card: 'h-103.5',
          photo: 'top-0 -right-0.75 h-103.5 md:right-1 lg:right-0',
          caption:
            'right-4.5 bottom-7.75 left-5 font-gloock text-header-xxs md:right-8 md:bottom-8 md:left-8 md:max-w-89 md:text-header-xs',
          sizes: wideSizes,
        },
        {
          card: 'h-103.5 md:max-lg:w-165.25',
          photo: 'top-0 -right-1 h-103.5 md:right-0',
          caption:
            'right-5 bottom-5 left-5 text-body-xs-semibold md:bottom-12.25 md:left-15.25 md:max-w-130.75 lg:bottom-5.5 lg:left-5 lg:max-w-42.75',
          sizes: narrowSizes,
        },
        {
          card: 'h-103.5',
          photo: 'top-0 -right-1.25 h-103.5 md:right-0',
          caption:
            'right-5 bottom-5 left-5 text-body-xs-semibold md:bottom-12.25 md:left-15.25 md:max-w-132.5 lg:bottom-5.5 lg:left-5 lg:max-w-43.25',
          sizes: narrowSizes,
        },
      ],
    },
    // Only the desktop frame has the FAQ (design-notes RC1).
    faq: { section: 'max-lg:hidden', content: '' },
    cta: {
      // Desktop: a fixed 774 px frame with the heading centred in it, 84 / 83 px from the sides.
      section:
        'py-50 lg:flex lg:h-193.5 lg:flex-col lg:justify-center lg:py-0 lg:pr-20.75 lg:pl-21',
      // Tablet: a 711 px heading box, wider than the frame's padding allows (design-notes RC5).
      heading: 'md:max-lg:mx-auto md:max-lg:w-177.75 lg:text-display',
    },
    // Page y 3636 in every frame, from x 53 / 82 / 138, 1282 px long (navbar 82 / 86 px).
    rule: { box: 'top-888.5 lg:top-887.5', line: 'ml-13.25 md:ml-20.5 lg:ml-34.5' },
  },
}
