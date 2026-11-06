import { ContactForm } from '@/sections/contact/ContactForm'
import { PageIntro, type PageIntroLayout } from '@/sections/shared/PageIntro'

/**
 * A 447 px title box ("Get in / Touch / with Us", Header/XL from tablet), 64 px above the 377 px
 * description; desktop puts them side by side from grid column 2, 395 px apart.
 */
const introLayout: PageIntroLayout = {
  row: 'gap-16 xl:gap-10 2xl:gap-98.75',
  title: 'md:max-w-111.75 md:text-header-xl xl:w-111.75',
  description: 'w-94.25',
}

const description =
  'Whether you’re buying, selling, or exploring investment opportunities, our team is ready to assist you every step of the way. Fill out the form below, or reach out to us directly through the contact details provided. Let’s make your property journey smooth and successful!'

/** Contact: frames 6695 (1440), 7378 (768) and 10289 (425). */
export default function ContactPage() {
  return (
    <>
      <title>Contact Us – Bumi</title>
      <meta name="description" content={description} />
      {/* The frame stacks navbar, intro, form and footer 6 px apart (design-notes CT1). */}
      <PageIntro
        title="Get in Touch with Us"
        description={description}
        layout={introLayout}
        className="mt-1.5"
      />
      <ContactForm />
    </>
  )
}
