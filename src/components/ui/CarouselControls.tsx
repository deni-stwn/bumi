import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { cn } from '@/lib/cn'
import { Button } from './Button'

/** Prev / next: Button outline medium, icon only ("Left 2"), 8 px apart. The carousel wraps around. */
type CarouselControlsProps = {
  label: string
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function CarouselControls({ label, onPrev, onNext, className }: CarouselControlsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="md"
        aria-label={`Previous ${label}`}
        onClick={onPrev}
        className="size-14"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="outline"
        size="md"
        aria-label={`Next ${label}`}
        onClick={onNext}
        className="size-14"
      >
        <ChevronLeftIcon className="rotate-180" />
      </Button>
    </div>
  )
}
