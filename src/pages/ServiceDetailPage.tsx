import { useParams } from 'react-router'
import { serviceFaqs } from '@/data/faqs'
import { serviceDetails } from '@/data/serviceDetails'
import { cn } from '@/lib/cn'
import { ServiceFeature } from '@/sections/service-detail/ServiceFeature'
import { ServiceHero } from '@/sections/service-detail/ServiceHero'
import { ServiceHighlight } from '@/sections/service-detail/ServiceHighlight'
import { serviceLayouts } from '@/sections/service-detail/serviceLayouts'
import { CtaBanner } from '@/sections/shared/CtaBanner'
import { FaqSection } from '@/sections/shared/FaqSection'
import NotFoundPage from './NotFoundPage'

/**
 * Service pages: one template, content from src/data/serviceDetails.ts, per-page layout differences
 * from serviceLayouts.ts. Frames (1440 / 768 / 425): Property Management 9507 / 8938 / 11573,
 * Investment Opportunities 9685 / 9095 / 11731, Real Estate Consultation 9863 / 9252 / 11888.
 */
export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = serviceDetails[slug]
  const layout = serviceLayouts[slug]
  if (!service || !layout) return <NotFoundPage />
  const [first, second] = service.features
  const { cta } = service
  return (
    <div className="relative">
      <title>{`${service.name} – Bumi`}</title>
      <meta name="description" content={service.metaDescription} />
      <ServiceHero
        title={service.hero.title}
        description={service.hero.description}
        layout={layout.hero}
      />
      {/* Strokes: one between blocks, two adjoining ones under the second feature (design-notes PM8). */}
      <ServiceFeature
        feature={first}
        layout="center"
        lead={layout.featureLead}
        widths={layout.features[0]}
        className="line-t-gray-200"
      />
      <ServiceHighlight
        highlight={service.highlight}
        layout={layout.highlight}
        className="line-t-gray-200"
      />
      <ServiceFeature
        feature={second}
        layout="spread"
        lead={layout.featureLead}
        widths={layout.features[1]}
        className="line-y-gray-200"
      />
      <FaqSection
        faqs={serviceFaqs}
        className={layout.faq.content}
        sectionClassName={layout.faq.section}
      />
      <CtaBanner
        heading={
          <>
            {cta.heading}
            {cta.headingDesktop && <span className="max-lg:hidden"> {cta.headingDesktop}</span>}
          </>
        }
        cta={cta.label}
        to={cta.to}
        className={layout.cta.section}
        headingClassName={layout.cta.heading}
        // A medium button at every width.
        buttonClassName="lg:h-14 lg:gap-4 lg:p-4"
      />
      {layout.rule && (
        <div
          aria-hidden="true"
          className={cn('absolute inset-x-0 mx-auto max-w-frame overflow-hidden', layout.rule.box)}
        >
          <div className={cn('h-px w-320.5 bg-default-stroke', layout.rule.line)} />
        </div>
      )}
    </div>
  )
}
