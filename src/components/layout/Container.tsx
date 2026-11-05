import type { ComponentProps, ElementType } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps<T extends ElementType> = {
  as?: T
  /**
   * `inset` (default): content starts at grid column 2 on tablet and desktop, as every section
   * in the design does. `full`: 20 px margins on both sides (navbar, footer, full-width rows).
   */
  layout?: 'inset' | 'full'
} & ComponentProps<T>

const layouts = {
  // Tablet frames start content at 84 px (design value); desktop follows the 12-column grid.
  inset: 'px-gutter md:pl-21 lg:pl-col-2',
  full: 'px-gutter',
} as const

/** Grid styles Desktop/Tablet (12 columns) and Mobile (4 columns): gutter and margin 20 px, frame 1440 px. */
export function Container<T extends ElementType = 'div'>({
  as,
  layout = 'inset',
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-frame',
        layouts[layout as keyof typeof layouts],
        className,
      )}
      {...props}
    />
  )
}
