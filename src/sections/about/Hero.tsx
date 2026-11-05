import { images } from '@/assets/images'

const { heroAboutHeroWide: wide, heroAboutHeroFull: full } = images

/**
 * Photo hero without text (navbar on top). Tablet and desktop share one crop (1440×962 and 768×513 are
 * the same ratio); mobile fills 425×932 with the whole photo.
 */
export function Hero() {
  return (
    <div className="relative isolate aspect-425/932 overflow-hidden md:aspect-1440/962 2xl:aspect-auto 2xl:h-240.5">
      <picture>
        <source media="(min-width: 768px)" srcSet={wide.srcSet} sizes="100vw" />
        <img
          src={full.src}
          srcSet={full.srcSet}
          sizes="(min-width: 768px) 100vw, 220vw"
          width={full.width}
          height={full.height}
          alt="The Bumi team in a meeting around a conference table"
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black-variable-20" />
    </div>
  )
}
