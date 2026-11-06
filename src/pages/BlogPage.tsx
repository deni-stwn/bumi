import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { scrollToSection } from '@/lib/useSmoothAnchors'
import { Hero } from '@/sections/blog/Hero'
import { LatestArticles } from '@/sections/blog/LatestArticles'
import { PopularArticles } from '@/sections/blog/PopularArticles'
import { CtaBanner } from '@/sections/shared/CtaBanner'

/** Blog: frames 4351 (1440), 4041 (768) and 4901 (425). */
export default function BlogPage() {
  const [query, setQuery] = useState('')
  const search = (q: string) => {
    setQuery(q)
    // Let the results render, then glide to them.
    requestAnimationFrame(() => scrollToSection('latest-articles'))
  }
  return (
    <>
      <title>Articles & Blog – Bumi</title>
      <meta
        name="description"
        content="Stay informed with the latest property market news, buying and selling guides, and expert advice to make smarter decisions."
      />
      <Hero onSearch={search} />
      {/* Desktop: a 1286 px column against the right margin (x 134); tablet from x 84. */}
      <Container className="py-25 lg:pl-gutter">
        <div className="flex flex-col gap-25 lg:ml-auto lg:max-w-321.5">
          <PopularArticles />
          <LatestArticles query={query} />
        </div>
      </Container>
      <CtaBanner
        heading="Ready to Find Your Perfect Property?"
        cta="Contact Us Now"
        to="/contact"
        // 200 px above and below at every width; tablet keeps the 128 px heading and 83 px sides;
        // the desktop button is the medium one (design-notes BL5).
        className="py-50 md:px-20.75"
        headingClassName="md:text-header-xl"
        buttonClassName="lg:h-14 lg:gap-4 lg:p-4"
      />
    </>
  )
}
