import { Container } from '@/components/layout/Container'

/**
 * Main Content: the statement (h1) and the paragraph. Desktop places them on the 12-column grid
 * (statement columns 2–10, paragraph 6–10); tablet starts at 82 px (Home uses 84, design-notes G12).
 */
export function Intro() {
  return (
    <Container className="pt-25 md:pt-32.5 md:pl-20.5 lg:grid lg:grid-cols-11 lg:gap-x-5 lg:pt-52 lg:pl-col-2">
      <h1
        data-reveal="lines"
        className="font-gloock text-header-xs text-gray-950 md:max-w-166.25 md:text-header-sm lg:col-span-9 lg:max-w-none lg:text-header-md"
      >
        We are here to help you find the perfect property that matches your needs and aspirations.
      </h1>
      <p
        data-reveal="up"
        data-design-contrast
        className="mt-20.75 pb-6.75 text-body-xs-regular text-gray-400 md:mt-9.25 md:max-w-143 lg:col-span-5 lg:col-start-5 lg:mt-15 lg:max-w-none"
      >
        {/* placeholder: lorem ipsum as designed. The design text ends with a line break, an empty
            last line: the bottom padding reproduces its height (one 27 px line). */}
        Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
        lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
        lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut
        rhoncus ex. Suspendisse ac rhoncus nisl, eu
      </p>
      <hr className="mt-25 border-gray-300 md:mt-32.5 lg:col-span-11 lg:mt-54.75" />
    </Container>
  )
}
