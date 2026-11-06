import type { ComponentProps } from 'react'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { cn } from '@/lib/cn'
import type { SelectOption } from './Select'

/** The select inside a TextField of type "with Dropdown" (e.g. Loan Terms · Year). */
type FieldSelectProps = Omit<ComponentProps<'select'>, 'size'> & {
  /** Accessible name, e.g. "Loan term unit". */
  label: string
  options: SelectOption[]
}

/**
 * Item text and chevron share the field's state, as in the Input set (12820, with Dropdown): Gray/200
 * while the field is empty, Gray/400 once it has a value, Gray/950 while the field or the select has
 * focus. The select is as wide as the chosen item (16 + text + 16 + 24 + 16 px), not its longest option.
 * Browsers centre the line box, FigCraft the cap height: the content box sits 2 px high to match.
 */
export function FieldSelect({ label, options, className, ...props }: FieldSelectProps) {
  return (
    // The empty state's Gray/200 is the design's placeholder colour, a known contrast exception (G4).
    <span
      data-design-contrast
      className={cn(
        'relative flex h-10 shrink-0 items-center text-gray-200 line-l-gray-300 backdrop-blur-xl',
        'group-focus-within:text-gray-950 group-[:has(input:not(:placeholder-shown)):not(:focus-within)]:text-gray-400',
        className,
      )}
    >
      <select
        aria-label={label}
        className="field-sizing-content h-full cursor-pointer appearance-none bg-transparent pt-1.5 pr-14 pb-2.5 pl-4 text-body-sm-regular outline-none"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-gray-950">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4" />
    </span>
  )
}
