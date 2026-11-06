import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BulletListProps = {
  items: ReactNode[]
  /**
   * The list opens its text box: the first line is trimmed to cap height, so the first item's box
   * starts at the cap and its dot sits 4 px below that instead of 13 px below the line top.
   */
  opensBlock?: boolean
  className?: string
}

/**
 * FigCraft's bulleted text lines: a 5 px dot 1 px in, text indented 21 px. The dot is placed for
 * 14 px text on 27 px lines inside a `text-box-cap` block (one FigCraft text box), where the items
 * themselves are not trimmed.
 */
export function BulletList({ items, opensBlock = false, className }: BulletListProps) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            'relative pl-5.25 before:absolute before:top-3.25 before:left-px before:size-1.25 before:rounded-full before:bg-current',
            opensBlock && 'first:before:top-1',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
