import { useId, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import type { ServiceFeature as Feature, ServicePhoto } from '@/data/serviceDetails'
import { ActivePhoto } from './ActivePhoto'
import type { FeatureLayout } from './serviceLayouts'

// Photos sit in 414 px tall boxes (200 px on mobile) that crop them hard, so even the narrow ones
// need about 640 px of source width on tablet and desktop.
const photoSizes = '(min-width: 768px) 640px, 320px'

/**
 * Three photos 20 px apart: on mobile a 200 px square and two strips sharing the rest; from tablet a
 * wide photo and two strips of 99 / 98 px, 414 px tall. Rounded only on desktop (the radius variable
 * resolves to 0 in the other frames, design-notes G17); `framed` adds the Gray/200 inside stroke.
 * The wide photo is the active one, in colour: hovering another photo makes it the active one (it
 * widens and turns to colour, the others narrow to strips in black and white), and leaving the row
 * brings back the first (revision, design-notes SV13). The active photo is shared with the list
 * beside it (SV14).
 */
function Gallery({
  photos,
  framed,
  active,
  onActive,
  className,
}: {
  photos: ServicePhoto[]
  framed: boolean
  active: number
  onActive: (i: number) => void
  className?: string
}) {
  return (
    <div
      data-reveal="stagger"
      onPointerLeave={() => onActive(0)}
      className={cn('flex h-50 gap-5 md:h-103.5 lg:max-w-143 lg:min-w-0 lg:flex-1', className)}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.image.src}
          onPointerEnter={() => onActive(i)}
          className={cn(
            'relative min-w-0 overflow-hidden transition-[flex-grow,flex-basis] duration-500 ease-house-out lg:rounded-corner-l',
            // Grow and basis only, so the swap animates: the active photo takes the room the
            // strips leave (200 px on mobile), the strips keep 99 / 98 px from tablet.
            i === active
              ? 'shrink-0 grow-0 basis-50 md:shrink md:grow'
              : 'grow basis-0 md:shrink-0 md:grow-0',
            i === 2 ? 'md:basis-24.5' : 'md:basis-24.75',
          )}
        >
          <ActivePhoto photo={photo} active={i === active} sizes={photoSizes} />
          {framed && (
            <span
              aria-hidden="true"
              className="absolute inset-0 inset-ring inset-ring-gray-200 lg:rounded-corner-l"
            />
          )}
        </div>
      ))}
    </div>
  )
}

type ServiceFeatureProps = {
  feature: Feature
  /**
   * `center`: the text column (title group and list 192 px apart) is centred against the photos.
   * `spread`: the column is as tall as the photos, title at the top and list at the bottom; the
   * photos get an inside stroke (not the `photosCompact` ones, which repeat the first block's).
   */
  layout: 'center' | 'spread'
  /** Type style of the active, dark list item (Bold or Semibold per page). */
  lead: string
  /** Text and photo widths below desktop when they don't fill the column. */
  widths?: FeatureLayout
  /** Divider strokes of the content box (top only, or top and bottom). */
  className?: string
}

/**
 * Desktop: text column (582) and photos (572) side by side, 128 px apart, 200 px padding. Tablet and
 * mobile stack title group, photos and list 64 px apart with 100 px padding: the column is
 * `display: contents` there, so its two parts join the outer stack around the photos.
 * List item n and photo n are one pair: hovering (or tapping) either makes both active, the line dark
 * and the photo wide and in colour; leaving them brings back the first pair (revision, SV14).
 */
export function ServiceFeature({ feature, layout, lead, widths, className }: ServiceFeatureProps) {
  const titleId = useId()
  const spread = layout === 'spread'
  const [active, setActive] = useState(0)
  return (
    <Container as="section" aria-labelledby={titleId}>
      <div
        className={cn(
          'flex flex-col gap-16 py-25 lg:flex-row lg:gap-32 lg:py-50',
          !spread && 'lg:items-center',
          className,
        )}
      >
        <div
          className={cn(
            'contents lg:flex lg:max-w-145.5 lg:min-w-0 lg:flex-1 lg:flex-col',
            spread ? 'lg:justify-between' : 'lg:gap-48',
          )}
        >
          <div className={cn('flex flex-col', spread ? 'gap-8' : 'gap-6.75', widths?.text)}>
            <h2
              id={titleId}
              data-reveal="lines"
              className="font-gloock text-header-xs text-gray-950"
            >
              {feature.title}
            </h2>
            <p data-reveal="up" data-design-contrast className="text-body-xs-regular text-gray-400">
              {feature.description}
            </p>
          </div>
          <ul
            data-reveal="stagger"
            data-design-contrast
            onPointerLeave={() => setActive(0)}
            className="order-last flex flex-col gap-4 text-body-xs-regular text-gray-400 lg:order-none"
          >
            {feature.features.map((item, i) => (
              <li
                key={item}
                // A tap fires pointerenter too, so touch selects the pair as well.
                onPointerEnter={() => setActive(i)}
                className={cn(
                  'cursor-default self-start transition-colors duration-200 ease-out',
                  i === active && ['text-gray-950', lead],
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Gallery
          photos={feature.photos}
          framed={spread}
          active={active}
          onActive={setActive}
          className={cn(feature.photosCompact && 'max-lg:hidden', widths?.gallery)}
        />
        {feature.photosCompact && (
          <Gallery
            photos={feature.photosCompact}
            framed={false}
            active={active}
            onActive={setActive}
            className="lg:hidden"
          />
        )}
      </div>
    </Container>
  )
}
