import type { SVGProps } from 'react'

/** Icon "ellipse" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function DotIcon(props: SVGProps<SVGSVGElement>) {
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
        transform="matrix(1 0 0 1 7 7)"
        d="M10 5C10 7.761 7.761 10 5 10C2.239 10 0 7.761 0 5C0 2.239 2.239 0 5 0C7.761 0 10 2.239 10 5"
        fill="currentColor"
      />
    </svg>
  )
}
