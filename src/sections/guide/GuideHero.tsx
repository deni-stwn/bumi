import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import type { GuideHeroLayout } from './guideLayouts'

type GuideHeroProps = { title: string; description: string; layout: GuideHeroLayout }

/**
 * Page title and description, stacked on mobile and tablet. Desktop puts the 688 px Header/XL title
 * and the 377 px description side by side, bottom-aligned. That row is about 1208 px wide and the
 * title's longest word ("Property") is 520 px, so it starts at `xl`; 1024–1279 keeps the tablet layout
 * (design-notes BG1). Gaps, sizes and the row's position differ per guide (guideLayouts.ts).
 */
export function GuideHero({ title, description, layout }: GuideHeroProps) {
  return (
    <Container as="section" aria-labelledby="guide-title" className="py-50">
      <div className={cn('flex flex-col xl:w-full xl:flex-row xl:items-end', layout.row)}>
        {/* Tablet draws the title box 688 px wide in a 664 px column; the column width gives the
            same line breaks without overflowing the page. */}
        <h1
          id="guide-title"
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
