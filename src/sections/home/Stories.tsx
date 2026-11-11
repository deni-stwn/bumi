import { useId } from 'react'
import { Container } from '@/components/layout/Container'
import { CarouselControls } from '@/components/ui/CarouselControls'
import { testimonials, type Testimonial } from '@/data/home'
import { cn } from '@/lib/cn'
import { useCarousel } from '@/lib/useCarousel'

function Story({ story, active }: { story: Testimonial; active: boolean }) {
  // Cards other than the current one are drawn in Gray/100 with a faded grey avatar.
  const text = active ? 'text-gray-950' : 'text-gray-100'
  const muted = active ? 'text-gray-400' : 'text-gray-100'
  return (
    <li
      aria-current={active ? true : undefined}
      data-design-contrast
      className="flex h-108.5 w-full shrink-0 snap-start flex-col justify-between gap-6 transition-colors duration-200 ease-out md:w-143"
    >
      <figure className="flex flex-col gap-6">
        <figcaption className="flex items-center gap-4">
          <img
            src={story.avatar.src}
            srcSet={story.avatar.srcSet}
            sizes="72px"
            width={story.avatar.width}
            height={story.avatar.height}
            alt=""
            loading="lazy"
            className={cn('size-18 rounded-full object-cover', !active && 'opacity-50 grayscale')}
          />
          <span className="flex w-53.25 flex-col gap-4">
            <span className={cn('text-body-md-semibold', text)}>{story.name}</span>
            <span
              data-design-contrast
              className={cn('flex items-center gap-2 text-body-xs-regular', muted)}
            >
              <span>{story.meta[0]}</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
              <span>{story.meta[1]}</span>
            </span>
          </span>
        </figcaption>
        <blockquote
          data-design-contrast
          className={cn('font-gloock text-header-xxs md:text-header-xs', text)}
        >
          <p>{story.quote}</p>
        </blockquote>
      </figure>
      <p
        data-design-contrast
        className="font-afacad text-body-sm-regular font-medium text-gray-400"
      >
        {story.year}
      </p>
    </li>
  )
}

/**
 * "Stories of Trust, Growth, and Shared Success": testimonial carousel. On tablet the heading touches
 * the cards (row gap 0 in the design). The design's 0 4 4 drop shadow on the desktop section is
 * removed (client revision, design-notes H17).
 */
export function Stories() {
  const titleId = useId()
  const { track, index, go, prev, next } = useCarousel<HTMLUListElement>(testimonials.length)
  return (
    <section aria-labelledby={titleId} aria-roledescription="carousel">
      <Container className="flex flex-col items-start gap-25 py-25 md:max-lg:gap-0">
        <div className="flex w-full items-end justify-between gap-10">
          <h2
            id={titleId}
            data-reveal="lines"
            className="max-w-138 font-gloock text-header-xs text-gray-950 md:text-header-sm"
          >
            Stories of Trust, Growth, and Shared Success
          </h2>
          <CarouselControls label="story" onPrev={prev} onNext={next} className="hidden lg:flex" />
        </div>
        <ul
          ref={track}
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scroller with no focusable content must be keyboard reachable (WCAG 2.1.1)
          tabIndex={0}
          aria-label="Stories"
          // The trailing space lets every story, the last one too, scroll to the start edge and
          // become the current one (track width − card − gap; design-notes H20).
          className={cn(
            '-mr-gutter scrollbar-none flex snap-x gap-17.5 self-stretch overflow-x-auto overflow-y-hidden pr-gutter lg:gap-25',
            "after:hidden after:shrink-0 after:content-[''] md:after:block md:after:w-[calc(100%-40.125rem)] lg:after:w-[calc(100%-42rem)]",
          )}
        >
          {testimonials.map((story, i) => (
            <Story key={story.quote} story={story} active={i === index} />
          ))}
        </ul>
        {/* Slide indicator: the current slide's segment is the long track with a 2 px progress bar.
            Segments resize and the bar draws in on the house curve when the slide changes. */}
        <ol aria-label="Slides" className="flex h-7.25 w-full items-center gap-5 lg:h-1.25">
          {testimonials.map((story, i) => {
            const current = i === index
            return (
              <li
                key={story.quote}
                className={cn(
                  'relative h-px bg-gray-300 transition-[flex-grow,flex-basis] duration-700 ease-house',
                  current
                    ? 'grow-0 basis-71 md:grow md:basis-0'
                    : 'grow basis-0 md:grow-0 md:basis-24.75',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-px left-0 h-0.5 w-56.5 origin-left bg-gray-950 transition-transform ease-house lg:w-111.75',
                    current ? 'scale-x-100 delay-200 duration-1000' : 'scale-x-0 duration-300',
                  )}
                />
                <button
                  type="button"
                  aria-label={`Show story ${i + 1}`}
                  aria-current={current ? true : undefined}
                  onClick={() => go(i)}
                  className="absolute inset-x-0 -inset-y-3.5"
                />
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
