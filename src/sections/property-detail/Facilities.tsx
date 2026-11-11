import { useId } from 'react'
import { DotIcon } from '@/components/icons/DotIcon'
import { facilityColumns, type Facility } from '@/data/propertyDetail'
import { cn } from '@/lib/cn'

function Item({ facility }: { facility: Facility }) {
  return (
    <li className="flex flex-col gap-4">
      <h3 className="flex items-center gap-4 text-body-sm-semibold text-gray-950">
        <DotIcon />
        {/* A span, so the cap-height trim applies (bare text in a flex row keeps its full line height). */}
        <span>{facility.name}</span>
      </h3>
      <ul data-design-contrast className="flex flex-col gap-4 text-body-xs-regular text-gray-400">
        {facility.places.map((p) => (
          <li
            key={p.name}
            className={cn(
              'flex items-center justify-between gap-4',
              facility.inline && 'lg:justify-start',
            )}
          >
            <span>{p.name}</span>
            <span>{p.time}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}

/**
 * "Easy Access to public Fasility": three columns between Gray/200 side rules on desktop, one ruled
 * column on tablet and mobile. Desktop columns touch, so neighbouring rules overlap into a single
 * line (the design's 48 px gap drew them double; client revision, design-notes D9).
 */
export function Facilities() {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-15">
      <h2
        id={titleId}
        data-reveal="lines"
        className="max-w-54.25 font-gloock text-header-xs text-gray-950"
      >
        Easy Access to public Fasility
      </h2>
      <div
        data-reveal="up"
        className="flex flex-col gap-12 max-lg:line-x-gray-200 lg:grid lg:grid-cols-3 lg:gap-0"
      >
        {facilityColumns.map((column, i) => (
          <ul key={i} className="flex flex-col gap-12 px-6 lg:line-x-gray-200 lg:not-first:-ml-px">
            {column.map((f) => (
              <Item key={f.name} facility={f} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
