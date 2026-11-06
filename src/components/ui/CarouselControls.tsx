import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { cn } from '@/lib/cn'
import { Button } from './Button'

/**
 * Prev / next: Button outline, icon only ("Left 2"), 8 px apart; medium (56 px) by default, small
 * (40 px) on the Blog. The carousel wraps around.
 */
type CarouselControlsProps = {
  label: string
  onPrev: () => void
  onNext: () => void
  size?: 'md' | 'sm'
  className?: string
}

const sizes = { md: 'size-14', sm: 'size-10' } as const

export function CarouselControls({
  label,
  onPrev,
  onNext,
  size = 'md',
  className,
}: CarouselControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size={size}
        aria-label={`Previous ${label}`}
        onClick={onPrev}
        className={sizes[size]}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="outline"
        size={size}
        aria-label={`Next ${label}`}
        onClick={onNext}
        className={sizes[size]}
      >
        <ChevronLeftIcon className="rotate-180" />
      </Button>
    </div>
  )
}
