import { DotIcon } from '@/components/icons/DotIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { resources } from '@/data/resources'

/**
 * "Explore Our Resources": the heading (a 236 px box, so it wraps after "Our") above the list, or to
 * its left on desktop with the 852 px list against the right margin. Each row has a Gray/300 bottom
 * stroke, 48 px above and below and 32 px on the right; the desktop list starts flush with the
 * heading (no top padding on the first row). Below tablet the nofill button drops under the text.
 */
export function ResourceList() {
  return (
    <section aria-labelledby="resources-list-title" className="py-25">
      <Container className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <h2
          id="resources-list-title"
          data-reveal="lines"
          className="w-59 shrink-0 font-gloock text-header-xs text-gray-950"
        >
          Explore Our Resources
        </h2>
        <ul data-reveal="stagger" className="flex flex-col lg:max-w-213 lg:min-w-0 lg:flex-1">
          {resources.map((resource) => (
            <li
              key={resource.to}
              className="flex flex-col items-start gap-6 py-12 pr-8 line-b-gray-300 md:flex-row md:items-center md:justify-between lg:items-start lg:first:pt-0"
            >
              <div className="flex flex-col gap-6 md:w-100 lg:w-auto lg:min-w-0 lg:flex-1">
                <h3 className="font-gloock text-header-xs text-gray-950">{resource.title}</h3>
                <p data-design-contrast className="text-body-xs-regular text-gray-400">
                  {resource.description}
                </p>
              </div>
              <ButtonLink to={resource.to} variant="ghost" size="md" iconRight={<DotIcon />}>
                {resource.cta}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
