import { useId, useState } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { categoryTabs, homeFilters, properties, type PropertyCategory } from '@/data/properties'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Filter = (typeof homeFilters)[number]['value']

/**
 * Listings. From xl: large category tabs (default Residential), 2 columns 72 px apart, radius 16 and
 * "View more residential". Below: the "/ All / …" filter (default All), radius 8 and "Learn More",
 * like the tablet and mobile frames. Each tab row keeps its own selection, as each frame shows its own default.
 */
type ListingsProps = {
  /** A category to open on (the navbar's Residential / Commercial / Vacation links, `?type=`). */
  initialType?: string | null
}

export function Listings({ initialType }: ListingsProps) {
  const wide = useMediaQuery('(min-width: 1280px)')
  const start = categoryTabs.find((c) => c.value === initialType)?.value
  const [category, setCategory] = useState<PropertyCategory>(start ?? 'residential')
  const [filter, setFilter] = useState<Filter>(start ?? 'all')
  const panelId = useId()
  const titleId = useId()
  const active = wide ? category : filter
  const shown = (
    active === 'all' ? properties : properties.filter((p) => p.category === active)
  ).slice(0, 6)
  const categoryLabel = categoryTabs.find((c) => c.value === category)?.label.toLowerCase()

  return (
    <section id="listings" aria-labelledby={titleId}>
      <Container className="flex flex-col py-25 md:pl-20.5 lg:pl-col-2 xl:py-50">
        {/* The design shows no heading here; one is needed for the outline (h1 → h2 → card h3). */}
        <h2 id={titleId} className="sr-only">
          Property listings
        </h2>
        <FilterTabs
          label="Property category"
          options={homeFilters}
          value={filter}
          onChange={setFilter}
          panelId={panelId}
          className="-mr-gutter scrollbar-none overflow-x-auto overflow-y-hidden pr-gutter md:mr-0 md:pr-0 xl:hidden"
        />
        <FilterTabs
          label="Property category"
          variant="display"
          options={categoryTabs}
          value={category}
          onChange={setCategory}
          panelId={panelId}
          className="hidden xl:flex"
        />

        <div
          id={panelId}
          role="tabpanel"
          data-reveal="stagger"
          className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-5 xl:mt-12 xl:gap-y-18"
        >
          {shown.map((p) => (
            <PropertyCard
              key={p.slug}
              {...p}
              imageClassName="rounded-corner-m xl:rounded-corner-l"
            />
          ))}
        </div>

        <ButtonLink
          to="/properties/search"
          variant="ghost"
          size="md"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="mt-20 self-start max-md:w-full max-md:justify-start xl:hidden"
        >
          Learn More
        </ButtonLink>
        <ButtonLink
          to={`/properties/search?type=${category}`}
          variant="ghost"
          size="lg"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="mt-25 hidden self-start xl:inline-flex"
        >
          View more {categoryLabel}
        </ButtonLink>
        <hr className="mt-25 hidden border-gray-300 xl:block" />
      </Container>
    </section>
  )
}
