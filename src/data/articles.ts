import { images, type ImageAsset } from '@/assets/images'
import type { ArticleCardData } from '@/components/ui/ArticleCard'

/** Blog frames 4351 / 4041 / 4901, copy as designed (placeholder articles). */

const readTime = '20 Minutes Read'
const excerpt =
  'Dive into the world of real estate, where opportunities abound and dreams of homeownership come to life. Our platform is your gateway to discovering properties that match your aspirations and lifestyle.'

/** "Popular Article": title and read time only. */
export const popularArticles: ArticleCardData[] = [
  {
    slug: 'essential-insights-real-estate-adventure',
    title: 'Essential Insights for Your Real Estate Adventure',
    readTime,
  },
  {
    slug: 'key-strategies-real-estate-journey',
    title: 'Key Strategies for Your Real Estate Journey',
    readTime,
  },
  {
    slug: 'ultimate-guide-navigating-real-estate',
    title: 'Ultimate Guide to Navigating Real Estate',
    readTime,
  },
  { slug: 'top-tips-real-estate-path', title: 'Top Tips for Your Real Estate Path', readTime },
]

/** "Latest Article": the first two without an excerpt (the wide first row), then six with one. */
export const latestArticles: ArticleCardData[] = [
  {
    slug: 'navigating-the-real-estate-market',
    title: 'Navigating the Real Estate Market: Key Strategies for Success',
    readTime,
    image: images.articlesChessPieces,
    alt: 'Chess pieces on a board, one knight knocked over',
  },
  {
    slug: 'unlocking-the-secrets-of-real-estate',
    title: 'Unlocking the Secrets of Real Estate: A Guide for Homebuyers',
    readTime,
    image: images.articlesWhiteGables,
    alt: 'White house gables with dark roofs against a turquoise sky',
  },
  {
    slug: 'ultimate-guide-first-time-buyers',
    title: 'Your Ultimate Guide to Real Estate: Tips for First-Time Buyers',
    excerpt,
    readTime,
    image: images.articlesLetterTiles,
    alt: 'Letter tiles spelling “Real Estate” on a wooden table',
  },
  {
    slug: 'real-estate-101-savvy-investors',
    title: 'Real Estate 101: Essential Tips for Savvy Investors',
    excerpt,
    readTime,
    image: images.articlesCityAerial,
    alt: 'Aerial view of a dense city of low-rise buildings',
  },
  {
    slug: 'mastering-the-art-of-real-estate',
    title: 'Mastering the Art of Real Estate: Insights for Every Buyer',
    excerpt,
    readTime,
    image: images.articlesTeamMeeting,
    alt: 'Four men in suits reviewing papers at a table',
  },
  {
    slug: 'building-wealth-through-real-estate',
    title: 'Building Wealth Through Real Estate: A Comprehensive Guide',
    excerpt,
    readTime,
    image: images.articlesBanknotes,
    alt: 'A pile of banknotes',
  },
  {
    slug: 'real-estate-revealed-insider-tips',
    title: 'Real Estate Revealed: Insider Tips for a Successful Purchase',
    excerpt,
    readTime,
    image: images.articlesHarbourNight,
    alt: 'A harbour full of yachts below a lit hillside town at night',
  },
  {
    slug: 'real-estate-playbook',
    title: 'The Real Estate Playbook: Strategies for Finding Your Dream',
    excerpt,
    readTime,
    image: images.articlesBookOnBed,
    alt: 'An open book and a cup of tea on rumpled bed sheets',
  },
]

export const allArticles = [...popularArticles, ...latestArticles]

/**
 * Blog Detail frames 4579 / 4250 / 5410: one designed post (placeholder copy). The second and third
 * paragraphs open with 14 spaces, which the frames render as an indent.
 */
const lorem = [
  'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
  '              Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.',
  '              Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.',
]

export type PostSection = { id: string; title: string; paragraphs: string[] }

export type BlogPost = {
  slug: string
  title: string
  date: string
  dateTime: string
  image: ImageAsset
  alt: string
  sections: PostSection[]
  /** Shown between the first and second section. */
  figure: { image: ImageAsset; alt: string }
}

export const featuredPost: BlogPost = {
  slug: 'unlocking-real-estate',
  title: 'Unlocking Real Estate: Your Guide to Market Trends and Smart Investment Strategies',
  date: '12 August 2024',
  dateTime: '2024-08-12',
  image: images.articlesMarketDashboard,
  alt: 'A screen of marketing dashboards: CTR 14.65 %, quality score 9.38',
  sections: [
    { id: 'first-title', title: 'First Title', paragraphs: lorem },
    { id: 'second-title', title: 'Second Title', paragraphs: lorem },
    { id: 'third-title', title: 'Third Title', paragraphs: lorem },
  ],
  figure: { image: images.articlesGoldBars, alt: 'Stamped gold bars on a dark surface' },
}

/**
 * The post for a slug: the designed one, or any listed article shown with its own title over the
 * designed placeholder body (design-notes BD1). Undefined for unknown slugs.
 */
export function findPost(slug: string): BlogPost | undefined {
  if (slug === featuredPost.slug) return featuredPost
  const article = allArticles.find((a) => a.slug === slug)
  return article ? { ...featuredPost, slug, title: article.title } : undefined
}

/** "Related Articles": three latest articles, all drawn with the same photo (placeholder). */
export const relatedArticles: ArticleCardData[] = latestArticles.slice(2, 5).map((a) => ({
  ...a,
  image: images.articlesLaptopSofa,
  alt: 'A woman typing on a laptop on a leather sofa',
}))
