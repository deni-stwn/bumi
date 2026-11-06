import { overviewSections } from '@/data/marketTrends'
import { cn } from '@/lib/cn'
import { useScrollSpy } from '@/lib/useScrollSpy'

const ids = overviewSections.map((s) => s.id)

/**
 * "Overview": links to the cards below. The section being read is marked like the design's first
 * item (Body/MD/Semibold Gray/950 with a 3 px bar on the left); the others are Body/MD/Regular
 * Gray/200. A 267 px column, 32 px between title and items and between items.
 */
export function OverviewNav({ className }: { className?: string }) {
  const active = useScrollSpy(ids)
  return (
    <nav aria-labelledby="overview-title" className={cn('flex flex-col gap-8', className)}>
      <h2
        id="overview-title"
        data-reveal="lines"
        className="font-gloock text-header-xs text-gray-950"
      >
        Overview
      </h2>
      <ul data-reveal="stagger" data-design-contrast className="flex w-66.75 flex-col gap-8">
        {overviewSections.map((section) => {
          const current = section.id === active
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  'relative block px-4 py-2 transition-colors duration-200 ease-out',
                  current
                    ? 'text-body-md-semibold text-gray-950 before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-gray-950'
                    : 'text-body-md-regular text-gray-200 hover:text-gray-950',
                )}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
