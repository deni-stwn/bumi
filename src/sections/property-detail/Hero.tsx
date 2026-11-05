import { images } from '@/assets/images'

const photo = images.heroPropertyDetailHero

/** Photo hero without text: 979 px on desktop, 522 px on tablet and mobile, under Black/30. */
export function Hero() {
  return (
    <div className="relative isolate h-130.5 overflow-hidden lg:h-244.75">
      {/* The fill's image adjustments (exposure, warmth…) are baked into the export (design-notes D5). */}
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes="(min-width: 768px) 100vw, 130vw"
        width={photo.width}
        height={photo.height}
        alt="Stone family house by a pond in Greenfield Estates"
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black-variable-30" />
    </div>
  )
}
