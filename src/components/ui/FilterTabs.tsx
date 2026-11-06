import { useRef, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { SlashList } from './SlashList'

/**
 * Category tabs. `slash` (default): "/ All / Residential / …" in Body/MD/Semibold, active Gray/950,
 * idle Gray/200. `display`: large Gloock Header/MD words 32 px apart, idle Gray/100 (desktop
 * Properties). `underline`: 56 px Body/XS/Bold tabs, active Gray/950 with a 1 px underline, idle
 * Gray/400 (Market Trends); each option can set its width. A tablist: arrow keys move between tabs,
 * the panel is the element with `panelId`.
 */
type FilterTabsProps<V extends string> = {
  label: string
  options: readonly { value: V; label: string; className?: string }[]
  value: V
  onChange: (value: V) => void
  panelId: string
  variant?: 'slash' | 'display' | 'underline'
  className?: string
}

export function FilterTabs<V extends string>({
  label,
  options,
  value,
  onChange,
  panelId,
  variant = 'slash',
  className,
}: FilterTabsProps<V>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (i + step + options.length) % options.length
    onChange(options[next].value)
    refs.current[next]?.focus()
  }
  const display = variant === 'display'
  const underline = variant === 'underline'
  const tabs = options.map((o, i) => {
    const selected = o.value === value
    return (
      <button
        key={o.value}
        ref={(el) => {
          refs.current[i] = el
        }}
        type="button"
        role="tab"
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        onClick={() => onChange(o.value)}
        onKeyDown={(e) => onKeyDown(e, i)}
        className={cn(
          'whitespace-nowrap transition-colors duration-200 ease-out',
          underline && 'flex h-14 shrink-0 items-center justify-center px-8',
          selected
            ? cn('text-gray-950', underline && 'line-b-gray-950')
            : display
              ? 'text-gray-100 hover:text-gray-950'
              : underline
                ? 'text-gray-400 hover:text-gray-950'
                : 'text-gray-200 hover:text-gray-950',
          o.className,
        )}
      >
        {o.label}
      </button>
    )
  })
  if (underline) {
    return (
      <div
        role="tablist"
        aria-label={label}
        data-design-contrast
        className={cn('flex text-body-xs-bold', className)}
      >
        {tabs}
      </div>
    )
  }
  if (display) {
    return (
      <div
        role="tablist"
        aria-label={label}
        data-design-contrast
        className={cn('flex items-center gap-8 font-gloock text-header-md', className)}
      >
        {tabs}
      </div>
    )
  }
  return (
    <SlashList
      inline
      role="tablist"
      aria-label={label}
      data-design-contrast
      className={cn('gap-4 text-body-md-semibold', className)}
      slashClassName="text-gray-200"
      items={tabs}
    />
  )
}
