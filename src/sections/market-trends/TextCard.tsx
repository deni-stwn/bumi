import type { ReactNode } from 'react'
import { CardShell } from './ChartCard'

type TextCardProps = { id: string; title: string; children: ReactNode }

/**
 * Analyst opinion and Methodology: one text box (Body/XS Regular, Gray/400) inside the card, 48 px
 * in on desktop and tablet, 20 px on mobile, 26 px under the title.
 */
export function TextCard({ id, title, children }: TextCardProps) {
  return (
    <CardShell id={id} title={title} gap="gap-6.5">
      <div
        data-design-contrast
        className="p-5 text-body-xs-regular text-gray-400 text-box-cap md:p-12"
      >
        {children}
      </div>
    </CardShell>
  )
}
