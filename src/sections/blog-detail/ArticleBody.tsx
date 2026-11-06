import { Container } from '@/components/layout/Container'
import type { BlogPost, PostSection } from '@/data/articles'
import { cn } from '@/lib/cn'
import { useScrollSpy } from '@/lib/useScrollSpy'

/** A Header/XS title, then the text 24 px below: one text box ending in an empty line (27 px). */
function Section({ section }: { section: PostSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="flex scroll-mt-10 flex-col gap-6"
    >
      <h2
        id={`${section.id}-title`}
        data-reveal="lines"
        className="font-gloock text-header-xs text-gray-950"
      >
        {section.title}
      </h2>
      {/* pre-wrap keeps the 14 spaces that indent the later paragraphs, as the frames draw them. */}
      <div
        data-reveal="up"
        data-design-contrast
        className="pb-6.75 text-body-xs-regular whitespace-pre-wrap text-gray-400 text-box-cap"
      >
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

/**
 * "Table Of Content": numbered links to the sections, the one being read in Gray/950 and the others
 * Gray/200 (Body/SM/Semibold, 24 px apart). Above the text on tablet and mobile; a 335 px column
 * beside it on desktop (24 px padding), kept in view while reading.
 */
function TableOfContent({ sections, className }: { sections: PostSection[]; className?: string }) {
  const active = useScrollSpy(sections.map((s) => s.id))
  return (
    <nav aria-labelledby="toc-title" className={cn('flex flex-col gap-6', className)}>
      <h2 id="toc-title" data-reveal="lines" className="font-gloock text-header-xs text-gray-950">
        Table Of Content
      </h2>
      <ol data-reveal="stagger" data-design-contrast className="flex flex-col gap-6">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={s.id === active ? 'true' : undefined}
              className={cn(
                'flex gap-2 text-body-sm-semibold transition-colors duration-200 ease-out',
                s.id === active ? 'text-gray-950' : 'text-gray-200 hover:text-gray-950',
              )}
            >
              <span aria-hidden="true" className="w-4 shrink-0 text-right">
                {i + 1}.
              </span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * The post text (three sections, a 290 px photo after the first, 38 px apart) and its table of
 * contents. Desktop: a 927 px column and the 335 px contents 20 px to its right; below, the contents
 * come first, 64 px above the text. The photo is rounded on desktop only (as drawn).
 */
export function ArticleBody({ post }: { post: BlogPost }) {
  const [first, ...rest] = post.sections
  return (
    <Container className="flex flex-col gap-16 py-25 lg:flex-row lg:items-start lg:gap-5">
      <TableOfContent
        sections={post.sections}
        className="lg:sticky lg:top-10 lg:order-last lg:w-83.75 lg:shrink-0 lg:px-6"
      />
      <div className="flex flex-col gap-9.5 lg:max-w-231.75 lg:min-w-0 lg:flex-1">
        <Section section={first} />
        <figure data-reveal="media" className="h-72.5 overflow-hidden lg:rounded-corner-l">
          <img
            src={post.figure.image.src}
            srcSet={post.figure.image.srcSet}
            sizes="(min-width: 1024px) 927px, 100vw"
            width={post.figure.image.width}
            height={post.figure.image.height}
            alt={post.figure.alt}
            loading="lazy"
            className="size-full object-cover"
          />
        </figure>
        {rest.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </div>
    </Container>
  )
}
