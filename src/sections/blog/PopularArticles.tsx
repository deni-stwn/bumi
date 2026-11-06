import { ArticleCard } from '@/components/ui/ArticleCard'
import { CarouselControls } from '@/components/ui/CarouselControls'
import { popularArticles } from '@/data/articles'
import { useCarousel } from '@/lib/useCarousel'

/**
 * "Popular Article": compact cards (130 px, Gray/100 side rules). Desktop is a carousel of 355 px
 * cards running past the right edge, with small prev/next buttons; tablet a 2 × 2 grid with 48 px
 * between rows; mobile one column, 32 px apart. The buttons sit outside the tablet and mobile
 * frames (1282 px header), so they show from 1024 px.
 */
export function PopularArticles() {
  const { track, prev, next } = useCarousel<HTMLUListElement>(popularArticles.length)
  return (
    <section
      aria-labelledby="popular-title"
      aria-roledescription="carousel"
      className="flex flex-col gap-8"
    >
      <div className="flex h-14 items-center justify-between lg:pr-1">
        <h2
          id="popular-title"
          data-reveal="lines"
          className="font-gloock text-header-xs text-gray-950"
        >
          Popular Article
        </h2>
        <CarouselControls
          label="article"
          size="sm"
          onPrev={prev}
          onNext={next}
          className="hidden lg:flex"
        />
      </div>
      <ul
        ref={track}
        data-reveal="stagger"
        className="grid gap-y-8 md:grid-cols-2 md:gap-y-12 lg:-mr-gutter lg:scrollbar-none lg:flex lg:snap-x lg:overflow-x-auto"
      >
        {popularArticles.map((article) => (
          <li key={article.slug} className="lg:w-88.75 lg:shrink-0 lg:snap-start">
            <ArticleCard variant="compact" {...article} />
          </li>
        ))}
      </ul>
    </section>
  )
}
