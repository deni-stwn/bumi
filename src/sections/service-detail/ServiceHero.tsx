import { useId } from 'react'
import { cn } from '@/lib/cn'
import type { ServiceLayout } from './serviceLayouts'

/**
 * Title with a short description: side by side and bottom-aligned on desktop from `xl` (below 1280
 * the 760 px title would split more words), stacked below (64 px apart, 108 on Consultation). The
 * desktop block's width and alignment, the tablet inset, the stacked gap and the description width
 * differ per page (`serviceLayouts`). The
 * title box is narrower than its longest word at 1440 and 425, so the word breaks mid-way as in the
 * design (global `overflow-wrap`, design-notes L2).
 */
export function ServiceHero({
  title,
  description,
  layout,
}: {
  title: string
  description: string
  layout: ServiceLayout['hero']
}) {
  const titleId = useId()
  return (
    <section
      aria-labelledby={titleId}
      className={cn('px-gutter py-50 lg:pl-col-2 xl:pl-gutter', layout.section)}
    >
      <div className={cn('flex flex-col gap-16 xl:flex-row xl:items-end xl:gap-27', layout.block)}>
        <h1
          id={titleId}
          data-reveal="lines"
          className="font-gloock text-header-md text-gray-950 md:text-header-lg lg:text-header-xl xl:max-w-190 xl:min-w-0 xl:flex-1"
        >
          {title}
        </h1>
        <p
          data-reveal="up"
          data-design-contrast
          className={cn(
            'max-w-full shrink-0 text-body-xs-regular text-gray-400',
            layout.description,
          )}
        >
          {description}
        </p>
      </div>
    </section>
  )
}
