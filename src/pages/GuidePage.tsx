import { useParams } from 'react-router'
import { Container } from '@/components/layout/Container'
import { guides } from '@/data/guides'
import { GuideSection } from '@/sections/guide/GuideSection'
import { guideLayouts } from '@/sections/guide/guideLayouts'
import { PageIntro } from '@/sections/shared/PageIntro'
import NotFoundPage from './NotFoundPage'

/**
 * Buyer and Selling Guide: one template, content from src/data/guides.ts (design-notes R1).
 * Frames (1440 / 768 / 425): Buyer Guide 7047 / 7686 / 10598, Selling Guide 8321 / 7749 / 10995.
 */
export default function GuidePage() {
  const { guide: slug = '' } = useParams()
  const guide = guides[slug]
  const layout = guideLayouts[slug]
  if (!guide || !layout) return <NotFoundPage />
  return (
    <>
      <title>{`${guide.name} – Bumi`}</title>
      <meta name="description" content={guide.metaDescription} />
      <PageIntro title={guide.title} description={guide.description} layout={layout} />
      <Container className="py-25">
        {/* Desktop rows are 1280 px wide against the right margin (x 140 at 1440). Each row has a
            centred stroke above and below, so neighbours share one line. */}
        <div className="lg:ml-auto lg:max-w-320">
          {guide.topics.map((topic) => (
            <GuideSection
              key={topic.title}
              topic={topic}
              className="line-b-gray-300 first:line-y-gray-300"
            />
          ))}
        </div>
      </Container>
    </>
  )
}
