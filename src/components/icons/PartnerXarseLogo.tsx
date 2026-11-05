import type { SVGProps } from 'react'

/** Partner logo mark (Home, Partners Section; placeholder brand), 42.5×42.4. Colour follows `currentColor`. */
export function PartnerXarseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42.5 42.4"
      width="42.5"
      height="42.4"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M42.5 14.3L28.1 14.3L28.1 0L14.3 0C14.3 7.9 7.9 14.3 0 14.3L0 28.1L14.3 28.1L14.3 42.4L28.1 42.4C28.1 34.5 34.6 28.1 42.5 28.1L42.5 14.3Z"
        fill="currentColor"
      />
    </svg>
  )
}
