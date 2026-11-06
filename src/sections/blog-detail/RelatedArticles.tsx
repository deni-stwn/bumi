import { Container } from '@/components/layout/Container'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { relatedArticles } from '@/data/articles'

/**
 * "Related Articles" (#000 → Neutral/Black, as MT7): three News cards. Desktop: three 416 px cards
 * in the Blog's 1286 px column (x 134). Tablet (416 px cards) and mobile (300 px, the excerpt as
 * wide as the card) keep the row, which runs past the screen and scrolls sideways (design-notes BD3).
 */
export function RelatedArticles() {
  return (
    <Container as="section" aria-labelledby="related-title" className="py-25 lg:pl-gutter">
      <div className="flex flex-col gap-8 lg:ml-auto lg:max-w-321.5">
        <h2
          id="related-title"
          data-reveal="lines"
          className="font-gloock text-header-xs text-neutral-black"
        >
          Related Articles
        </h2>
        <ul
          data-reveal="stagger"
          className="-mr-gutter scrollbar-none flex snap-x items-start gap-5 overflow-x-auto pr-gutter lg:mr-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pr-0"
        >
          {relatedArticles.map((article) => (
            <li key={article.slug} className="w-75 shrink-0 snap-start md:w-104 lg:w-auto">
              <ArticleCard
                {...article}
                imageClassName="lg:rounded-corner-l"
                imageSizes="(min-width: 768px) 416px, 300px"
                excerptClassName="max-md:w-full max-md:max-w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
