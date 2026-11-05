import type { SVGProps } from 'react'

/** Icon "Up right circle" from the FigCraft Icons set, 24×24. Colour follows `currentColor`. */
export function ArrowUpRightCircleIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M8.586 7.172L11.828 7.172C12.381 7.172 12.828 7.619 12.828 8.172L12.828 11.414M12.121 7.879L7.172 12.828M0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
