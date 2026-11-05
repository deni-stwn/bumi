import { Hero } from '@/sections/properties/Hero'
import { Listings } from '@/sections/properties/Listings'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/** Properties: frames 3683 (1440), 3479 (768) and 3880 (425). */
export default function PropertiesPage() {
  return (
    <>
      <title>Properties – Bumi</title>
      <meta
        name="description"
        content="Find your dream property: residential, commercial or vacation homes selected by Bumi."
      />
      <Hero />
      <Listings />
      <CtaBanner
        heading="Ready to Find Your Perfect Property?"
        cta="Contact Us Now"
        to="/contact"
        // Mobile frame is a fixed 500 px with the heading centred.
        className="max-md:flex max-md:min-h-125 max-md:flex-col max-md:justify-center"
      />
    </>
  )
}
