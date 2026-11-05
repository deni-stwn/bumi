import type { SVGProps } from 'react'

/** The 8×16 slash rule the design puts between links (navbar, footer, filters, share). */
export function Slash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 8 16"
      width="8"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M0 16L8 0" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
