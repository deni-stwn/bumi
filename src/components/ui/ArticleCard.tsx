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
    imageClassName?: string
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
  className,
  ...props
}: ArticleCardProps) {
  const link = (
    <Link to={`/blog/${slug}`} className="after:absolute after:inset-0">
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
        <h3 className="text-body-md-semibold text-gray-950">{link}</h3>
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
            sizes="(min-width: 1024px) 30vw, 100vw"
            width={image.width}
            height={image.height}
            alt={alt}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-6">
        <h3 className="text-body-md-semibold text-gray-950">{link}</h3>
        {excerpt ? (
          <p className="line-clamp-3 text-body-xs-regular text-gray-400" data-design-contrast>
            {excerpt}
          </p>
        ) : null}
        <p className="text-body-xs-regular text-gray-400" data-design-contrast>
          {readTime}
        </p>
      </div>
    </article>
  )
}
