import { Container } from '@/components/layout/Container'
import { analystOpinion, marketCharts, methodology } from '@/data/marketTrends'
import { ChartCard } from './ChartCard'
import { chartLayouts } from './chartGeometry'
import { OverviewNav } from './OverviewNav'
import { TextCard } from './TextCard'

/**
 * The cards and the Overview links. Desktop: a 927 px column of cards and the 267 px Overview 19 px to
 * its right, as one 1280 px row 24 px from the right edge; the Overview stays in view while reading.
 * Below 1280 (the row needs 1232 px) the Overview comes first and the cards follow 64 px below.
 */
export function Insights() {
  return (
    <Container className="py-25 xl:px-6">
      <div className="flex flex-col gap-16 xl:ml-auto xl:max-w-320 xl:flex-row xl:items-start xl:gap-4.75">
        <OverviewNav className="xl:sticky xl:top-10 xl:order-last" />
        <div className="flex flex-col gap-25 xl:w-231.75 xl:shrink-0">
          <ChartCard
            id="value"
            chart={marketCharts.value}
            layout={chartLayouts.value}
            gap="gap-3.5"
            radius="l"
          />
          <ChartCard
            id="value-split"
            chart={marketCharts.valueSplit}
            layout={chartLayouts.valueSplit}
            gap="gap-5.5"
          />
          <ChartCard
            id="volume"
            chart={marketCharts.volume}
            layout={chartLayouts.volume}
            gap="gap-6.5"
          />
          <TextCard id="analyst-opinion" title="Analyst opinion">
            {analystOpinion.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </TextCard>
          <ChartCard
            id="transaction-value"
            chart={marketCharts.transactionValue}
            layout={chartLayouts.transactionValue}
            gap="gap-5.5"
          />
          {/* The design text shows an empty line after each group (MT9). Block margins, not flex: a flex
              box would stop the card's cap-height trim from reaching the first and last line. */}
          <TextCard id="methodology" title="Methodology">
            <div className="space-y-6.75">
              {methodology.map((group) => (
                <div key={group.label}>
                  <p>{group.label}</p>
                  <p>{group.text}</p>
                </div>
              ))}
            </div>
          </TextCard>
        </div>
      </div>
    </Container>
  )
}
