import { useId, useState } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { DotIcon } from '@/components/icons/DotIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { PropertyCard } from '@/components/ui/PropertyCard'
import {
  categoryTabs,
  homeFilters,
  relatedProperties,
  type PropertyCategory,
} from '@/data/properties'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Filter = (typeof homeFilters)[number]['value']

/**
 * More properties. From xl: rules (#D9D9D9 → Gray/200) above and below, large category tabs, radius 16
 * and "View More Properties ●" (the orphan "Filled=no-fill" button). Below xl: "/ All / …", square
 * photos, "Learn More"; cards come in pairs (20 px apart, pairs 32 px apart).
 */
export function Related() {
  const wide = useMediaQuery('(min-width: 1280px)')
  const [category, setCategory] = useState<PropertyCategory>('residential')
  const [filter, setFilter] = useState<Filter>('all')
  const panelId = useId()
  const titleId = useId()
  const active = wide ? category : filter
  const shown = (
    active === 'all' ? relatedProperties : relatedProperties.filter((p) => p.category === active)
  ).slice(0, 6)
  const rows = Array.from({ length: Math.ceil(shown.length / 2) }, (_, i) =>
    shown.slice(i * 2, i * 2 + 2),
  )

  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col py-25 md:pl-20.5 lg:pl-col-2 xl:py-50">
        <h2 id={titleId} className="sr-only">
          More properties
        </h2>
        <hr className="mb-25 hidden border-gray-200 xl:block" />
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
        <div id={panelId} role="tabpanel" className="mt-8 flex flex-col gap-8 xl:mt-12 xl:gap-18">
          {rows.map((row) => (
            <div
              key={row[0].slug}
              data-reveal="stagger"
              className="flex flex-col gap-5 md:flex-row"
            >
              {row.map((p) => (
                <PropertyCard
                  key={p.slug}
                  {...p}
                  className="md:flex-1"
                  imageClassName="xl:rounded-corner-l"
                />
              ))}
            </div>
          ))}
        </div>
        <ButtonLink
          to="/properties"
          variant="ghost"
          size="md"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="mt-20 self-start max-md:w-full max-md:justify-start xl:hidden"
        >
          Learn More
        </ButtonLink>
        <ButtonLink
          to="/properties"
          variant="ghost"
          size="md"
          iconRight={<DotIcon />}
          data-reveal="up"
          className="mt-25 hidden self-start text-body-xs-regular xl:inline-flex"
        >
          View More Properties
        </ButtonLink>
        <hr className="mt-25 hidden border-gray-200 xl:block" />
      </Container>
    </section>
  )
}
