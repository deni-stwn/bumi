import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import type { NavItem } from '@/data/navigation'
import { cn } from '@/lib/cn'

/**
 * A navbar item with sub-pages. The open panel is not in the design (design-notes G5): a small white
 * panel with the navbar's link style. Closes on Escape, outside click, focus leaving and on choosing a link.
 */
type NavDropdownProps = { item: NavItem; className: string }

export function NavDropdown({ item, className }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn('flex items-center gap-2 transition-colors duration-200 ease-out', className)}
      >
        {item.label}
        <ChevronDownIcon
          className={cn('transition-transform duration-200 ease-out', open && 'rotate-180')}
        />
      </button>
      <ul
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 z-30 mt-4 flex min-w-56 flex-col gap-4 rounded-corner-m bg-neutral-white p-5 inset-ring inset-ring-gray-100"
      >
        {item.children?.map((child) => (
          <li key={child.to}>
            <Link
              to={child.to}
              onClick={() => setOpen(false)}
              aria-current={pathname === child.to ? 'page' : undefined}
              className="block text-body-xs-regular whitespace-nowrap text-gray-950 hover:underline aria-[current=page]:text-body-xs-bold"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
