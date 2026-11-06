import { useId, useRef } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { DotIcon } from '@/components/icons/DotIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { services, type Service } from '@/data/services'
import { usePinnedSteps } from '@/lib/usePinnedSteps'

/**
 * The three service blocks are absolute layouts in the frames and differ slightly per service and
 * breakpoint; each offset is reproduced as drawn (design-notes SV4–SV6).
 * - block: height and the number's top offset (first block 966 px tall at 768 / 425, 94 px from the top;
 *   third block 50 px from the top at 425).
 * - details: gap between number and details below desktop, and the details width.
 * - list: the third block's tablet list has 20 px gaps and items 4 px in from each side.
 * - topItem: the first item of the third block aligns its text to the top of the dot, not the middle.
 */
const quirks = [
  {
    block: 'h-241.5 pt-23.5 lg:h-243.75 lg:pt-26',
    details: 'mt-10.5 max-w-95.75 md:mt-12 md:max-w-119',
    list: '',
    topItem: false,
  },
  {
    block: 'h-243.75 pt-26',
    details: 'mt-9 md:mt-12',
    list: '',
    topItem: false,
  },
  {
    block: 'h-243.75 pt-12.5 md:pt-26',
    details: 'mt-8.5 md:mt-12',
    list: 'md:max-lg:gap-5 md:max-lg:px-1',
    topItem: true,
  },
] as const

function ServiceBlock({ service, quirk }: { service: Service; quirk: (typeof quirks)[number] }) {
  const titleId = useId()
  return (
    <article
      data-step
      aria-labelledby={titleId}
      className={cn(
        'bg-neutral-white line-t-gray-200',
        quirk.block,
        // Pinned (usePinnedSteps): the blocks share one screen, stacked.
        'group-data-pinned/steps:absolute group-data-pinned/steps:inset-0 group-data-pinned/steps:h-full',
      )}
    >
      <Container className="flex h-full flex-col md:pl-20.5 lg:pl-col-2">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <p
            aria-hidden="true"
            data-design-contrast
            className="font-gloock text-numeral text-gray-100 lg:ml-0.75 lg:text-numeral-lg"
          >
            {service.number}
          </p>
          <div
            className={cn(
              'flex w-full max-w-120 flex-col items-start gap-8 lg:mt-0 lg:mr-4.5 lg:max-w-120',
              quirk.details,
            )}
          >
            <h2
              id={titleId}
              data-reveal="lines"
              className="font-gloock text-header-sm text-gray-950"
            >
              {service.title}
            </h2>
            <p data-reveal="up" data-design-contrast className="text-body-xs-regular text-gray-400">
              {service.summary}
            </p>
            <ButtonLink
              to={`/services/${service.slug}`}
              variant="fill"
              size="md"
              iconRight={<ArrowUpRightCircleIcon />}
              data-reveal="up"
            >
              Learn More<span className="sr-only"> about {service.title}</span>
            </ButtonLink>
          </div>
        </div>
        <ul
          data-reveal="stagger"
          data-design-contrast
          className={cn(
            'mt-auto flex flex-col text-body-sm-semibold text-gray-300 lg:mb-5 lg:flex-row lg:gap-5',
            quirk.list,
          )}
        >
          {service.features.map((feature, i) => (
            <li
              key={feature}
              className={cn(
                'flex gap-6 py-8 line-t-gray-300 lg:min-w-0 lg:flex-1',
                quirk.topItem && i === 0 ? 'items-start' : 'items-center',
              )}
            >
              <DotIcon className="shrink-0 text-gray-950" />
              <span className="min-w-0 flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  )
}

/**
 * Scroll-driven from tablet up (revision, design-notes SV12): the section holds one screen while
 * scrolling swaps 01 → 02 → 03, then the page continues. Where a block does not fit the screen
 * (mobile, short screens) or with reduced motion, the blocks follow each other as designed.
 */
const PIN_QUERY =
  '(min-width: 1024px) and (min-height: 620px), (min-width: 768px) and (min-height: 960px)'

export function ServiceList() {
  const root = useRef<HTMLDivElement>(null)
  usePinnedSteps(root, PIN_QUERY)
  return (
    <div ref={root} className="group/steps relative data-pinned:h-svh data-pinned:overflow-hidden">
      {services.map((service, i) => (
        <ServiceBlock key={service.slug} service={service} quirk={quirks[i]} />
      ))}
    </div>
  )
}
