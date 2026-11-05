import { useId } from 'react'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import type { ServiceFeature as Feature, ServicePhoto } from '@/data/serviceDetails'
import type { FeatureLayout } from './serviceLayouts'

// Photos sit in 414 px tall boxes (200 px on mobile) that crop them hard, so even the narrow ones
// need about 640 px of source width on tablet and desktop.
const photoSizes = '(min-width: 768px) 640px, 320px'

/**
 * Three photos 20 px apart: on mobile a 200 px square and two strips sharing the rest; from tablet a
 * wide photo and two strips of 99 / 98 px, 414 px tall. Rounded only on desktop (the radius variable
 * resolves to 0 in the other frames, design-notes G17); `framed` adds the Gray/200 inside stroke.
 */
function Gallery({
  photos,
  framed,
  className,
}: {
  photos: ServicePhoto[]
  framed: boolean
  className?: string
}) {
  return (
    <div
      data-reveal="stagger"
      className={cn('flex h-50 gap-5 md:h-103.5 lg:max-w-143 lg:min-w-0 lg:flex-1', className)}
    >
      {photos.map(({ image, alt }, i) => (
        <div
          key={image.src}
          className={cn(
            'relative overflow-hidden lg:rounded-corner-l',
            i === 0
              ? 'w-50 shrink-0 md:w-auto md:min-w-0 md:flex-1'
              : 'min-w-0 flex-1 md:flex-none',
            i === 1 && 'md:w-24.75',
            i === 2 && 'md:w-24.5',
          )}
        >
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={photoSizes}
            width={image.width}
            height={image.height}
            alt={alt}
            loading="lazy"
            className="size-full object-cover"
          />
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
  /** Type style of the first, dark list item (Bold or Semibold per page). */
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
 */
export function ServiceFeature({ feature, layout, lead, widths, className }: ServiceFeatureProps) {
  const titleId = useId()
  const spread = layout === 'spread'
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
            className="order-last flex flex-col gap-4 text-body-xs-regular text-gray-400 lg:order-none"
          >
            {feature.features.map((item) => (
              <li key={item} className={cn('first:text-gray-950', lead)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Gallery
          photos={feature.photos}
          framed={spread}
          className={cn(feature.photosCompact && 'max-lg:hidden', widths?.gallery)}
        />
        {feature.photosCompact && (
          <Gallery photos={feature.photosCompact} framed={false} className="lg:hidden" />
        )}
      </div>
    </Container>
  )
}
