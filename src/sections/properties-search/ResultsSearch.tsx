import { useRef } from 'react'
import { FilterIcon } from '@/components/icons/FilterIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { TextField } from '@/components/ui/TextField'
import { fieldDefault, searchFields, useSearchSubmit } from '@/sections/shared/searchFields'
import { cn } from '@/lib/cn'

// No background blur (client revision, design-notes G31).
const capsule = 'rounded-full'

function Fields({ size, defaults }: { size: 'lg' | 'md'; defaults: URLSearchParams }) {
  return searchFields.map((f) => (
    <Select
      key={f.name}
      name={f.name}
      label={f.label}
      size={size}
      underline={false}
      options={f.options}
      defaultValue={fieldDefault(f, defaults)}
      className="min-w-0 flex-1"
    />
  ))
}

/**
 * Search on the results page (light). Desktop (xl): the hero capsule with Black/40 rules and a 72 px
 * black search button. Tablet: four compact dropdowns and a full-width "Search". Mobile: "Search Place",
 * a filter button and "Search"; the filter opens the four dropdowns in a dialog (not designed, S1).
 */
export function ResultsSearch({ params }: { params: URLSearchParams }) {
  const onSubmit = useSearchSubmit()
  const dialog = useRef<HTMLDialogElement>(null)
  const rule = <span aria-hidden="true" className="h-17.5 w-px shrink-0 bg-black-variable-40" />
  return (
    <search aria-label="Refine the search" data-reveal="up">
      <form
        onSubmit={onSubmit}
        className={cn(
          capsule,
          'hidden items-center justify-between gap-11.25 py-4 xl:flex xl:max-w-319.5',
        )}
      >
        <div className="flex max-w-285.75 min-w-0 flex-1 items-center justify-between">
          {rule}
          {searchFields.map((f) => (
            <div key={f.name} className="contents">
              <Select
                name={f.name}
                label={f.label}
                underline={false}
                options={f.options}
                defaultValue={fieldDefault(f, params)}
                className="max-w-62.5 min-w-0 flex-1"
              />
              {rule}
            </div>
          ))}
        </div>
        <Button type="submit" aria-label="Search" className="size-18 p-0">
          <SearchIcon />
        </Button>
      </form>

      <form
        onSubmit={onSubmit}
        className={cn(capsule, 'hidden flex-col gap-4 py-4 md:flex xl:hidden')}
      >
        <div className="flex gap-4">
          <Fields size="md" defaults={params} />
        </div>
        <Button type="submit" size="md" iconRight={<SearchIcon />} className="w-full">
          Search
        </Button>
      </form>

      <form onSubmit={onSubmit} className={cn(capsule, 'flex flex-col gap-4 py-4 md:hidden')}>
        <div className={cn(capsule, 'flex items-center gap-6 py-4')}>
          <TextField
            name="q"
            label="Search place"
            hideLabel
            placeholder="Search Place"
            className="min-w-0 flex-1"
          />
          <button
            type="button"
            aria-label="Filters"
            aria-haspopup="dialog"
            onClick={() => dialog.current?.showModal()}
            className="grid size-16 shrink-0 place-items-center rounded-full bg-gray-50 text-gray-950"
          >
            <FilterIcon />
          </button>
        </div>
        <Button type="submit" size="md" iconRight={<SearchIcon />} className="w-full">
          Search
        </Button>
        <dialog
          ref={dialog}
          aria-label="Filters"
          className="m-auto w-[min(100%-2.5rem,24rem)] rounded-corner-l bg-neutral-white p-6 backdrop:bg-black-variable-50"
        >
          <div className="flex flex-col gap-8">
            <Fields size="lg" defaults={params} />
            <Button
              type="button"
              size="md"
              variant="outline"
              onClick={() => dialog.current?.close()}
            >
              Done
            </Button>
          </div>
        </dialog>
      </form>
    </search>
  )
}
