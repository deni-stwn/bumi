import { useState } from 'react'
import { useLocation } from 'react-router'
import { Container } from '@/components/layout/Container'
import { SlashList } from '@/components/ui/SlashList'
import type { BlogPost } from '@/data/articles'
import { sharePage } from '@/lib/share'

const linkClass = 'text-body-xs-regular text-gray-300 transition-colors hover:text-gray-950'

/**
 * Date, title (Header/MD, Header/SM on mobile) and the share row, 48 px apart, between 100 px of
 * padding; desktop keeps 138 px on both sides (a 1164 px column). Twitter and Facebook open their
 * share pages; Instagram has none, so it uses the share sheet or copies the link (design-notes G11).
 */
export function ArticleHeader({ post }: { post: BlogPost }) {
  const { pathname } = useLocation()
  const [status, setStatus] = useState('')
  const url = encodeURIComponent(window.location.origin + pathname)
  const text = encodeURIComponent(post.title)
  const external = { target: '_blank', rel: 'noopener noreferrer', className: linkClass }
  return (
    <Container as="header" className="flex flex-col gap-12 py-25 lg:pr-34.5">
      <time dateTime={post.dateTime} className="text-body-xs-regular text-gray-950">
        {post.date}
      </time>
      <h1
        data-reveal="lines"
        className="font-gloock text-header-sm text-gray-950 md:text-header-md"
      >
        {post.title}
      </h1>
      {/* 381 px wide: below 425 px the links wrap under the label instead of overflowing. */}
      <div data-reveal="up" className="flex flex-wrap items-center gap-x-6.25 gap-y-3">
        <p className="text-body-xs-semibold whitespace-nowrap text-gray-950">Share :</p>
        <SlashList
          aria-label="Share this article"
          data-design-contrast
          className="gap-4"
          slashClassName="text-gray-300"
          items={[
            <a
              key="x"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
              {...external}
            >
              Twitter
            </a>,
            <a key="fb" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} {...external}>
              Facebook
            </a>,
            <button
              key="ig"
              type="button"
              className={linkClass}
              onClick={async () => {
                const result = await sharePage(post.title)
                setStatus(result === 'copied' ? 'Link copied to the clipboard.' : '')
              }}
            >
              Instagram
            </button>,
          ]}
        />
        <p aria-live="polite" className="sr-only">
          {status}
        </p>
      </div>
    </Container>
  )
}
