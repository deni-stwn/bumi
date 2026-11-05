import { useId, useState, type ComponentProps } from 'react'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { cn } from '@/lib/cn'

export type SelectOption = { value: string; label: string }

/**
 * Dropdown component set (15084): `Mode` → `tone`, `Size` Large / Small, `Type` Underlined / Noline
 * → `underline`, `State` Disabled → the native `disabled`. A native <select> (invisible, over the field):
 * the open list is the browser's own, since the design has no open state.
 */
type SelectProps = Omit<ComponentProps<'select'>, 'size'> & {
  label: string
  hideLabel?: boolean
  /** lg / sm: the Dropdown component; md: the tablet results filter (Body/XS value, 56 px field). */
  size?: 'lg' | 'md' | 'sm'
  tone?: 'light' | 'dark'
  underline?: boolean
  options: SelectOption[]
}

// The value sits vertically centred in a fixed 24 px box in the design (cap 17.3 / 11.5 px → 3 / 6 px
// offset); the field is 56 / 40 px tall with the padding.
const sizes = {
  lg: {
    label: 'text-body-xs-light',
    field: 'py-4',
    value: 'text-body-md-semibold',
    offset: 'pt-0.75',
  },
  md: {
    label: 'text-body-xs-light',
    field: 'py-4',
    value: 'text-body-xs-semibold',
    offset: 'pt-1.75',
  },
  sm: {
    label: 'text-body-xxs-semibold',
    field: 'py-2',
    value: 'text-body-sm-semibold',
    offset: 'pt-1.5',
  },
} as const

const tones = {
  light: {
    lg: { label: 'text-neutral-black', value: 'text-neutral-black' },
    md: { label: 'text-neutral-black', value: 'text-neutral-black' },
    sm: { label: 'text-black-variable-40', value: 'text-neutral-black' },
    line: 'line-b-black-variable-40 has-disabled:line-b-black-variable-30',
    disabled: 'group-has-disabled:text-black-variable-30',
  },
  dark: {
    lg: { label: 'text-neutral-white', value: 'text-neutral-white' },
    md: { label: 'text-neutral-white', value: 'text-neutral-white' },
    sm: { label: 'text-white-variable-40', value: 'text-neutral-white' },
    line: 'line-b-white-variable-50 has-disabled:line-b-white-variable-40',
    disabled: 'group-has-disabled:text-white-variable-40',
  },
} as const

export function Select({
  label,
  hideLabel = false,
  size = 'lg',
  tone = 'light',
  underline = true,
  options,
  id,
  className,
  value,
  defaultValue,
  onChange,
  ...props
}: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  const s = sizes[size]
  const t = tones[tone]
  // The shown value is plain text (a native select clips and centres its own text, which can't match
  // the design's trimmed 24 px box); the native select sits invisibly on top for every interaction.
  const [own, setOwn] = useState(String(defaultValue ?? options[0]?.value ?? ''))
  const current = value !== undefined ? String(value) : own
  const shown = options.find((o) => o.value === current)?.label ?? ''
  return (
    <div className={cn('group flex flex-col gap-1', className)}>
      <label
        htmlFor={selectId}
        className={cn(s.label, t[size].label, t.disabled, hideLabel && 'sr-only')}
      >
        {label}
      </label>
      <div
        className={cn(
          'relative flex items-start justify-between gap-2.5 backdrop-blur-xl has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-current',
          s.field,
          underline && t.line,
          t[size].value,
        )}
      >
        <span
          aria-hidden="true"
          className={cn('block h-6 min-w-0 whitespace-nowrap', s.offset, s.value, t.disabled)}
        >
          {shown}
        </span>
        <ChevronDownIcon className={cn('pointer-events-none shrink-0', t.disabled)} />
        <select
          id={selectId}
          value={current}
          onChange={(e) => {
            setOwn(e.target.value)
            onChange?.(e)
          }}
          className="absolute inset-0 size-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
