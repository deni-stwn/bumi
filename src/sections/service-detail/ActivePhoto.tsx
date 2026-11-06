import type { ServicePhoto } from '@/data/serviceDetails'
import { cn } from '@/lib/cn'

type ActivePhotoProps = {
  photo: ServicePhoto
  /** The active photo shows in colour; the others in black and white. */
  active: boolean
  sizes: string
  className?: string
}

/**
 * A service photo in two layers: the colour original, and on top the black-and-white one that fades
 * out while the photo is active. Black-and-white photos use the design's own export (filter baked
 * in, so they look exactly as drawn); colour ones a grayscale filter (design-notes SV13).
 */
export function ActivePhoto({ photo, active, sizes, className }: ActivePhotoProps) {
  const color = photo.color ?? photo.image
  return (
    <>
      <img
        src={color.src}
        srcSet={color.srcSet}
        sizes={sizes}
        width={color.width}
        height={color.height}
        alt={photo.alt}
        loading="lazy"
        // Hidden while inactive too, so no colour shows through the black-and-white layer's edges.
        className={cn(
          'size-full object-cover transition-opacity duration-500 ease-house-out',
          active ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
      <img
        src={photo.image.src}
        srcSet={photo.image.srcSet}
        sizes={sizes}
        width={photo.image.width}
        height={photo.image.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-500 ease-house-out',
          !photo.color && 'grayscale',
          active ? 'opacity-0' : 'opacity-100',
          className,
        )}
      />
    </>
  )
}
