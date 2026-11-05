/** Navbar `Variant`: white (on a hero photo) or black (on white). */
export type NavTone = 'onImage' | 'onLight'

// Colours per tone from Navbar 18553/18585 (desktop) and 14916/14930 (tablet, mobile).
export const navTone = {
  onImage: {
    brand: 'text-neutral-white',
    active: 'text-neutral-white',
    idle: 'text-white-variable-50 hover:text-neutral-white',
    rule: 'text-white-variable-50',
    ruleActive: 'text-neutral-white',
    menu: 'text-neutral-white',
    menuRule: 'text-white-variable-50',
  },
  onLight: {
    brand: 'text-neutral-black lg:text-gray-950',
    active: 'text-gray-950',
    idle: 'text-black-variable-50 hover:text-gray-950',
    rule: 'text-black-variable-50',
    ruleActive: 'text-gray-950',
    menu: 'text-neutral-black',
    menuRule: 'text-black-variable-30',
  },
} as const
