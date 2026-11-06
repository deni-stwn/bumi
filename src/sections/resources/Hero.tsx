import { images } from '@/assets/images'
import { Container } from '@/components/layout/Container'

const { heroResourcesHero: wide, heroResourcesHeroPortrait: portrait } = images

/**
 * A 754 px photo card inside 20 px margins, under black 20 % (design-notes RS1). The text block differs
 * per frame: mobile pins the title to the top and the description to the bottom; tablet stacks the two
 * 257 px apart and centres the block; desktop puts them side by side (bottom-aligned, 257 px apart) as
 * one centred 1205 px row. Radius 4 / 0 / 16 as rendered in each frame (design-notes G17).
 */
export function Hero() {
  return (
    <Container as="section" layout="full" aria-labelledby="resources-title" className="py-5">
      {/* Mobile: the description box is 377 px from x 20, so it ran 12 px past the photo; it stops
          8 px short of the edge here, which keeps the designed line breaks (design-notes RS2). */}
      <div className="relative isolate flex h-188.5 overflow-hidden rounded-corner-s pt-5.5 pr-2 pb-5.75 pl-5 md:items-center md:justify-center md:rounded-none md:p-0 lg:rounded-corner-l lg:px-10">
        <div data-reveal="media" className="absolute inset-0 -z-10 overflow-hidden">
          {/* The photo fills each card centred; below desktop a centre crop at full height keeps the
              tablet and mobile framing sharp. */}
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={wide.srcSet}
              sizes="(min-width: 1440px) 1400px, max(calc(100vw - 40px), 1062px)"
            />
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="728px"
              width={portrait.width}
              height={portrait.height}
              alt=""
              fetchPriority="high"
              className="size-full object-cover"
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-0 bg-black-variable-20" />
        </div>

        <div className="flex w-full flex-col justify-between md:w-142.75 md:justify-start md:gap-64.25 lg:w-full lg:max-w-301.25 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h1
            id="resources-title"
            data-reveal="lines"
            className="max-w-86 font-gloock text-header-sm text-neutral-white md:max-w-none md:text-header-md lg:w-142.75 lg:min-w-0"
          >
            Empowering Your Real Estate Journey
          </h1>
          <p
            data-reveal="up"
            className="max-w-94.25 text-body-xs-regular text-neutral-white lg:w-94.25 lg:shrink-0"
          >
            Explore our resources to make informed decisions at every step. From mortgage
            calculations to market insights, we’ve got you covered.
          </p>
        </div>
      </div>
    </Container>
  )
}
