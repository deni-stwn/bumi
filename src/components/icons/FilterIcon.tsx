import type { SVGProps } from 'react'

/** Icon "Filter" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        transform="matrix(1 0 0 1 2 2)"
        d="M2 0L18 0C19.105 0 20 0.895 20 2L20 2.818C20 3.577 19.712 4.309 19.193 4.864L13.538 10.924C13.192 11.294 13 11.782 13 12.288L13 16.382C13 16.761 12.786 17.107 12.447 17.276L8.447 19.276C7.782 19.609 7 19.125 7 18.382L7 12.288C7 11.782 6.808 11.294 6.462 10.924L0.807 4.864C0.288 4.309 0 3.577 0 2.818L0 2C0 0.895 0.895 0 2 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
