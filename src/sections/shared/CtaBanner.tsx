import { useId, useRef, type ReactNode } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useFollowPointer } from '@/lib/useFollowPointer'

/**
 * "Ready to …" banner: a very light display heading (Gray/100) with a fill button over its middle
 * that follows the mouse while it is over the banner,
 * Header/MD / LG / XL at 425 / 768 / 1440. Pages differ in padding and, on Home, in the button's
 * desktop position, so they can be adjusted with `className` / `headingClassName` / `buttonClassName`.
 */
type CtaBannerProps = {
  heading: ReactNode
  cta: string
  to: string
  className?: string
  headingClassName?: string
  buttonClassName?: string
}

export function CtaBanner({
  heading,
  cta,
  to,
  className,
  headingClassName,
  buttonClassName,
}: CtaBannerProps) {
  const titleId = useId()
  const area = useRef<HTMLElement>(null)
  // The button follows the mouse over the banner (revision, design-notes G28).
  useFollowPointer(area)
  return (
    <section
      ref={area}
      aria-labelledby={titleId}
      className={cn('relative mx-auto max-w-frame px-gutter py-25 lg:px-20.75 lg:py-50', className)}
    >
      <h2
        id={titleId}
        data-reveal="lines"
        data-design-contrast
        className={cn(
          'text-center font-gloock text-header-md text-gray-100 md:text-header-lg lg:text-header-xl',
          headingClassName,
        )}
      >
        {heading}
      </h2>
      <ButtonLink
        data-follow-pointer
        to={to}
        variant="fill"
        size="md"
        iconRight={<ArrowUpRightCircleIcon />}
        className={cn(
          'absolute top-1/2 left-1/2 -translate-1/2 lg:h-18 lg:gap-2 lg:p-6',
          buttonClassName,
        )}
      >
        {cta}
      </ButtonLink>
    </section>
  )
}
