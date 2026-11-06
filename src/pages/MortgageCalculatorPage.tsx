import { Container } from '@/components/layout/Container'
import { Calculator } from '@/sections/mortgage/Calculator'
import { PageIntro, type PageIntroLayout } from '@/sections/shared/PageIntro'

/** 64 px apart, Header/LG on tablet, a 377 px description; desktop row like the Selling Guide's. */
const introLayout: PageIntroLayout = {
  row: 'gap-16 xl:ml-auto xl:max-w-320 xl:gap-10 2xl:gap-34.75',
  title: 'md:text-header-lg xl:text-header-xl',
  description: 'w-94.25',
}

/** Mortgage Calculator: frames 6867 (1440), 7527 (768) and 10438 (425). */
export default function MortgageCalculatorPage() {
  return (
    <>
      <title>Mortgage Calculator – Bumi</title>
      <meta
        name="description"
        content="Discover how much your dream home will cost with just a few clicks. Our calculator helps you make better financial decisions."
      />
      {/* Tablet content starts at x 82; mobile puts 300 px under the intro and 100 px under the line
          (200 and 200 on tablet and desktop, design-notes MC1). */}
      <PageIntro
        title="Easily Calculate Your Home Loan Payments!"
        description="Discover how much your dream home will cost with just a few clicks. Our calculator helps you make better financial decisions."
        layout={introLayout}
        className="pb-75 md:pb-50 md:pl-20.5"
      />
      <Container className="md:pl-20.5">
        <hr className="border-gray-300 lg:ml-auto lg:max-w-320" />
      </Container>
      <Calculator />
    </>
  )
}
