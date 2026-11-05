import { Fragment, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Slash } from './Slash'

/**
 * Items framed by slash rules: "/ Home / About / … /". `slashClassName` colours each rule; a
 * function receives the index of the rule (0 = before the first item) so rules next to the
 * active item can differ, as in the navbar. `inline` renders a plain row (no list) for widgets
 * whose items must be direct children, such as a tablist.
 */
type SlashListProps = Omit<ComponentProps<'ul'>, 'children'> & {
  items: ReactNode[]
  slashClassName?: string | ((index: number) => string)
  inline?: boolean
}

export function SlashList({
  items,
  slashClassName,
  inline = false,
  className,
  ...props
}: SlashListProps) {
  const ruleClass = (i: number) =>
    typeof slashClassName === 'function' ? slashClassName(i) : slashClassName
  if (inline) {
    return (
      <div className={cn('flex items-center', className)} {...(props as ComponentProps<'div'>)}>
        {items.map((item, i) => (
          <Fragment key={i}>
            <Slash className={cn('shrink-0', ruleClass(i))} />
            {item}
          </Fragment>
        ))}
        <Slash className={cn('shrink-0', ruleClass(items.length))} />
      </div>
    )
  }
  return (
    <ul className={cn('flex items-center', className)} {...props}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <li aria-hidden="true" className={cn('flex', ruleClass(i))}>
            <Slash />
          </li>
          <li className="flex items-center">{item}</li>
        </Fragment>
      ))}
      <li aria-hidden="true" className={cn('flex', ruleClass(items.length))}>
        <Slash />
      </li>
    </ul>
  )
}
