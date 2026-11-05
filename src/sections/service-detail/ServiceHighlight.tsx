import { useId } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import type { ServiceHighlight as Highlight } from '@/data/serviceDetails'
import type { ServiceLayout } from './serviceLayouts'

/**
 * Title and description (side by side on desktop, stacked below), and three captioned photo cards:
 * a row above the text on desktop (809 fills / 216 / 217 px), a column after it below. The captions
 * are absolute layers in the design; here they are anchored to the card's bottom-left corner with a
 * maximum width, so a narrower card wraps them upwards. Card and caption geometry per page comes from
 * `serviceLayouts`.
 */
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
          className={cn('flex flex-col gap-5 lg:order-first lg:flex-row', layout.list)}
        >
          {highlight.cards.map(({ label, photo }, i) => {
            const card = layout.cards[i]
            return (
              <li
                key={label}
                className={cn('relative shrink-0 overflow-hidden lg:rounded-corner-l', card.card)}
              >
                <div className={cn('absolute left-0', card.photo)}>
                  <img
                    src={photo.image.src}
                    srcSet={photo.image.srcSet}
                    sizes={card.sizes}
                    width={photo.image.width}
                    height={photo.image.height}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full object-cover lg:rounded-corner-l"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 inset-ring inset-ring-gray-200 lg:rounded-corner-l"
                  />
                </div>
                <p className={cn('absolute text-neutral-white', card.caption)}>{label}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  )
}
