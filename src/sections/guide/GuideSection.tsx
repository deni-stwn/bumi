import { useId } from 'react'
import { Link } from 'react-router'
import type { GuideText, GuideTopic } from '@/data/guides'
import { cn } from '@/lib/cn'

/** Text runs; links keep the text's colour and weight as designed (design-notes BG2). */
function Runs({ text }: { text: GuideText }) {
  if (typeof text === 'string') return text
  return (
    <>
      {text.map((run, i) =>
        typeof run === 'string' ? (
          run
        ) : (
          <Link key={i} to={run.to} className="hover:underline">
            {run.text}
          </Link>
        ),
      )}
    </>
  )
}

type GuideSectionProps = { topic: GuideTopic; className?: string }

/**
 * One topic: Body/MD/Semibold title, then the text 24 px below it (beside it on desktop, against the
 * right edge). The design sets the text as one text box with bulleted lines and no paragraph spacing,
 * so the blocks sit line on line: only the box as a whole is trimmed to cap height (BG3).
 */
export function GuideSection({ topic, className }: GuideSectionProps) {
  const titleId = useId()
  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'flex flex-col gap-6 py-25 lg:flex-row lg:items-start lg:justify-between',
        className,
      )}
    >
      <h2 id={titleId} data-reveal="up" className="text-body-md-semibold text-gray-950">
        {topic.title}
      </h2>
      <div
        data-reveal="up"
        data-design-contrast
        className="text-body-xs-regular text-gray-400 text-box-cap md:w-142.75 md:shrink-0"
      >
        {topic.lead.map((paragraph, i) => (
          <p key={i}>
            <Runs text={paragraph} />
          </p>
        ))}
        {topic.bullets && (
          <ul>
            {topic.bullets.map((bullet, i) => (
              // FigCraft's bullet: a 5 px dot 1 px in, text indented 21 px.
              <li
                key={i}
                className="relative pl-5.25 before:absolute before:top-3.25 before:left-px before:size-1.25 before:rounded-full before:bg-current"
              >
                <Runs text={bullet} />
              </li>
            ))}
          </ul>
        )}
        {topic.note && (
          <p>
            <Runs text={topic.note} />
          </p>
        )}
      </div>
    </section>
  )
}
