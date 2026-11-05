import { useId, type ComponentProps, type ReactNode } from 'react'
import { InfoCircleIcon } from '@/components/icons/InfoCircleIcon'
import { cn } from '@/lib/cn'

/** Input component set (12820): `size` large / medium / small, `mode` light / dark → `tone`. */
type TextFieldProps = Omit<ComponentProps<'input'>, 'size'> & {
  /** Every field has a label; pages in the design hide it ("Show Label" off), so it is screen-reader only. */
  label: string
  hideLabel?: boolean
  size?: 'lg' | 'md' | 'sm'
  /** `dark` sits on a photo. */
  tone?: 'light' | 'dark'
  /** "Show Helper". */
  helper?: ReactNode
  /** Not in the design (design-notes G9): underline and helper turn Danger/500. */
  error?: string
  /** "Type: with Dropdown": the select at the end of the field (`FieldSelect`). */
  suffix?: ReactNode
}

const sizes = {
  lg: {
    label: 'text-body-sm-regular',
    form: 'gap-4',
    row: 'py-6 pr-2',
    withSuffix: 'py-3.5',
    text: 'text-body-sm-regular',
  },
  md: {
    label: 'text-body-sm-regular',
    form: 'gap-2',
    row: 'py-4 pr-2',
    withSuffix: 'py-1.5',
    text: 'text-body-sm-regular',
  },
  sm: {
    label: 'text-body-xs-regular',
    form: 'gap-2',
    row: 'py-4',
    withSuffix: 'py-1.5',
    text: 'text-body-xs-regular',
  },
} as const

// States: regular, disabled, inputed (has a value, not focused), active (focused).
const tones = {
  light: {
    label: 'text-gray-950 group-has-disabled:text-gray-200',
    row: 'line-b-gray-300 focus-within:line-b-gray-950 has-disabled:line-b-gray-200',
    input: 'text-gray-400 placeholder:text-gray-200 focus:text-gray-950',
    helper: 'text-gray-400 group-has-disabled:text-gray-200',
  },
  dark: {
    label: 'text-neutral-white group-has-disabled:text-white-variable-80',
    row: cn(
      'line-b-white-variable-70 has-[input:not(:placeholder-shown)]:line-b-white-variable-40',
      'focus-within:line-b-neutral-white has-disabled:line-b-white-variable-80',
    ),
    input:
      'text-white-variable-30 placeholder:text-white-variable-70 focus:text-neutral-white disabled:text-white-variable-80',
    helper: 'text-neutral-white group-has-disabled:text-white-variable-80',
  },
} as const

export function TextField({
  label,
  hideLabel = false,
  size = 'lg',
  tone = 'light',
  helper,
  error,
  suffix,
  id,
  className,
  ...props
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const helperId = `${inputId}-helper`
  const s = sizes[size]
  const t = tones[tone]
  const message = error ?? helper
  return (
    <div className={cn('group flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className={cn(s.label, t.label, hideLabel && 'sr-only')}>
        {label}
      </label>
      <div className={cn('flex flex-col', s.form)}>
        <div
          className={cn(
            'flex items-center gap-2.5 transition-shadow duration-200 ease-out',
            suffix ? s.withSuffix : s.row,
            t.row,
            error && 'line-b-danger-500 focus-within:line-b-danger-500',
          )}
        >
          <input
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? helperId : undefined}
            className={cn(
              // Inputs ignore text-box trim: the content box is fixed at the cap height (12 px, 11.9 in the
              // design) and 8 px padding cancelled by a negative margin keeps the glyphs unclipped.
              '-my-2 box-content h-3 min-w-0 flex-1 bg-transparent py-2 outline-none disabled:cursor-not-allowed',
              s.text,
              t.input,
            )}
            {...props}
          />
          {suffix}
        </div>
        {message ? (
          <p
            id={helperId}
            className={cn(
              'flex items-center gap-1 text-body-xs-regular',
              error ? 'text-danger-500' : t.helper,
            )}
          >
            <InfoCircleIcon width={16} height={16} />
            {message}
          </p>
        ) : null}
      </div>
    </div>
  )
}
