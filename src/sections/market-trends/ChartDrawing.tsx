import type { CSSProperties } from 'react'
import { chartYears, type MarketChart, type SeriesKey } from '@/data/marketTrends'
import type { ChartGeometry } from './chartGeometry'

/** Chart colours: paint styles Warning/600 and Green/800; Total is Gray/300 (legend only). */
const fills: Record<SeriesKey, string> = {
  total: 'fill-gray-300',
  commercial: 'fill-warning-600',
  residential: 'fill-green-800',
}

type ChartDrawingProps = {
  chart: MarketChart
  geometry: ChartGeometry
  /** Sideways move of the legend, in drawing units. */
  legendOffset?: number
  style?: CSSProperties
}

/**
 * The chart itself as an SVG in the desktop frame's coordinates; its size and position per frame
 * come from the card (`style`). Decorative for screen readers: the card carries a data table.
 */
export function ChartDrawing({ chart, geometry: g, legendOffset = 0, style }: ChartDrawingProps) {
  const [x1, y1, x2, y2] = g.box
  const unit = (g.zero - g.hundred) / 100
  const yOf = (value: number) => g.zero - value * unit
  const residential = chart.series.residential ?? []
  const { bars, points } = g
  return (
    <svg
      viewBox={`${x1} ${y1} ${x2 - x1} ${y2 - y1}`}
      aria-hidden="true"
      focusable="false"
      data-reveal={chart.kind === 'line' ? undefined : 'bars'}
      className="block overflow-visible"
      style={style}
    >
      <g className="stroke-gray-100">
        {g.grid.map(([x, y, width]) => (
          <line key={y} x1={x} x2={x + width} y1={y} y2={y} strokeWidth={1} />
        ))}
      </g>

      <g className="fill-gray-400 font-light">
        {g.ticks.map((t) => (
          <text key={t.text} x={t.x} y={t.y} fontSize={t.size}>
            {t.text}
          </text>
        ))}
        <text transform={`translate(${g.axisTitle.x} ${g.axisTitle.y}) rotate(-90)`} fontSize={12}>
          {g.axisTitle.text}
        </text>
        {g.years.x.map((x, i) => (
          <text
            key={chartYears[i]}
            x={x}
            y={g.years.y}
            fontSize={12}
            // One year label is set in Alexandria in the Value chart (MT6).
            className={g.years.alexandria?.includes(chartYears[i]) ? 'font-alexandria' : undefined}
          >
            {chartYears[i]}
          </text>
        ))}
      </g>

      {bars &&
        chart.kind === 'bars' &&
        (Object.keys(bars.x) as SeriesKey[]).map((key) =>
          (chart.series[key] ?? []).map((value, i) => {
            const top = yOf(value)
            return (
              <rect
                key={`${key}-${i}`}
                data-bar
                x={bars.x[key]?.[i]}
                y={top}
                width={bars.width}
                height={bars.bottom - top}
                rx={bars.width / 2}
                className={fills[key]}
              />
            )
          }),
        )}

      {/* Stacked: residential from the bottom, commercial on top of it up to 100 %. */}
      {bars &&
        chart.kind === 'stacked' &&
        residential.map((value, i) => {
          const split = yOf(value)
          return (
            <g key={i} data-bar>
              <rect
                x={bars.x.commercial?.[i]}
                y={g.hundred}
                width={bars.width}
                height={split - g.hundred}
                rx={bars.width / 2}
                className={fills.commercial}
              />
              <rect
                x={bars.x.residential?.[i]}
                y={split}
                width={bars.width}
                height={bars.bottom - split}
                rx={bars.width / 2}
                className={fills.residential}
              />
            </g>
          )
        })}

      {points && chart.kind === 'line' && (
        <g className="fill-green-800 stroke-green-800">
          <polyline
            fill="none"
            strokeWidth={1}
            points={residential.map((v, i) => `${points.x[i]},${yOf(v)}`).join(' ')}
          />
          {residential.map((v, i) => (
            <circle key={i} cx={points.x[i]} cy={yOf(v)} r={points.r} stroke="none" />
          ))}
        </g>
      )}

      {/* Value labels: the design's placeholders, light grey with a white outline behind the glyphs. */}
      <g
        className="fill-gray-300 stroke-neutral-white font-light"
        strokeWidth={1}
        paintOrder="stroke"
        fontSize={10}
      >
        {g.valueLabels.map((label, i) =>
          label.rotate ? (
            <text key={i} transform={`translate(${label.x} ${label.y}) rotate(-90)`}>
              {label.text}
            </text>
          ) : (
            <text key={i} x={label.x} y={label.y} textAnchor="middle" className="font-alexandria">
              {label.text}
            </text>
          ),
        )}
      </g>

      <g fontSize={12} transform={legendOffset ? `translate(${legendOffset} 0)` : undefined}>
        {g.legend.map((item) => (
          <g key={item.series}>
            {g.legendLine && (
              <line
                x1={g.legendLine[0]}
                x2={g.legendLine[1]}
                y1={item.dot[1]}
                y2={item.dot[1]}
                strokeWidth={1}
                className="stroke-green-800"
              />
            )}
            <circle cx={item.dot[0]} cy={item.dot[1]} r={5} className={fills[item.series]} />
            <text
              x={item.label.x}
              y={item.label.y}
              // whitespace-pre keeps the design's double space ("Residential  Real Estate").
              className={[
                'fill-gray-400 whitespace-pre',
                item.label.light ? 'font-light' : 'font-semibold',
                item.label.alexandria ? 'font-alexandria' : '',
              ].join(' ')}
            >
              {item.label.text}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
