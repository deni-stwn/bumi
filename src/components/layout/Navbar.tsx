import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { LogoMark } from '@/components/icons/LogoMark'
import { SlashList } from '@/components/ui/SlashList'
import { mainNav } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { useSurfaceTone } from '@/lib/useSurfaceTone'
import { Container } from './Container'
import { isActive } from './isActive'
import { MobileMenu } from './MobileMenu'
import { NavDropdown } from './NavDropdown'
import { navTone, type NavTone } from './navTone'

type NavbarProps = {
  tone: NavTone
  /** Over a hero photo: taken out of the flow, on top of the page's first section. */
  overlay?: boolean
  /** The tablet Home frame has no navbar (design-notes H1). */
  hideOnTablet?: boolean
}

/**
 * Navbar: desktop 1440 (components 18553 / 18585, 86 px) with the link row; tablet and mobile
 * (14916 / 14930 / 14944 / 14958, 82 px) with a "Menu" button that opens MobileMenu.
 * The logo (mark + "Bumi.") stays in the top-left corner while the page scrolls (revision, design-notes
 * G27): it sits in a fixed layer laid out like the navbar row, and turns white over photos and dark
 * fills, black elsewhere. The row keeps an empty slot of the logo's size, so nothing moves.
 */
export function Navbar({ tone, overlay = false, hideOnTablet = false }: NavbarProps) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const t = navTone[tone]
  const activeIndex = mainNav.findIndex((item) => isActive(item, pathname))
  const logo = useRef<HTMLAnchorElement>(null)
  const surface = useSurfaceTone(logo, tone === 'onImage' ? 'dark' : 'light')

  return (
    <header
      data-reveal="fade"
      className={cn(
        overlay ? 'absolute inset-x-0 top-0 z-30' : 'relative z-30',
        hideOnTablet && 'md:max-lg:hidden',
      )}
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30">
        <Container
          layout="full"
          className="flex items-center gap-5 py-6 lg:grid lg:grid-cols-12 lg:gap-x-gutter"
        >
          <Link
            ref={logo}
            to="/"
            className={cn(
              'pointer-events-auto flex items-center gap-5 transition-colors duration-300 ease-out lg:col-span-2 lg:grid lg:grid-cols-subgrid',
              navTone[surface === 'dark' ? 'onImage' : 'onLight'].brand,
            )}
          >
            <LogoMark className="h-8.5 w-10.5 lg:h-9.5 lg:w-12" />
            <span className="font-gloock text-header-xxs whitespace-nowrap lg:text-header-xs">
              Bumi.
            </span>
          </Link>
        </Container>
      </div>
      <Container
        layout="full"
        className="flex items-center gap-5 py-6 lg:grid lg:grid-cols-12 lg:gap-x-gutter"
      >
        {/* The logo's place in the row (it is drawn by the fixed layer above). */}
        <span aria-hidden="true" className="h-8.5 lg:col-span-2 lg:h-9.5" />

        <nav
          aria-label="Main"
          className="ml-auto lg:col-span-10 lg:col-start-3 lg:justify-self-end"
        >
          {/* Idle links are Black/White Variable 50 in the design (design-notes G4). */}
          <SlashList
            data-design-contrast
            className="hidden gap-4 text-body-xs-regular lg:flex"
            slashClassName={(i) =>
              activeIndex >= 0 && (i === activeIndex || i === activeIndex + 1)
                ? t.ruleActive
                : t.rule
            }
            items={mainNav.map((item, i) => {
              const active = i === activeIndex
              const linkClass = cn(
                'transition-colors duration-200 ease-out',
                active ? cn('text-body-xs-bold', t.active) : t.idle,
              )
              return item.children ? (
                <NavDropdown key={item.to} item={item} className={linkClass} />
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              )
            })}
          />
          <SlashList
            className={cn('gap-4 text-body-xs-regular lg:hidden', t.menu)}
            slashClassName={t.menuRule}
            items={[
              <button
                key="menu"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="flex items-center gap-2"
              >
                Menu
                <ChevronDownIcon />
              </button>,
            ]}
          />
        </nav>
      </Container>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
