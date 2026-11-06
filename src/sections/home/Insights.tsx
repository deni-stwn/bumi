import { useId } from 'react'
import { Link } from 'react-router'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { CarouselControls } from '@/components/ui/CarouselControls'
import { insights, type Insight } from '@/data/home'
import { cn } from '@/lib/cn'
import { useCarousel } from '@/lib/useCarousel'

// Card sizes per slide as designed: width, image height (mobile, then tablet/desktop).
const layout = [
  { card: 'w-79 md:w-143', image: 'h-65 md:h-117.75' },
  { card: 'w-54.25', image: 'h-85.25' },
  { card: 'w-54.25', image: 'h-40.25' },
  { card: 'w-54.5', image: 'h-56.25' },
]

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const l = layout[index % layout.length]
  return (
    <li
      className={cn(
        'relative flex h-full shrink-0 snap-start flex-col justify-between gap-6',
        l.card,
      )}
    >
      <div className="flex flex-col gap-4">
        <div
          data-reveal="media"
          className={cn('overflow-hidden md:max-lg:rounded-corner-m lg:rounded-corner-l', l.image)}
        >
          <img
            src={insight.image.src}
            srcSet={insight.image.srcSet}
            sizes={index === 0 ? '(min-width: 768px) 572px, 316px' : '218px'}
            width={insight.image.width}
            height={insight.image.height}
            alt={insight.alt}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-body-sm-semibold text-gray-950">
            <Link
              to={`/blog/${insight.slug}`}
              className="after:absolute after:inset-0 hover:underline"
            >
              {insight.title}
            </Link>
          </h3>
          {insight.excerpt ? (
            <p data-design-contrast className="hidden text-body-xs-regular text-gray-400 md:block">
              {insight.excerpt}
            </p>
          ) : null}
        </div>
      </div>
      <time
        dateTime={insight.dateTime}
        data-design-contrast
        className="font-afacad text-body-xs-regular text-gray-400"
      >
        {insight.date}
      </time>
    </li>
  )
}

/** "Insights and Trends": a carousel of four article cards (680 px tall, 547 px on mobile). */
export function Insights() {
  const titleId = useId()
  const { track, prev, next } = useCarousel<HTMLUListElement>(insights.length)
  return (
    <section aria-labelledby={titleId} aria-roledescription="carousel">
      <Container className="flex flex-col items-start gap-25 py-25">
        <div className="flex w-full items-end justify-between gap-10">
          <h2
            id={titleId}
            data-reveal="lines"
            className="font-gloock text-header-xs text-gray-950 md:max-w-150.25 md:text-header-sm lg:max-w-177.5"
          >
            Insights and Trends: Stay Updated with the Latest in Real Estate
          </h2>
          <CarouselControls
            label="article"
            onPrev={prev}
            onNext={next}
            className="hidden lg:flex"
          />
        </div>
        <ul
          ref={track}
          className="-mr-gutter scrollbar-none flex h-136.75 snap-x gap-5 self-stretch overflow-x-auto overflow-y-hidden pr-gutter md:h-170"
        >
          {insights.map((insight, i) => (
            <InsightCard key={insight.slug} insight={insight} index={i} />
          ))}
        </ul>
        <ButtonLink
          to="/blog"
          variant="ghost"
          size="lg"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
          className="max-md:w-full max-md:justify-start"
        >
          Learn More
        </ButtonLink>
        <hr className="-mt-4.25 hidden self-stretch border-gray-300 lg:block" />
      </Container>
      <hr className="mx-gutter border-gray-300 md:mx-0 lg:hidden" />
    </section>
  )
}
