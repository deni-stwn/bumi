import { useRef, useState } from 'react'
import { ArticleCard, type ArticleCardData } from '@/components/ui/ArticleCard'
import { Pagination } from '@/components/ui/Pagination'
import { latestArticles } from '@/data/articles'

const PAGES = 3

/** Pages 2 and 3 are placeholders: the same articles in another order (design-notes BL4). */
function pageArticles(page: number): ArticleCardData[] {
  if (page === 1) return latestArticles
  const shift = (page - 1) * 3
  const rest = latestArticles.slice(2)
  const rotated = [...rest.slice(shift % rest.length), ...rest.slice(0, shift % rest.length)]
  return [...latestArticles.slice(0, 2), ...rotated]
}

const matches = (a: ArticleCardData, q: string) =>
  `${a.title} ${a.excerpt ?? ''}`.toLowerCase().includes(q.toLowerCase())

/** Card image: 16 px radius on desktop only, square on tablet and mobile (as drawn). */
const image = 'lg:rounded-corner-l'

type LatestArticlesProps = { query: string }

/**
 * "Latest Article": a wide first row (an 850 px card and a 416 px one, no excerpts), then rows of
 * three 416 px cards; rows are 48 px apart, cards 20 px. Tablet and mobile stack every card, so the
 * gaps alternate 20 / 48 px as in the frames. A search from the hero lists its matches instead.
 */
export function LatestArticles({ query }: LatestArticlesProps) {
  const [page, setPage] = useState(1)
  const top = useRef<HTMLElement>(null)
  const goTo = (p: number) => {
    setPage(p)
    top.current?.scrollIntoView({ block: 'start' })
  }
  const results = query ? latestArticles.filter((a) => matches(a, query)) : null
  const articles = results ?? pageArticles(page)
  const [first, second, ...others] = articles
  const rows = results ? [] : [others.slice(0, 3), others.slice(3, 6)]

  return (
    <section
      ref={top}
      id="latest-articles"
      aria-labelledby="latest-title"
      className="flex scroll-mt-10 flex-col gap-25"
    >
      <div className="flex flex-col gap-8">
        <h2
          id="latest-title"
          data-reveal="lines"
          className="font-gloock text-header-xs text-gray-950"
        >
          Latest Article
        </h2>
        {results ? (
          <div aria-live="polite">
            {results.length ? (
              <ul className="grid gap-5 lg:grid-cols-3">
                {results.map((a) => (
                  <li key={a.slug}>
                    <ArticleCard {...a} imageClassName={image} />
                  </li>
                ))}
              </ul>
            ) : (
              // Not designed (G10): Body/XS Gray/400 like the card text.
              <p data-design-contrast className="text-body-xs-regular text-gray-400">
                No articles match “{query}”.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 lg:flex-row">
              <ArticleCard
                {...first}
                imageClassName={image}
                imageSizes="(min-width: 1440px) 850px, (min-width: 1024px) 60vw, 100vw"
                // The title box stays 415 px at every width (wider than the mobile card).
                titleClassName="w-103.75 max-w-[calc(100vw-1.25rem)]"
                className="lg:min-w-0 lg:flex-1"
              />
              <ArticleCard
                {...second}
                imageClassName={image}
                imageSizes="(min-width: 1024px) 416px, 100vw"
                className="lg:w-104 lg:shrink-0"
              />
            </div>
            {rows.map((row, i) => (
              <ul key={i} className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                {row.map((a) => (
                  <li key={a.slug} className="flex">
                    <ArticleCard
                      {...a}
                      imageClassName={image}
                      imageSizes="(min-width: 1024px) 416px, 100vw"
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
      {results ? null : (
        <Pagination
          page={page}
          pages={PAGES}
          onChange={goTo}
          label="Article pages"
          className="h-14"
        />
      )}
    </section>
  )
}
