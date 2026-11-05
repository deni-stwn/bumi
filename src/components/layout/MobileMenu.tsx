import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { LogoMark } from '@/components/icons/LogoMark'
import { SlashList } from '@/components/ui/SlashList'
import { mainNav } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { Container } from './Container'
import { isActive } from './isActive'

/**
 * Tablet and mobile menu. Not in the design (design-notes G5): a full-screen dialog in the style of the
 * footer's link list. A native <dialog> gives the focus trap, Escape and an inert page behind it.
 */
type MobileMenuProps = { open: boolean; onClose: () => void }

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
    document.documentElement.classList.toggle('overflow-hidden', open)
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  return (
    <dialog
      ref={dialog}
      aria-label="Menu"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-neutral-white text-gray-950 backdrop:bg-transparent lg:hidden"
    >
      <Container layout="full" className="flex items-center gap-5 py-6">
        <Link to="/" onClick={onClose} className="flex items-center gap-5 text-neutral-black">
          <LogoMark className="h-8.5 w-10.5" />
          <span className="font-gloock text-header-xxs">Bumi.</span>
        </Link>
        <SlashList
          className="ml-auto gap-4 text-body-xs-regular text-neutral-black"
          slashClassName="text-black-variable-30"
          items={[
            <button key="close" type="button" onClick={onClose}>
              Close
            </button>,
          ]}
        />
      </Container>
      <nav aria-label="Main" className="px-gutter pt-25 pb-25">
        <ul className="flex flex-col items-center gap-6 text-center">
          {mainNav.map((item) => {
            const active = isActive(item, pathname)
            return (
              <li key={item.to} className="flex flex-col items-center gap-4">
                <Link
                  to={item.to}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'font-gloock text-header-sm uppercase md:text-header-md',
                    active ? 'text-gray-950' : 'text-gray-400 hover:text-gray-950',
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <SlashList
                    className="flex-wrap justify-center gap-2 text-body-xs-regular text-gray-400"
                    slashClassName="text-gray-200"
                    items={item.children.slice(1).map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={onClose}
                        className="hover:text-gray-950"
                      >
                        {child.label}
                      </Link>
                    ))}
                  />
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>
    </dialog>
  )
}
