import { useParams } from 'react-router'
import { findPost } from '@/data/articles'
import { ArticleBody } from '@/sections/blog-detail/ArticleBody'
import { ArticleHeader } from '@/sections/blog-detail/ArticleHeader'
import { RelatedArticles } from '@/sections/blog-detail/RelatedArticles'
import NotFoundPage from './NotFoundPage'

/** Blog Detail: frames 4579 (1440), 4250 (768) and 5410 (425). */
export default function BlogDetailPage() {
  const { slug = '' } = useParams()
  const post = findPost(slug)
  if (!post) return <NotFoundPage />
  return (
    <>
      <title>{`${post.title} – Bumi`}</title>
      <meta
        name="description"
        content="Market trends and smart investment strategies from the Bumi blog."
      />
      <article>
        <ArticleHeader post={post} />
        {/* Full-bleed photo: 810 px tall on desktop and tablet, 306 px on mobile. */}
        <div data-reveal="media" className="h-76.5 overflow-hidden md:h-202.5">
          <img
            src={post.image.src}
            srcSet={post.image.srcSet}
            sizes="(min-width: 768px) max(100vw, 1126px), 100vw"
            width={post.image.width}
            height={post.image.height}
            alt={post.alt}
            fetchPriority="high"
            className="size-full object-cover"
          />
        </div>
        <ArticleBody post={post} />
      </article>
      <RelatedArticles />
    </>
  )
}
