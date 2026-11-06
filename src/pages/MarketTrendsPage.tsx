import { marketIntro } from '@/data/marketTrends'
import { Highlights } from '@/sections/market-trends/Highlights'
import { Insights } from '@/sections/market-trends/Insights'
import { PageIntro, type PageIntroLayout } from '@/sections/shared/PageIntro'

/** 64 px apart, Header/LG on tablet, a 377 px description; desktop row from grid column 2, 139 px apart. */
const introLayout: PageIntroLayout = {
  row: 'gap-16 xl:gap-10 2xl:gap-34.75',
  title: 'md:text-header-lg xl:text-header-xl',
  description: 'w-94.25',
}

/** Market Trends: frames 8405 (1440), 7812 (768) and 11058 (425). */
export default function MarketTrendsPage() {
  return (
    <>
      <title>Market Trends – Bumi</title>
      <meta name="description" content={marketIntro.description} />
      <PageIntro
        title={marketIntro.title}
        description={marketIntro.description}
        layout={introLayout}
      />
      <Highlights />
      <Insights />
    </>
  )
}
