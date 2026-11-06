import { useId, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'
import type { ServiceHighlight as Highlight } from '@/data/serviceDetails'
import { ActivePhoto } from './ActivePhoto'
import type { ServiceLayout } from './serviceLayouts'

/**
 * Title and description (side by side on desktop, stacked below), and three captioned photo cards:
 * a row above the text on desktop (809 fills / 216 / 217 px), a column after it below. The captions
 * are absolute layers in the design; here they are anchored to the card's bottom-left corner with a
 * maximum width, so a narrower card wraps them upwards. Card and caption geometry per page comes from
 * `serviceLayouts`, by position.
 * The wide card is the active one, in colour. Hovering another card makes it the active one: on
 * desktop it takes the first position's layout (wide, large caption) and the others the narrow ones;
 * below desktop, where the cards are stacked, only the colour moves. Leaving the row brings back the
 * first card (revision, design-notes SV13).
 */

// Desktop widths by position: the active card fills the row, then 216 and 217 px.
const desktopWidths = [
  'lg:min-w-0 lg:grow lg:basis-54',
  'lg:shrink-0 lg:grow-0 lg:basis-54',
  'lg:shrink-0 lg:grow-0 lg:basis-54.25',
] as const
export function ServiceHighlight({
  highlight,
  layout,
  className,
}: {
  highlight: Highlight
  layout: ServiceLayout['highlight']
  className?: string
}) {
  const titleId = useId()
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const desktop = useMediaQuery('(min-width: 1024px)')
  // Desktop positions: the active card first, the others in order after it.
  const order = [active, ...highlight.cards.map((_, i) => i).filter((i) => i !== active)]
  const positionOf = (i: number) => (desktop ? order.indexOf(i) : i)
  return (
    <Container as="section" aria-labelledby={titleId}>
      <div className={cn('flex flex-col gap-12 py-25 lg:py-50', className)}>
        <div
          className={cn('flex flex-col gap-16 lg:flex-row lg:items-start xl:gap-67.5', layout.text)}
        >
          <h2
            id={titleId}
            data-reveal="lines"
            className={cn('font-gloock text-header-xs text-gray-950 lg:shrink-0', layout.title)}
          >
            {highlight.title}
          </h2>
          <p
            data-reveal="up"
            data-design-contrast
            className={cn(
              'w-145.5 max-w-full text-body-xs-regular text-gray-400 lg:min-w-0',
              layout.description,
            )}
          >
            {highlight.description}
          </p>
        </div>
        <ul
          data-reveal="stagger"
          onPointerLeave={() => setActive(0)}
          className={cn('flex flex-col gap-5 lg:order-first lg:flex-row', layout.list)}
        >
          {highlight.cards.map(({ label, photo }, i) => {
            const position = positionOf(i)
            const card = layout.cards[position]
            return (
              <li
                key={label}
                onPointerEnter={() => {
                  setActive(i)
                  setTouched(true)
                }}
                className={cn(
                  'relative shrink-0 overflow-hidden transition-[flex-grow,flex-basis] duration-500 ease-house-out lg:rounded-corner-l',
                  card.card,
                  desktopWidths[position],
                )}
              >
                <div className={cn('absolute left-0', card.photo)}>
                  <ActivePhoto
                    photo={photo}
                    active={i === active}
                    sizes={card.sizes}
                    className="lg:rounded-corner-l"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 inset-ring inset-ring-gray-200 lg:rounded-corner-l"
                  />
                </div>
                {/* A caption that changes position (and style) fades in again once the card has resized. */}
                <p
                  key={position}
                  className={cn(
                    'absolute text-neutral-white',
                    card.caption,
                    touched && desktop && 'animate-caption-in',
                  )}
                >
                  {label}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  )
}
