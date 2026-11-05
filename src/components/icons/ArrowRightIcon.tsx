import type { SVGProps } from 'react'

/** Icon "Right" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
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
        transform="matrix(1 0 0 1 5 8)"
        d="M11 8L14.293 4.707C14.683 4.317 14.683 3.683 14.293 3.293L11 0M14 4L0 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
