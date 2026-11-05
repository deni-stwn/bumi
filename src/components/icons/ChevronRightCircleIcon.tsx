import type { SVGProps } from 'react'

/** Icon "Right circle" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function ChevronRightCircleIcon(props: SVGProps<SVGSVGElement>) {
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
        transform="matrix(1 0 0 -1 2 22)"
        d="M8.7 13.2L11.411 10.683C11.837 10.287 11.837 9.613 11.411 9.217L8.7 6.7M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
