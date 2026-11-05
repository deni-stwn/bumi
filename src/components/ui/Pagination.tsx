import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { cn } from '@/lib/cn'
import { Button } from './Button'

/**
 * Page buttons: Button small (40 px) outline, the current page fill; prev/next show "Left 2".
 * Page changes stay on the page (state), so these are buttons with aria-current.
 */
type PaginationProps = {
  page: number
  pages: number
  onChange: (page: number) => void
  label?: string
  className?: string
}

export function Pagination({
  page,
  pages,
  onChange,
  label = 'Pagination',
  className,
}: PaginationProps) {
  return (
    <nav aria-label={label} className={cn('flex items-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="size-10 disabled:text-gray-950 disabled:inset-ring-gray-950"
      >
        <ChevronLeftIcon />
      </Button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <Button
          key={n}
          variant={n === page ? 'fill' : 'outline'}
          size="sm"
          aria-label={`Page ${n}`}
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onChange(n)}
          className="size-10"
        >
          {n}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        aria-label="Next page"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="size-10 disabled:text-gray-950 disabled:inset-ring-gray-950"
      >
        <ChevronLeftIcon className="rotate-180" />
      </Button>
    </nav>
  )
}
