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
        // 200 px padding at every width; the desktop heading box is 1273 px from x 63, so its centred
        // text sits 20 px left of the page centre while the button is centred (design-notes SV7).
        className="py-50 md:px-15.75 lg:pr-26 lg:pl-15.75"
        buttonClassName="lg:h-14 lg:gap-4 lg:p-4"
      />
    </>
  )
}
