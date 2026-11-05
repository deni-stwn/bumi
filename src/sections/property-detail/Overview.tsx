import { propertyDetail as d } from '@/data/propertyDetail'

/**
 * Title and price (side by side on desktop, stacked below), then Description and "Spesification"
 * (side by side on desktop, the table first below). Copy as designed (design-notes D1).
 */
export function Overview() {
  return (
    <>
      <header className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <h1
          data-reveal="lines"
          className="max-w-143 font-gloock text-header-xs text-gray-950 lg:text-header-sm"
        >
          {d.title}
        </h1>
        <p data-reveal="up" className="flex flex-col gap-6 lg:w-44.75 lg:items-end lg:text-right">
          <span className="font-gloock text-header-xs whitespace-nowrap text-gray-950 lg:text-header-sm">
            {d.price}
          </span>
          <span data-design-contrast className="text-body-xs-regular text-gray-400">
            {d.rent}
          </span>
        </p>
      </header>

      <hr className="border-gray-200" />

      <div className="flex flex-col-reverse gap-26.5 lg:flex-row">
        <section
          aria-labelledby="description-title"
          className="flex flex-col gap-6 md:max-w-151.25 lg:w-151.25"
        >
          <h2 id="description-title" className="font-gloock text-header-xs text-gray-950">
            Description
          </h2>
          {/* Two paragraphs with an empty line between them and one after, as in the design text: the gap
              is two 27 px lines minus the cap height (43.6, rounded to 44), the padding one line. */}
          <div
            data-reveal="up"
            data-design-contrast
            className="flex flex-col gap-11 pb-6.75 text-body-xs-regular text-gray-400"
          >
            {d.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="spec-title" className="flex flex-col gap-6 lg:w-142.75">
          <h2 id="spec-title" className="font-gloock text-header-xs text-gray-950">
            Spesification
          </h2>
          {/* The design's cell strokes are centred and take no space; the collapsed borders add 2 px. */}
          <table data-reveal="up" className="-mb-0.5 w-full table-fixed border-collapse">
            <tbody>
              {d.specification.map(([label, value]) => (
                <tr key={label}>
                  <th
                    scope="row"
                    className="h-15 border border-gray-100 px-6 text-left align-middle text-body-xs-bold text-gray-950"
                  >
                    {label}
                  </th>
                  <td
                    data-design-contrast
                    className="h-15 border border-gray-100 px-6 py-4 align-middle text-body-xs-regular text-gray-400"
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <hr className="border-gray-200" />
    </>
  )
}
