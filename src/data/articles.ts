import { images } from '@/assets/images'
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
