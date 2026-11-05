import { Fragment, useId } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { partners } from '@/data/home'

/**
 * "We can't go this far without great partner": four 307×157 Gray/50 cards (a row on desktop, a
 * horizontal scroller below). Rules above (tablet/mobile) and below (all) the block.
 */
export function Partners() {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col items-start gap-25 lg:py-25">
        <hr className="w-full border-gray-300 lg:hidden" />
        <h2
          id={titleId}
          data-reveal="lines"
          className="max-w-138 font-gloock text-header-xs text-gray-950 md:text-header-sm"
        >
          We can’t go this far without great partner
        </h2>
        <ul
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scroller with no focusable content must be keyboard reachable (WCAG 2.1.1)
          tabIndex={0}
          aria-label="Partners"
          data-reveal="stagger"
          className="-mr-gutter scrollbar-none flex snap-x gap-4.5 self-stretch overflow-x-auto pr-gutter lg:mr-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pr-0"
        >
          {partners.map(({ name, lines, Logo }) => (
            <li
              key={name}
              className="flex h-39.25 w-76.75 shrink-0 snap-start items-center justify-center bg-gray-50 md:max-lg:rounded-corner-m lg:w-auto lg:rounded-corner-l"
            >
              <span className="flex items-center gap-4 text-gray-950">
                <Logo />
                {/* One text box with line breaks, like the design (2 lines = 40.8 px with the trim). */}
                <span className="font-alexandria text-body-md-regular leading-none">
                  {lines.map((l, i) => (
                    <Fragment key={l}>
                      {i > 0 && <br />}
                      {l}
                    </Fragment>
                  ))}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <ButtonLink
          to="/contact"
          variant="ghost"
          size="md"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="lg:h-18 lg:gap-2 lg:p-6"
        >
          Become our partner
        </ButtonLink>
        <hr className="w-full border-gray-300" />
      </Container>
    </section>
  )
}
