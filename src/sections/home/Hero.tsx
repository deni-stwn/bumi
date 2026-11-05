import { images } from '@/assets/images'
import { HeroSearch } from '@/sections/shared/HeroSearch'

const {
  heroHomeHeroDesktop: desktop,
  heroHomeHeroTablet: tablet,
  heroHomeHeroMobile: mobile,
} = images

/**
 * Hero: the photo is cropped per frame in the design (425×965, 768×994, 1440×1864), so each width
 * gets its own crop. Heading and search sit at the frame offsets (20 / 83 / 120 px from the left).
 */
export function Hero() {
  return (
    <section className="relative isolate aspect-425/965 overflow-hidden md:aspect-768/994 lg:aspect-1440/1864 2xl:aspect-auto 2xl:h-466">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktop.srcSet} sizes="100vw" />
        <source media="(min-width: 768px)" srcSet={tablet.srcSet} sizes="100vw" />
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black-variable-10" />

      <div className="mx-auto flex max-w-frame flex-col gap-5.5 px-gutter pt-45.5 md:gap-9 md:pt-40 md:pr-5.75 md:pl-20.75 lg:gap-39.25 lg:pt-60.5 lg:pr-15 lg:pl-30">
        <h1
          data-reveal="lines"
          className="font-gloock text-header-sm text-neutral-white md:max-w-104.75 md:text-header-md lg:max-w-206.25 lg:text-header-xl"
        >
          Find Your Perfect Home Today.
        </h1>
        <HeroSearch />
      </div>
    </section>
  )
}
