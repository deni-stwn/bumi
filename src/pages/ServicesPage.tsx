import { Intro } from '@/sections/services/Intro'
import { ServiceList } from '@/sections/services/ServiceList'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/** Services: frames 9349 (1440), 7131 (768) and 10042 (425). */
export default function ServicesPage() {
  return (
    <>
      <title>Services – Bumi</title>
      <meta
        name="description"
        content="Property management, real estate consultation and investment opportunities: tailored solutions from Bumi."
      />
      <Intro />
      <ServiceList />
      <CtaBanner
        heading="Professional team with a technology-driven approach."
        cta="Learn More"
        to="/about"
        // 200 px padding at every width. The design's desktop heading box (1273 px from x 63) put the
        // text 20 px left of the centred button; it is centred on the page now, so heading and button
        // share one axis (client revision, design-notes SV7).
        className="py-50 md:px-15.75"
        buttonClassName="lg:h-14 lg:gap-4 lg:p-4"
      />
    </>
  )
}
