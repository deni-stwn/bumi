import type { SVGProps } from 'react'

/** Icon "Download 2" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
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
        transform="matrix(0 1 -1 0 23 8)"
        d="M0 14L0 20L13 20L13 0L0 0L0 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        transform="matrix(1 0 0 -1 10 16)"
        d="M0 3L3 0L6 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        transform="matrix(-1 0 0 1 13 3)"
        d="M0 12L0 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
