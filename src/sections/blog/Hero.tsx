import { useId, type FormEvent } from 'react'
import { images } from '@/assets/images'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { Container } from '@/components/layout/Container'

const { heroBlogHero: wide, heroBlogHeroPortrait: portrait } = images

type HeroProps = { onSearch: (query: string) => void }

/**
 * A 967 px photo under black 30 % with the title (Header/MD, Header/SM on mobile) from y 344 on
 * desktop and 168 below, and the search capsule 25 px above the bottom. The capsule is the hero
 * photo's blurred backdrop with a white underlined field ("Search Anything", Body/MD) and a 72 px
 * white button; desktop pins the 1143 px field to the left and the button to the right end.
 */
export function Hero({ onSearch }: HeroProps) {
  const inputId = useId()
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(String(new FormData(event.currentTarget).get('q') ?? '').trim())
  }
  return (
    <section aria-labelledby="blog-title" className="relative isolate h-241.75 overflow-hidden">
      {/* The photo fills each frame centred; below desktop a centre crop at full height. */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={wide.srcSet} sizes="100vw" />
        <img
          src={portrait.src}
          srcSet={portrait.srcSet}
          sizes="(min-width: 768px) 1451px, 769px"
          width={portrait.width}
          height={portrait.height}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black-variable-30" />

      <Container className="flex h-full flex-col pt-42 pb-6.25 md:pl-20.5 lg:pt-86 lg:pl-col-2">
        <h1
          id="blog-title"
          data-reveal="lines"
          className="font-gloock text-header-sm text-neutral-white md:max-w-136.25 md:text-header-md lg:max-w-261.25"
        >
          Stay informed with the latest property market news, buying and selling guides, and expert
          advice to make smarter decisions.
        </h1>
        <search
          data-reveal="up"
          aria-label="Search articles"
          className="mt-auto lg:ml-auto lg:w-319.5"
        >
          <form
            onSubmit={submit}
            className="flex items-center rounded-full py-4 backdrop-blur-search lg:justify-between lg:gap-12"
          >
            <label htmlFor={inputId} className="sr-only">
              Search articles
            </label>
            <div className="flex min-w-0 flex-1 py-6 line-b-neutral-white lg:max-w-285.75">
              <input
                id={inputId}
                name="q"
                type="search"
                placeholder="Search Anything"
                autoComplete="off"
                // Inputs ignore text-box trim: an 18 px content box (the 17.9 px cap height) and 8 px
                // of padding cancelled by a negative margin keep the glyphs unclipped.
                className="-my-2 box-content h-4.5 w-full min-w-0 bg-transparent py-2 text-body-md-regular text-neutral-white outline-none placeholder:text-neutral-white"
              />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="grid size-18 shrink-0 place-items-center rounded-full bg-neutral-white text-gray-950"
            >
              <SearchIcon />
            </button>
          </form>
        </search>
      </Container>
    </section>
  )
}
