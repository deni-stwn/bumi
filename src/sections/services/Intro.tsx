import { images } from '@/assets/images'

const { servicesServicesIntro: photo } = images

/**
 * Page title with its description, then a full-width photo. Desktop puts the two side by side,
 * bottom-aligned and centred as one 1141 px block; tablet is a fixed 1610 px section with the photo
 * pinned to its bottom (an absolute layer in the frame); mobile stacks everything 100 px apart.
 */
export function Intro() {
  return (
    <section
      aria-labelledby="services-title"
      className="flex flex-col gap-25 py-25 md:h-402.5 md:gap-0 md:pb-0 lg:h-auto lg:gap-50 lg:py-50"
    >
      <div className="flex flex-col gap-16 px-gutter md:pl-20.5 lg:mx-auto lg:w-full lg:max-w-295.25 lg:flex-row lg:items-end lg:pl-gutter">
        <h1
          id="services-title"
          data-reveal="lines"
          className="font-gloock text-header-md text-gray-950 md:text-header-lg lg:min-w-0 lg:flex-1 lg:text-header-xl"
        >
          Tailored solutions designed to meet your needs.
        </h1>
        <p
          data-reveal="up"
          data-design-contrast
          className="w-78.25 max-w-full shrink-0 text-body-xs-regular text-gray-400"
        >
          We are committed to providing efficient property management, expert real estate
          consultation, and profitable investment opportunities to help you achieve your goals.
        </p>
      </div>
      <div data-reveal="media" className="h-74.25 overflow-hidden md:mt-auto md:h-176 lg:mt-0">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          // Tablet covers 704 px of height, so the photo is at least 912 px wide there.
          sizes="(min-width: 768px) max(100vw, 912px), 100vw"
          width={photo.width}
          height={photo.height}
          alt="A Bumi advisor going through a document with an older couple"
          className="size-full object-cover"
        />
      </div>
    </section>
  )
}
