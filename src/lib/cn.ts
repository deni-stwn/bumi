import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { TEXT_STYLES } from './textStyles'

// Font sizes defined by hand in globals.css (layers without a text style).
const CUSTOM_SIZES = ['display', 'numeral', 'numeral-lg', 'wordmark', 'wordmark-lg']

// tailwind-merge must know the design's text styles are font sizes, not colours, otherwise
// `text-body-sm-regular` and `text-neutral-black` would override each other.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...TEXT_STYLES, ...CUSTOM_SIZES] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
