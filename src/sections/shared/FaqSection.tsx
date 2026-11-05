import { useId, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/cn'
import type { Faq } from '@/data/faqs'

/**
 * One question: the row is the Dropdown component (Light / Small / Disabled / Underlined, design-notes
 * G22), text top-aligned with the 24 px chevron, 8 px padding. The open state is not designed
 * (design-notes G10): the question turns black like the regular Dropdown, the chevron flips and the
 * answer shows below in the body style.
 */
function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          data-design-contrast
          className="group flex w-full cursor-pointer items-start py-2 text-left text-body-sm-semibold text-black-variable-30 line-b-black-variable-30 transition-colors hover:text-neutral-black focus-visible:outline-neutral-black aria-expanded:text-neutral-black aria-expanded:line-b-black-variable-40"
        >
          <span className="min-w-0 flex-1">{faq.question}</span>
          <ChevronDownIcon className="shrink-0 transition-transform duration-200 group-aria-expanded:rotate-180" />
        </button>
      </h3>
      <div id={panelId} hidden={!open} className="pt-4">
        <p data-design-contrast className="text-body-xs-regular text-gray-400">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

/**
 * "Frequently Asked Question's" (copy as designed): title and accordion side by side on desktop
 * (440 / 689 px, spread apart; from `xl`, below that the list would be too narrow), stacked 64 px apart below, 100 px padding and a stroke above and below.
 */
export function FaqSection({
  faqs,
  className,
  sectionClassName,
}: {
  faqs: Faq[]
  /** The content box (strokes, gaps). */
  className?: string
  /** The whole section, e.g. to hide it where a frame has no FAQ. */
  sectionClassName?: string
}) {
  const titleId = useId()
  return (
    <Container as="section" aria-labelledby={titleId} className={sectionClassName}>
      <div
        className={cn(
          'flex flex-col gap-16 py-25 line-y-gray-200 xl:flex-row xl:items-start xl:justify-between xl:gap-38.25',
          className,
        )}
      >
        <h2
          id={titleId}
          data-reveal="lines"
          className="w-110 max-w-full shrink-0 font-gloock text-header-md text-gray-950"
        >
          Frequently Asked Question’s
        </h2>
        <div
          data-reveal="stagger"
          className="flex flex-col gap-7.5 xl:max-w-172.25 xl:min-w-0 xl:flex-1"
        >
          {faqs.map((faq, i) => (
            // The design repeats one question, so the position is part of the key.
            <FaqItem key={`${i}-${faq.question}`} faq={faq} />
          ))}
        </div>
      </div>
    </Container>
  )
}
