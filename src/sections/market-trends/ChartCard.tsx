import { useId, useRef, type ReactNode } from 'react'
import { BulletList } from '@/components/ui/BulletList'
import { chartYears, seriesNames, type MarketChart, type SeriesKey } from '@/data/marketTrends'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { useOverflowX } from '@/lib/useOverflowX'
import { ChartDrawing } from './ChartDrawing'
import type { ChartLayout } from './chartGeometry'

type CardShellProps = {
  id: string
  title: string
  /** Title to card: 14 / 22 / 26 px, per chart as drawn (MT7). */
  gap: string
  /** Value is the only card with a 16 px radius (`l`); the others are 8 px. */
  radius?: 'l' | 'm'
  children: ReactNode
}

const radii = {
  l: 'rounded-corner-l after:rounded-corner-l',
  m: 'rounded-corner-m after:rounded-corner-m',
} as const

/** Section title (Header/XS, black #000 → Neutral/Black) above a card with an inside Gray/300 stroke. */
export function CardShell({ id, title, gap, radius = 'm', children }: CardShellProps) {
  const titleId = useId()
  return (
    <section id={id} aria-labelledby={titleId} className={cn('flex scroll-mt-10 flex-col', gap)}>
      <h2
        id={titleId}
        data-reveal="lines"
        className="font-gloock text-header-xs text-neutral-black"
      >
        {title}
      </h2>
      <div
        data-reveal="up"
        className={cn(
          'relative after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-gray-300',
          radii[radius],
        )}
      >
        {children}
      </div>
    </section>
  )
}

/** The frame for this width: mobile below 768, tablet below 1024, the desktop drawing from 1024. */
function useFrame(layout: ChartLayout) {
  const md = useMediaQuery('(min-width: 768px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  return lg ? layout.frames.lg : md ? layout.frames.md : layout.frames.base
}

type ChartCardProps = Omit<CardShellProps, 'title' | 'children'> & {
  chart: MarketChart
  layout: ChartLayout
}

export function ChartCard({ chart, layout, ...shell }: ChartCardProps) {
  const frame = useFrame(layout)
  const plot = useRef<HTMLDivElement>(null)
  const notes = useRef<HTMLDivElement>(null)
  const plotScrolls = useOverflowX(plot)
  const notesScroll = useOverflowX(notes)
  const [x1, y1, x2, y2] = layout.geometry.box
  const s = frame.scale
  const keys = (Object.keys(chart.series) as SeriesKey[]).filter((k) => chart.series[k])
  const { notes: n } = frame
  return (
    <CardShell title={chart.title} {...shell}>
      {/* Charts wider than the card scroll sideways instead of being cut off as in the frames (MT4). */}
      <div
        ref={plot}
        tabIndex={plotScrolls ? 0 : undefined}
        role={plotScrolls ? 'group' : undefined}
        aria-label={plotScrolls ? `${chart.title} chart, scroll sideways` : undefined}
        className="scrollbar-none overflow-x-auto overflow-y-hidden"
        style={{ height: frame.plotHeight }}
      >
        <ChartDrawing
          chart={chart}
          geometry={layout.geometry}
          legendOffset={(frame.legendShift ?? 0) / s}
          style={{
            width: (x2 - x1) * s,
            height: (y2 - y1) * s,
            marginLeft: frame.x + x1 * s,
            marginTop: frame.y + y1 * s,
          }}
        />
      </div>
      <hr className="border-gray-300" />
      <div
        ref={notes}
        data-design-contrast
        tabIndex={notesScroll ? 0 : undefined}
        role={notesScroll ? 'group' : undefined}
        aria-label={notesScroll ? 'Notes, scroll sideways' : undefined}
        className={cn(
          n.nowrap && n.left >= 0 && 'scrollbar-none overflow-x-auto overflow-y-hidden',
        )}
        style={{
          paddingTop: n.top,
          paddingBottom: n.bottom,
          paddingLeft: Math.max(n.left, 0),
          paddingRight: n.right ?? 0,
          marginLeft: Math.min(n.left, 0),
        }}
      >
        <BulletList
          opensBlock
          items={chart.notes}
          className={cn(
            'text-body-xs-light text-gray-400 text-box-cap',
            n.nowrap && 'w-max whitespace-nowrap',
          )}
        />
      </div>
      <table className="sr-only">
        <caption>
          {chart.title}, {layout.geometry.axisTitle.text}
        </caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            {keys.map((k) => (
              <th key={k} scope="col">
                {seriesNames[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartYears.map((year, i) => (
            <tr key={year}>
              <th scope="row">{year}</th>
              {keys.map((k) => (
                <td key={k}>{chart.series[k]?.[i]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </CardShell>
  )
}
