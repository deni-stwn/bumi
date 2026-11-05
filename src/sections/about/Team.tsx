import { useId } from 'react'
import { Container } from '@/components/layout/Container'
import { team, type TeamMember } from '@/data/team'
import { cn } from '@/lib/cn'

function Member({ member }: { member: TeamMember }) {
  return (
    <li className="flex w-65.5 shrink-0 snap-start flex-col gap-4 lg:col-span-3 lg:w-auto">
      <div
        data-reveal="media"
        className="h-102.25 overflow-hidden max-md:rounded-corner-s lg:aspect-335/523 lg:h-auto lg:rounded-corner-l"
      >
        <img
          src={member.image.src}
          srcSet={member.image.srcSet}
          sizes="(min-width: 1024px) 24vw, 262px"
          width={member.image.width}
          height={member.image.height}
          alt={member.alt}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-body-sm-bold text-gray-950">{member.name}</p>
        <p data-design-contrast className="text-body-xs-regular text-gray-400">
          {member.title}
        </p>
      </div>
    </li>
  )
}

const row = 'flex gap-5 lg:col-span-6 lg:grid lg:grid-cols-subgrid'

/**
 * "Your Trusted Partner in Every Property Journey.": on desktop two rows on the 11 content columns
 * (cards 3 columns wide, the description 49 px after the second card, the statement 5 columns);
 * tablet and mobile scroll the four cards in one row without the extra copy.
 */
export function Team() {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col gap-25 py-25 md:pl-20.5 lg:py-50 lg:pl-col-2">
        <h2
          id={titleId}
          data-reveal="lines"
          className="font-gloock text-header-xs text-gray-950 md:text-header-sm lg:max-w-201.75 lg:text-header-md"
        >
          Your Trusted Partner in Every Property Journey.
        </h2>
        <section
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scroller with no focusable content must be keyboard reachable (WCAG 2.1.1)
          tabIndex={0}
          aria-label="Team members"
          className="-mr-gutter scrollbar-none flex snap-x gap-5 overflow-x-auto pr-gutter lg:mr-0 lg:grid lg:grid-cols-11 lg:gap-x-5 lg:gap-y-50 lg:overflow-visible lg:pr-0"
        >
          <ul aria-label="Team" data-reveal="stagger" className={row}>
            {team.slice(0, 2).map((m) => (
              <Member key={m.name} member={m} />
            ))}
          </ul>
          <p
            data-reveal="up"
            data-design-contrast
            className="hidden text-body-xs-regular text-gray-400 lg:col-span-3 lg:ml-7.25 lg:block lg:max-w-71.75"
          >
            Our team consists of passionate experts who prioritize your needs and work tirelessly to
            deliver the best outcomes. Meet the people who make it all possible.
          </p>
          <h3
            data-reveal="lines"
            className="hidden font-gloock text-header-md text-gray-950 lg:col-span-5 lg:block lg:self-start"
          >
            Dedicated professionals driving success.
          </h3>
          <ul aria-label="Team, continued" data-reveal="stagger" className={cn(row)}>
            {team.slice(2).map((m) => (
              <Member key={m.name} member={m} />
            ))}
          </ul>
        </section>
      </Container>
    </section>
  )
}
