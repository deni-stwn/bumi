import { useId, useState } from 'react'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { Container } from '@/components/layout/Container'
import { BulletList } from '@/components/ui/BulletList'
import { Button } from '@/components/ui/Button'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { marketStats, marketTabContent, marketTabs, type MarketTab } from '@/data/marketTrends'
import { sharePage } from '@/lib/share'

// Tab boxes are fixed in the design: 148 / 209 / 206 / 134 / 179 px.
const tabWidths: Record<MarketTab, string> = {
  highlight: 'w-37',
  definition: 'w-52.25',
  structure: 'w-51.5',
  reports: 'w-33.5',
  methodology: 'w-44.75',
}

const tabOptions = marketTabs.map((t) => ({ ...t, className: tabWidths[t.value] }))

const shareMessages = {
  shared: 'Shared.',
  copied: 'Link copied to the clipboard.',
  cancelled: '',
  failed: 'Could not share this page.',
} as const

/**
 * Tabs with their bulleted text, then Download Result and its share twin, and the two key figures.
 * Desktop puts them side by side (878 and 335 px, 70 px apart, centred on each other); tablet and
 * mobile stack them 70 px apart. The tab row scrolls sideways where it is wider than the screen.
 */
export function Highlights() {
  const [tab, setTab] = useState<MarketTab>('highlight')
  const [shareStatus, setShareStatus] = useState('')
  const panelId = useId()
  return (
    <Container
      as="section"
      aria-labelledby="highlights-title"
      className="flex flex-col gap-17.5 py-25 xl:flex-row xl:items-center xl:justify-between"
    >
      <h2 id="highlights-title" className="sr-only">
        Market highlights
      </h2>
      <div className="flex flex-col gap-7.5 xl:max-w-219.5 xl:min-w-0 xl:flex-1">
        <FilterTabs
          label="Market report"
          variant="underline"
          options={tabOptions}
          value={tab}
          onChange={setTab}
          panelId={panelId}
          className="scrollbar-none overflow-x-auto overflow-y-hidden"
        />
        <div
          id={panelId}
          role="tabpanel"
          data-design-contrast
          tabIndex={0}
          aria-label={marketTabs.find((t) => t.value === tab)?.label}
        >
          {/* The text box ends with an empty line, 27 px under the last bullet. */}
          <BulletList
            opensBlock
            items={marketTabContent[tab]}
            className="pb-6.75 text-body-xs-regular text-gray-400 text-box-cap"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:w-83.75 xl:shrink-0">
        <div className="flex flex-col gap-4">
          {/* No file format in the design: the print dialog saves the page (design-notes G11). */}
          <Button size="lg" iconRight={<DownloadIcon />} onClick={() => window.print()}>
            Download Result
          </Button>
          {/* Labelled "Download Result" with a share icon in the design (MT8). */}
          <Button
            variant="outline"
            size="lg"
            iconRight={<ShareIcon />}
            onClick={async () => setShareStatus(shareMessages[await sharePage(document.title)])}
          >
            Download Result<span className="sr-only">: share this page</span>
          </Button>
          <p aria-live="polite" className="sr-only">
            {shareStatus}
          </p>
        </div>
        <dl className="rounded-corner-m inset-ring inset-ring-gray-300">
          {marketStats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i > 0
                  ? 'relative flex flex-col gap-4 p-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gray-300 xl:before:inset-x-4.5'
                  : 'flex flex-col gap-4 p-6'
              }
            >
              <dt className="font-alexandria text-body-xs-regular text-gray-950">{stat.label}</dt>
              <dd data-reveal="count" className="font-alexandria text-body-sm-light text-gray-950">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  )
}
