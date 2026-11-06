import { useId, useState } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { homeFilters, properties } from '@/data/properties'

type Filter = (typeof homeFilters)[number]['value']

/**
 * "Explore our handpicked collection…": heading with the category filter (beside it from xl, where
 * both fit; below it on tablet, mobile and lg), the property grid and "Learn More". Rules: inside the section on
 * desktop (100 px after the button), after it from x 0 to 666 on tablet, inset on mobile.
 */
export function Properties() {
  const [filter, setFilter] = useState<Filter>('all')
  const panelId = useId()
  const titleId = useId()
  // Six cards as designed: the first six listings, or the first six of the chosen category.
  const shown = (
    filter === 'all' ? properties : properties.filter((p) => p.category === filter)
  ).slice(0, 6)

  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col py-25">
        <div className="flex flex-col gap-20 xl:flex-row xl:items-end xl:justify-between">
          <h2
            id={titleId}
            data-reveal="lines"
            className="max-w-138 font-gloock text-header-xs text-gray-950 md:text-header-sm"
          >
            Explore our handpicked collection of properties tailored just for you.
          </h2>
          <FilterTabs
            label="Property category"
            options={homeFilters}
            value={filter}
            onChange={setFilter}
            panelId={panelId}
            className="-mr-gutter scrollbar-none overflow-x-auto overflow-y-hidden pr-gutter md:mr-0 md:pr-0"
          />
        </div>

        <div
          id={panelId}
          role="tabpanel"
          data-reveal="stagger"
          className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-5 md:max-lg:-mr-0.5 lg:gap-y-18 xl:mt-25"
        >
          {shown.map((p) => (
            <PropertyCard key={p.slug} {...p} imageClassName="md:max-lg:rounded-corner-m" />
          ))}
        </div>

        <ButtonLink
          to="/properties"
          variant="ghost"
          size="md"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="mt-20 self-start max-md:w-full max-md:justify-start lg:mt-25 lg:h-18 lg:gap-2 lg:p-6"
        >
          Learn More
        </ButtonLink>

        <hr className="mt-25 hidden border-gray-300 lg:block" />
      </Container>
      <hr className="mx-gutter border-gray-300 md:mx-0 md:w-166.5 lg:hidden" />
    </section>
  )
}
