import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export type ResultValues = { monthlyPayment: string; totalInterest: string; totalCost: string }

const rows = [
  { key: 'monthlyPayment', label: 'Monthly Payment.' },
  { key: 'totalInterest', label: 'Total Interest Paid.' },
  { key: 'totalCost', label: 'Total Cost (property price + interest).' },
] as const

/**
 * "Result" breakdown and Download Result. On desktop the last row is not spread: its value sits 48 px
 * after the label (5 px short of the right edge, design-notes MC3); tablet and mobile spread all rows.
 */
export function MortgageResults({ values }: { values: ResultValues }) {
  return (
    <div data-reveal="up" className="flex flex-col gap-12 lg:w-84.25 lg:shrink-0">
      <p data-design-contrast className="text-body-xs-regular text-gray-400">
        Your calculation results provide a clear breakdown of your monthly payments, total interest,
        and overall cost. Use this information to better understand your financial commitment.
      </p>
      <div className="flex flex-col gap-6">
        <h3 className="font-alexandria text-body-xs-regular text-gray-950">Result</h3>
        {/* Announced when a calculation replaces the values. */}
        <dl
          aria-live="polite"
          data-design-contrast
          className="flex flex-col gap-4 text-body-xs-regular text-gray-400"
        >
          {rows.map(({ key, label }, i) => (
            <div
              key={key}
              className={cn(
                'flex items-center justify-between gap-4',
                i === rows.length - 1 && 'lg:justify-start lg:gap-12',
              )}
            >
              <dt>{label}</dt>
              <dd>{values[key]}</dd>
            </div>
          ))}
        </dl>
        {/* No file format in the design: the browser's print dialog saves the page (design-notes G11). */}
        <Button size="lg" iconRight={<DownloadIcon />} onClick={() => window.print()}>
          Download Result
        </Button>
      </div>
    </div>
  )
}
