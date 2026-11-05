import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import type { ImageAsset } from '@/assets/images'
import { cn } from '@/lib/cn'

/**
 * Properties component set (15213). `ScreenSize` is responsive: image 385×323 (mobile, "Default"),
 * 323×323 (tablet), 631×525 (desktop). The corner radius differs per page in the design, so the
 * section passes it in `imageClassName` (design-notes G17).
 */
export type PropertyCardData = {
  slug: string
  image: ImageAsset
  alt: string
  name: string
  address: string
  type: string
  price: string
  rent: string
}

type PropertyCardProps = PropertyCardData &
  ComponentProps<'article'> & {
    imageClassName?: string
    /** Hero-sized images above the fold load eagerly. */
    eager?: boolean
  }

export function PropertyCard({
  slug,
  image,
  alt,
  name,
  address,
  type,
  price,
  rent,
  imageClassName,
  eager = false,
  className,
  ...props
}: PropertyCardProps) {
  return (
    <article className={cn('relative flex flex-col gap-4', className)} {...props}>
      <div
        data-reveal="media"
        className={cn(
          'aspect-385/323 overflow-hidden md:aspect-square lg:aspect-631/525',
          imageClassName,
        )}
      >
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 44vw, (min-width: 768px) 42vw, 100vw"
          width={image.width}
          height={image.height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className="size-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-body-xs-semibold text-gray-950">
            {/* The whole card is clickable through the stretched link. */}
            <Link to={`/properties/${slug}`} className="after:absolute after:inset-0">
              {name}
            </Link>
          </h3>
          <p className="text-body-xs-light text-gray-400" data-design-contrast>
            {address}
          </p>
          <p className="text-body-xs-light text-gray-400" data-design-contrast>
            {type}
          </p>
        </div>
        <p
          className="flex flex-col items-end gap-2 text-body-xs-light text-gray-400"
          data-design-contrast
        >
          <span>{price}</span>
          <span>{rent}</span>
        </p>
      </div>
    </article>
  )
}
