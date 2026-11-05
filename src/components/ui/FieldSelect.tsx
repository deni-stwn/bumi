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

export function FieldSelect({ label, options, className, ...props }: FieldSelectProps) {
  return (
    <span
      className={cn(
        'relative flex h-10 shrink-0 items-center line-l-gray-300 backdrop-blur-xl',
        className,
      )}
    >
      <select
        aria-label={label}
        className="h-full cursor-pointer appearance-none bg-transparent py-2 pr-14 pl-4 text-body-sm-regular text-gray-200 outline-none focus:text-gray-950"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-gray-950">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 text-gray-950" />
    </span>
  )
}
