import { Container } from '@/components/layout/Container'

type GuideHeroProps = { title: string; description: string }

/**
 * Page title and description. Mobile and tablet stack them 64 px apart (Header/MD, Header/LG); desktop
 * puts the 688 px Header/XL title and the 377 px description side by side, bottom-aligned, 143 px
 * apart. That row is 1208 px wide and the title's longest word ("Property") is 520 px, so it starts at
 * `xl`; 1024–1279 keeps the tablet layout (design-notes BG1).
 */
export function GuideHero({ title, description }: GuideHeroProps) {
  return (
    <Container
      as="section"
      aria-labelledby="guide-title"
      className="flex flex-col gap-16 py-50 xl:flex-row xl:items-end xl:gap-35.75"
    >
      {/* Tablet draws the title box 688 px wide in a 664 px column; the column width gives the same
          line breaks without overflowing the page. */}
      <h1
        id="guide-title"
        data-reveal="lines"
        className="font-gloock text-header-md text-gray-950 md:max-w-172 md:text-header-lg xl:w-172 xl:min-w-0 xl:text-header-xl"
      >
        {title}
      </h1>
      <p
        data-reveal="up"
        data-design-contrast
        className="text-body-xs-regular text-gray-400 md:w-94.25 md:max-w-full xl:shrink-0"
      >
        {description}
      </p>
    </Container>
  )
}
