import { useId, useRef, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Pagination } from '@/components/ui/Pagination'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { homeFilters, properties } from '@/data/properties'
import { ResultsSearch } from './ResultsSearch'

type Filter = (typeof homeFilters)[number]['value']
const perPage = 6

/**
 * "Result for ‘ City ’", the search, the "/ All / …" filter (mobile only, as designed), six cards per
 * page and pagination; desktop closes with a Gray/200 rule. Results are placeholder listings.
 */
export function Results({ params }: { params: URLSearchParams }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const panelId = useId()
  const resultsId = useId()
  const top = useRef<HTMLDivElement>(null)
  const city = params.get('city') ?? 'Alabama'
  const matches = filter === 'all' ? properties : properties.filter((p) => p.category === filter)
  const pages = Math.max(1, Math.ceil(matches.length / perPage))
  const shown = matches.slice((page - 1) * perPage, page * perPage)

  const goTo = (n: number) => {
    setPage(n)
    top.current?.scrollIntoView({ block: 'start' })
  }

  return (
    <Container className="flex flex-col py-25 md:pl-20.5 lg:pl-col-2 xl:pb-0">
      <div className="flex flex-col gap-25">
        {/* Quotes and spaces as designed (design-notes G7). */}
        <h1
          data-reveal="lines"
          className="font-gloock text-header-xs text-gray-950 md:text-header-sm xl:text-header-md"
        >
          Result for ‘ {city} ’
        </h1>
        <ResultsSearch params={params} />
      </div>

      <div ref={top} className="scroll-mt-25 pt-25">
        <h2 id={resultsId} className="sr-only">
          Search results
        </h2>
        <FilterTabs
          label="Property category"
          options={homeFilters}
          value={filter}
          onChange={(v) => {
            setFilter(v)
            setPage(1)
          }}
          panelId={panelId}
          className="-mr-gutter mb-8 scrollbar-none overflow-x-auto pr-gutter md:hidden"
        />
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={resultsId}
          data-reveal="stagger"
          className="grid gap-8 md:grid-cols-2 md:gap-x-5 xl:gap-y-18"
        >
          {shown.map((p) => (
            <PropertyCard key={p.slug} {...p} imageClassName="xl:rounded-corner-l" />
          ))}
        </div>
      </div>

      <Pagination page={page} pages={pages} onChange={goTo} className="mt-25 xl:h-14" />
      <hr className="mt-25 hidden border-gray-200 xl:block" />
    </Container>
  )
}
