import { Consultation } from '@/sections/home/Consultation'
import { Hero } from '@/sections/home/Hero'
import { Insights } from '@/sections/home/Insights'
import { Partners } from '@/sections/home/Partners'
import { Properties } from '@/sections/home/Properties'
import { Stories } from '@/sections/home/Stories'
import { Vision } from '@/sections/home/Vision'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/** Home: frames 2807 (Landing, 1440), 10661 (768) and 11994 (425). */
export default function HomePage() {
  return (
    <>
      <title>Bumi – Find Your Perfect Home Today</title>
      <meta
        name="description"
        content="Bumi is a trusted property agency connecting you with the best opportunities in the market: residential, commercial and vacation properties."
      />
      <Hero />
      <Properties />
      <Consultation />
      <Partners />
      <Vision />
      <Insights />
      <Stories />
      <CtaBanner
        heading="Ready to Find Your Perfect Property?"
        cta="Contact Us Now"
        to="/contact"
        // Home: 123 px padding on tablet/mobile; the desktop button sits at x 594 of 1440 (design-notes H13).
        className="py-30.75"
        buttonClassName="lg:right-auto lg:left-[41.25%] lg:ml-0"
      />
    </>
  )
}
