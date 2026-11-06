import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'

/**
 * What differs per page, as drawn in each frame:
 * - row: gap between title and description, and the desktop row itself.
 * - title: type size from tablet up.
 * - description: its width.
 */
export type PageIntroLayout = { row: string; title: string; description: string }

type PageIntroProps = {
  title: string
  description: string
  layout: PageIntroLayout
  /** Section padding and inset overrides (200 px above and below by default). */
  className?: string
}

/**
 * Page title and description on the text pages (guides, Mortgage Calculator), stacked on mobile and
 * tablet. Desktop puts the 688 px Header/XL title and the 377 px description side by side,
 * bottom-aligned. That row is about 1208 px wide and the titles' longest words are up to 600 px, so it
 * starts at `xl`; 1024–1279 keeps the tablet layout, and up to 1439 the gap narrows to 40 px so the
 * title keeps its 688 px box and its line breaks (design-notes BG1).
 */
export function PageIntro({ title, description, layout, className }: PageIntroProps) {
  return (
    <Container as="section" aria-labelledby="page-title" className={cn('py-50', className)}>
      <div className={cn('flex flex-col xl:w-full xl:flex-row xl:items-end', layout.row)}>
        {/* Tablet draws some title boxes 688 px wide in a 664 px column; the column width gives the
            same line breaks without overflowing the page. */}
        <h1
          id="page-title"
          data-reveal="lines"
          className={cn(
            'font-gloock text-header-md text-gray-950 md:max-w-172 xl:w-172 xl:min-w-0',
            layout.title,
          )}
        >
          {title}
        </h1>
        <p
          data-reveal="up"
          data-design-contrast
          className={cn(
            'max-w-full text-body-xs-regular text-gray-400 xl:shrink-0',
            layout.description,
          )}
        >
          {description}
        </p>
      </div>
    </Container>
  )
}
