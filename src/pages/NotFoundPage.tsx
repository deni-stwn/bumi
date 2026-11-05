import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'

/** Not in the design (design-notes G10): built from the page-heading pattern of the inner pages. */
export default function NotFoundPage() {
  return (
    <>
      <title>Page not found – Bumi</title>
      <meta name="description" content="The page you are looking for does not exist." />
      <Container as="section" className="flex flex-col items-start gap-10 py-50">
        <h1
          data-reveal="lines"
          className="font-gloock text-header-sm text-gray-950 md:text-header-lg lg:text-header-xl"
        >
          Page not found
        </h1>
        <p
          data-reveal="up"
          className="max-w-100 text-body-xs-regular text-gray-400"
          data-design-contrast
        >
          The page you are looking for has moved or does not exist.
        </p>
        <ButtonLink
          to="/"
          variant="fill"
          size="md"
          iconRight={<ArrowUpRightCircleIcon />}
          data-reveal="up"
        >
          Back to Home
        </ButtonLink>
      </Container>
    </>
  )
}
