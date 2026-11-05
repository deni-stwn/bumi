import { Container } from '@/components/layout/Container'
import { propertyDetail } from '@/data/propertyDetail'
import { Facilities } from '@/sections/property-detail/Facilities'
import { Gallery } from '@/sections/property-detail/Gallery'
import { Hero } from '@/sections/property-detail/Hero'
import { Overview } from '@/sections/property-detail/Overview'
import { Related } from '@/sections/property-detail/Related'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/**
 * Property detail: frames 5941 (1440), 5108 (768) and 6263 (425). The design has one detail, shown
 * for every listing (placeholder).
 */
export default function PropertyDetailPage() {
  return (
    <>
      <title>{`${propertyDetail.title} – Bumi`}</title>
      <meta
        name="description"
        content="A five-bedroom family home in Greenfield Estates: specification, nearby facilities and gallery."
      />
      <Hero />
      <Container as="article" className="flex flex-col gap-25 py-25 md:pl-20.5 lg:pl-col-2">
        <Overview />
        <Facilities />
        <Gallery />
      </Container>
      <CtaBanner
        heading="Ready to move and get your dream Property ?"
        cta="Contact Us Now"
        to="/contact"
        className="md:px-20.75 lg:py-25"
      />
      <Related />
    </>
  )
}
