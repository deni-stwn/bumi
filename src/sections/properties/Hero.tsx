import { images } from '@/assets/images'
import { HeroSearch } from '@/sections/shared/HeroSearch'

const { heroPropertiesHero: wide, heroPropertiesHeroMobile: mobile } = images

/**
 * Properties hero: one photo (fill) under black 30 % and a Black/10 mask (which stops 5 px short of
 * the bottom on desktop). Heading and search at x 20 / 82 / 138, 24 px from the right on tablet/desktop.
 * Desktop keeps the frame's 967 px height so the content fits at every desktop width.
 */
export function Hero() {
  return (
    <section className="relative isolate aspect-425/938 overflow-hidden md:aspect-768/515 lg:aspect-auto lg:h-241.75">
      {/* The photo fills each frame centred; mobile gets the matching portrait crop at full resolution. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={wide.srcSet} sizes="100vw" />
        <img
          src={mobile.src}
          srcSet={mobile.srcSet}
          sizes="100vw"
          width={mobile.width}
          height={mobile.height}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black-variable-30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black-variable-10 lg:bottom-1.25"
      />

      <div className="mx-auto flex max-w-frame flex-col gap-3 px-gutter pt-70.25 md:gap-15.25 md:pt-45.5 md:pr-6 md:pl-20.5 lg:gap-71 lg:pt-87 lg:pl-col-2">
        <h1
          data-reveal="lines"
          className="max-w-95.5 font-gloock text-header-sm text-neutral-white md:max-w-168.25 lg:max-w-261.25 lg:text-header-md"
        >
          Find your dream property – Residential, Commercial, or Vacation.
        </h1>
        <HeroSearch className="md:max-w-165.5 lg:max-w-none" />
      </div>
    </section>
  )
}
