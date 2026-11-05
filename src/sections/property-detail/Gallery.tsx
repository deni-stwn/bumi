import { useId } from 'react'
import type { ImageAsset } from '@/assets/images'
import { DotIcon } from '@/components/icons/DotIcon'
import { propertyDetail as d } from '@/data/propertyDetail'
import { cn } from '@/lib/cn'

function Photo({
  image,
  alt,
  className,
  sizes,
}: {
  image: ImageAsset
  alt: string
  className: string
  sizes: string
}) {
  return (
    <div data-reveal="media" className={cn('overflow-hidden lg:rounded-corner-l', className)}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  )
}

/**
 * Gallery (main photo beside the thumbnails on desktop: 572 | 335 335 / 453 217; stacked below) and
 * "What will you get" (title beside the list from grid column 7 on desktop).
 */
export function Gallery() {
  const titleId = useId()
  const [a, b, c, e] = d.gallery.thumbs
  return (
    <div className="flex flex-col gap-15">
      <div className="flex flex-col gap-5 lg:flex-row">
        <Photo
          {...d.gallery.main}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-88.75 md:h-145 lg:w-143 lg:shrink-0"
        />
        <div className="flex flex-col gap-5 lg:flex-1">
          <div className="flex h-31.25 gap-5 md:h-51">
            <Photo {...a} sizes="(min-width: 1024px) 24vw, 50vw" className="flex-1" />
            <Photo {...b} sizes="(min-width: 1024px) 24vw, 50vw" className="flex-1" />
          </div>
          <div className="flex h-54.5 gap-5 md:h-89">
            <Photo {...c} sizes="(min-width: 1024px) 32vw, 40vw" className="flex-1" />
            <Photo {...e} sizes="217px" className="w-54.25 shrink-0" />
          </div>
        </div>
      </div>

      <section
        aria-labelledby={titleId}
        className="flex flex-col gap-12 lg:grid lg:grid-cols-11 lg:gap-x-5"
      >
        <h2
          id={titleId}
          data-reveal="lines"
          className="max-w-61.75 font-gloock text-header-sm text-gray-950 lg:col-span-5"
        >
          What will you get
        </h2>
        <ul
          data-reveal="up"
          className="flex max-w-143 flex-wrap gap-x-4 lg:col-span-5 lg:col-start-6"
        >
          {d.features.map((f) => (
            <li key={f} className="flex h-6 items-center gap-2 text-body-xs-regular text-gray-950">
              <DotIcon />
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
