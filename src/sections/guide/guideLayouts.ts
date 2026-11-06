/**
 * Per-guide differences in the title block, as drawn in each frame (design-notes SG2).
 * - row: gap between title and description, and the desktop row itself.
 * - title: type size from tablet up.
 * - description: its width.
 */
export type GuideHeroLayout = { row: string; title: string; description: string }

export const guideLayouts: Record<string, GuideHeroLayout> = {
  // Title and description 64 px apart; desktop row from grid column 2, 143 px apart.
  'buyer-guide': {
    row: 'gap-16 xl:gap-35.75',
    title: 'md:text-header-lg xl:text-header-xl',
    description: 'md:w-94.25',
  },
  // 62 px apart, Header/XL from tablet, a 377 px description on mobile too; desktop row 1280 px
  // against the right margin (x 140, like the topic rows), 139 px apart.
  'selling-guide': {
    row: 'gap-15.5 xl:ml-auto xl:max-w-320 xl:gap-34.75',
    title: 'md:text-header-xl',
    description: 'w-94.25',
  },
}
