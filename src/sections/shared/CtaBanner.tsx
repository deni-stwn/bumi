import { useId, type ReactNode } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/**
 * "Ready to …" banner: a very light display heading (Gray/100) with a fill button over its middle,
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
  return (
    <section
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
