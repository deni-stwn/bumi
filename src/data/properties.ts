import { images, type ImageAsset } from '@/assets/images'
import type { PropertyCardData } from '@/components/ui/PropertyCard'

export type PropertyCategory = 'residential' | 'commercial' | 'vacation'
export type Property = PropertyCardData & { category: PropertyCategory }

// placeholder: every card in the design reads "Villa House · Cibuntu, Sukabumi · House · $810K".
const base = {
  name: 'Villa House',
  address: 'Cibuntu, Sukabumi',
  type: 'House',
  price: '$810K',
  rent: '$1k / Month',
}

const photos = [
  {
    slug: 'villa-brick-garage',
    image: images.propertiesVillaBrickGarage,
    alt: 'Brick family house with a double garage',
  },
  {
    slug: 'villa-victorian',
    image: images.propertiesVillaVictorian,
    alt: 'Victorian house with a wooden porch',
  },
  {
    slug: 'villa-sunset-lawn',
    image: images.propertiesVillaSunsetLawn,
    alt: 'White house on a lawn at sunset',
  },
  {
    slug: 'villa-gray-porch',
    image: images.propertiesVillaGrayPorch,
    alt: 'Grey house with a covered porch among palm trees',
  },
  {
    slug: 'villa-thatched-cottage',
    image: images.propertiesVillaThatchedCottage,
    alt: 'Wooden cottage with a thatched roof',
  },
  {
    slug: 'villa-ivy-cottage',
    image: images.propertiesVillaIvyCottage,
    alt: 'Cottage with an ivy-covered chimney and a red door',
  },
]

const categories: PropertyCategory[] = ['residential', 'commercial', 'vacation']

type Photo = { slug: string; image: ImageAsset; alt: string }

/** placeholder: six listings per category, with the design's photos in the design's order. */
function makeListings(set: Photo[]): Property[] {
  return categories.flatMap((category) =>
    set.map((p) => ({
      ...base,
      ...p,
      category,
      slug: category === 'residential' ? p.slug : `${p.slug}-${category}`,
    })),
  )
}

/** Home and Properties: every default view (Home "All", Properties "Residential" / "All") shows these six. */
export const properties = makeListings(photos)

/** "Residential / Commercial / Vacation" at the bottom of the property detail page (other photos). */
export const relatedProperties = makeListings([
  {
    slug: 'related-coastal-street',
    image: images.propertiesRelatedCoastalStreet,
    alt: 'Houses along a palm-lined street',
  },
  {
    slug: 'related-red-house',
    image: images.propertiesRelatedRedHouse,
    alt: 'Red two-storey house with a white porch',
  },
  {
    slug: 'related-white-tower',
    image: images.propertiesRelatedWhiteTower,
    alt: 'White apartment building against a blue sky',
  },
  {
    slug: 'related-brick-manor',
    image: images.propertiesRelatedBrickManor,
    alt: 'Brick manor house with a slate roof',
  },
  {
    slug: 'related-cabin-fire',
    image: images.propertiesRelatedCabinFire,
    alt: 'Dark cabin with a lit window and a fire pit',
  },
  {
    slug: 'related-white-villa',
    image: images.propertiesRelatedWhiteVilla,
    alt: 'White villa with a double garage',
  },
])

/** Small filter "/ All / … /" on Home and on tablet/mobile Properties (design-notes G7: "Vacational"). */
export const homeFilters = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'vacation', label: 'Vacational' },
] as const

/** Large Gloock tabs on desktop Properties (no "All"). */
export const categoryTabs = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'vacation', label: 'Vacation' },
] as const
