import { cn } from '@/lib/cn'

/** Design property `Style` (fill / outline / nofill) → `variant`; `nofill` is called `ghost` here. */
export type ButtonVariant = 'fill' | 'outline' | 'ghost'
/** Design property `Size`: large 72 px, medium 56 px, small 40 px tall. */
export type ButtonSize = 'lg' | 'md' | 'sm'

const base =
  'inline-flex shrink-0 items-center justify-center rounded-full text-body-xs-semibold whitespace-nowrap transition-colors duration-200 ease-out'

const sizes: Record<ButtonSize, string> = {
  lg: 'h-18 gap-2 p-6',
  md: 'h-14 gap-4 p-4',
  sm: 'h-10 gap-2 p-2',
}

// States from the Button component set (13665): Hover and Disable variants. Disabled covers both
// <button disabled> and links marked aria-disabled.
const variants: Record<ButtonVariant, string> = {
  fill: cn(
    'bg-gray-950 text-neutral-white hover:bg-gray-900',
    'disabled:bg-gray-100 disabled:text-gray-300 aria-disabled:bg-gray-100 aria-disabled:text-gray-300',
  ),
  outline: cn(
    'text-gray-950 inset-ring inset-ring-gray-950 hover:bg-gray-950 hover:text-neutral-white',
    'disabled:bg-transparent disabled:text-gray-200 disabled:inset-ring-gray-200',
    'aria-disabled:bg-transparent aria-disabled:text-gray-200 aria-disabled:inset-ring-gray-200',
  ),
  ghost: cn(
    'text-gray-950 hover:underline',
    'disabled:text-gray-200 disabled:no-underline aria-disabled:text-gray-200 aria-disabled:no-underline',
  ),
}

export function buttonClasses({
  variant = 'fill',
  size = 'lg',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return cn(base, sizes[size], variants[variant], 'disabled:cursor-not-allowed', className)
}
