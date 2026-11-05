import { useSearchParams } from 'react-router'
import { Results } from '@/sections/properties-search/Results'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/** Properties search results: frames 5511 (1440), 4701 (768) and 5739 (425). */
export default function PropertiesSearchPage() {
  const [params] = useSearchParams()
  return (
    <>
      <title>{`Result for ${params.get('city') ?? 'Alabama'} – Bumi`}</title>
      <meta
        name="description"
        content="Properties matching your search, from Bumi's residential, commercial and vacation listings."
      />
      {/* Remount on a new search so filters and page reset. */}
      <Results key={params.toString()} params={params} />
      <CtaBanner
        heading="Ready to Find Your Perfect Property?"
        cta="Contact Us Now"
        to="/contact"
        // Tablet and mobile frames are a fixed 500 px with the heading centred (on tablet the heading is
        // absolutely placed, so the frame does not grow with it).
        className="max-lg:flex max-lg:min-h-125 max-lg:flex-col max-lg:justify-center md:max-lg:h-125 md:max-lg:py-0"
      />
    </>
  )
}
