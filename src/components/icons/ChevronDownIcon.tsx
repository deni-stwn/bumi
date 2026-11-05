import type { SVGProps } from 'react'

/** Icon "Down 2" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
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
        transform="matrix(1 0 0 -1 5 15)"
        d="M0 6L7 0L14 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
