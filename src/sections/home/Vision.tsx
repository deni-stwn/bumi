import { useId } from 'react'
import { Link } from 'react-router'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { homeServices } from '@/data/home'

/**
 * "Your Vision, Our Expertise.": three 291 px service cards with Gray/100 rules (a row on desktop,
 * a horizontal scroller on tablet, stacked on mobile). The closing rule runs to the frame edge on tablet.
 */
export function Vision() {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col items-start gap-25 py-25">
        <h2
          id={titleId}
          data-reveal="lines"
          className="font-gloock text-header-sm text-gray-950 md:max-lg:max-w-150.25"
        >
          Your Vision, Our Expertise.
        </h2>
        <ul
          data-reveal="stagger"
          className="flex flex-col self-stretch md:-mr-gutter md:scrollbar-none md:flex-row md:overflow-x-auto md:pr-gutter lg:mr-0 lg:overflow-visible lg:pr-0"
        >
          {homeServices.map((s) => (
            <li
              key={s.title}
              className="relative flex h-72.75 shrink-0 flex-col justify-between gap-7 p-6 inset-ring inset-ring-gray-100 not-first:-mt-px md:w-106.75 md:not-first:mt-0 md:not-first:-ml-px lg:w-auto lg:flex-1"
            >
              <div className="flex flex-col gap-8">
                <h3 className="max-w-60 font-gloock text-header-xs text-gray-950">{s.title}</h3>
                <p data-design-contrast className="text-body-xs-regular text-gray-400">
                  {s.description}
                </p>
              </div>
              <Link
                to={s.to}
                className="flex items-center justify-between text-body-xs-regular text-gray-950 after:absolute after:inset-0 hover:underline"
              >
                View Details
                <ArrowRightIcon />
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink
          to="/services"
          variant="ghost"
          size="lg"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="max-md:w-full max-md:justify-start"
        >
          Learn More
        </ButtonLink>
        <hr className="self-stretch border-gray-300 md:max-lg:-mr-gutter" />
      </Container>
    </section>
  )
}
