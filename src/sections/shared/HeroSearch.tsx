import { SearchIcon } from '@/components/icons/SearchIcon'
import { Select } from '@/components/ui/Select'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/cn'
import { searchFields as fields, useSearchSubmit } from './searchFields'

const capsule = 'rounded-full backdrop-blur-search'
const rule = <span aria-hidden="true" className="h-17.5 w-px shrink-0 bg-white-variable-60" />

/**
 * Search on hero photos. From xl: four Dropdowns (Dark, Large, Noline) between White/60 rules and a
 * 72 px search button; below xl: the "Search Place" field (Input dark) with a 64 px button.
 */
export function HeroSearch({ className }: { className?: string }) {
  const onSubmit = useSearchSubmit()
  return (
    <search data-reveal="up" aria-label="Find a property" className={cn('block', className)}>
      <form
        onSubmit={onSubmit}
        className={cn(capsule, 'hidden items-center justify-between gap-11.25 py-4 xl:flex')}
      >
        {/* The dropdown row is 1143 px wide in every design; the button sits at the capsule's end. */}
        <div className="flex max-w-285.75 min-w-0 flex-1 items-center justify-between">
          {rule}
          {fields.map((f) => (
            <div key={f.name} className="contents">
              <Select
                name={f.name}
                label={f.label}
                tone="dark"
                underline={false}
                options={f.options}
                className="max-w-62.5 min-w-0 flex-1"
              />
              {rule}
            </div>
          ))}
        </div>
        <button
          type="submit"
          aria-label="Search"
          className="grid size-18 shrink-0 place-items-center rounded-full bg-neutral-white text-gray-950"
        >
          <SearchIcon />
        </button>
      </form>

      <form onSubmit={onSubmit} className={cn(capsule, 'flex items-center gap-6 py-4 xl:hidden')}>
        <TextField
          name="q"
          label="Search place"
          hideLabel
          tone="dark"
          placeholder="Search Place"
          className="min-w-0 flex-1"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid size-16 shrink-0 place-items-center rounded-full bg-neutral-white text-gray-950"
        >
          <SearchIcon />
        </button>
      </form>
    </search>
  )
}
