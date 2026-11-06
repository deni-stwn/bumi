import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import type { ImageAsset } from '@/assets/images'
import { cn } from '@/lib/cn'

/**
 * News component set (14824): `Property 1` large → `feature` (image, title, excerpt, read time),
 * small → `compact` (title and read time between side rules, 130 px tall).
 */
export type ArticleCardData = {
  slug: string
  title: string
  excerpt?: string
  readTime: string
  image?: ImageAsset
  alt?: string
}

type ArticleCardProps = ArticleCardData &
  ComponentProps<'article'> & {
    variant?: 'feature' | 'compact'
    /** Radius and size of the 329 px image box. */
    imageClassName?: string
    /** `sizes` for the image's srcset. */
    imageSizes?: string
    /** The title's box when it is narrower or wider than the card (as drawn). */
    titleClassName?: string
    /** The excerpt box (396 px by default, as in the News set). */
    excerptClassName?: string
  }

export function ArticleCard({
  variant = 'feature',
  slug,
  title,
  excerpt,
  readTime,
  image,
  alt = '',
  imageClassName,
  imageSizes = '(min-width: 1024px) 30vw, 100vw',
  titleClassName,
  excerptClassName,
  className,
  ...props
}: ArticleCardProps) {
  // FigCraft measures text a hair wider than browsers: on mobile two titles fill their box to within
  // 0.1 px and wrap one word earlier in the frames. One pixel less keeps those line breaks (BL6).
  const heading = cn('text-body-md-semibold text-gray-950 max-md:pr-px', titleClassName)
  const link = (
    <Link to={`/blog/${slug}`} className="after:absolute after:inset-0 hover:underline">
      {title}
    </Link>
  )
  if (variant === 'compact') {
    return (
      <article
        className={cn(
          'relative flex h-32.5 flex-col justify-between gap-6 px-5 line-x-gray-100',
          className,
        )}
        {...props}
      >
        <h3 className={heading}>{link}</h3>
        <p className="text-body-xs-regular text-gray-300" data-design-contrast>
          {readTime}
        </p>
      </article>
    )
  }
  return (
    <article className={cn('relative flex flex-col gap-4.75', className)} {...props}>
      {image ? (
        <div data-reveal="media" className={cn('h-82.25 overflow-hidden', imageClassName)}>
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={imageSizes}
            width={image.width}
            height={image.height}
            alt={alt}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-6">
        <h3 className={heading}>{link}</h3>
        {excerpt ? (
          // A fixed 396 × 80 text box that ends in an ellipsis after three lines (News, large); the
          // box keeps its height, the clamped text inside stops at the third line.
          <div className={cn('h-20 w-99 max-w-[calc(100%+0.6875rem)]', excerptClassName)}>
            {/* 4 px inside the clip below the trimmed last line keep its descenders. */}
            <p
              className="-mb-1 line-clamp-3 pb-1 text-body-xs-regular text-gray-400"
              data-design-contrast
            >
              {excerpt}
            </p>
          </div>
        ) : null}
        <p className="text-body-xs-regular text-gray-400" data-design-contrast>
          {readTime}
        </p>
      </div>
    </article>
  )
}
