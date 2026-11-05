import { images } from '@/assets/images'

// placeholder: the one property detail in the design, copy as designed (design-notes D1, D2, G14).
export const propertyDetail = {
  title: 'Elegant Family Home in Greenfield Estates',
  price: '$ 58.000',
  rent: '$1000 / month',
  description: [
    'Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu',
    'Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu',
  ],
  specification: [
    ['Land Size', '400m × 400m'],
    ['Building Size', '200m × 200m'],
    ['Properties Type', 'Rent or Buy'],
    ['Address', '3891 Ranchview Dr. Richardson, California 62639'],
  ],
  gallery: {
    main: {
      image: images.galleryGreenfieldFront,
      alt: 'Front of the stone house with a vintage car',
    },
    thumbs: [
      { image: images.galleryGreenfieldGardenPath, alt: 'Garden path leading to the house' },
      { image: images.galleryGreenfieldLawnFence, alt: 'Lawn with a wooden fence' },
      { image: images.galleryGreenfieldSkylight, alt: 'Attic room under a skylight' },
      { image: images.galleryGreenfieldInterior, alt: 'Interior with a wooden staircase' },
    ],
  },
  features: [
    '5 Bedrooms',
    'Sleeps 10+',
    'Can be fully staffed',
    '4 Bathrooms',
    'Indoor gym with peloton bikes',
    'Super fast internet',
    'Sauna and outdoor Jacuzzi',
  ],
}

export type Facility = {
  name: string
  places: { name: string; time: string }[]
  /** Desktop "Airport" row: time right after the name (16 px), not at the row's end. */
  inline?: boolean
}

// Desktop columns as designed; tablet and mobile stack them in this order.
export const facilityColumns: Facility[][] = [
  [
    {
      name: 'Airport',
      places: [{ name: 'Bandara soekarno hata', time: '10 menit' }],
      inline: true,
    },
    {
      name: 'ATM & Bank',
      places: [
        { name: 'ATM Mandiri', time: '10 menit' },
        { name: 'ATM BRI', time: '1 menit' },
        { name: 'Bank Mega', time: '3 menit' },
      ],
    },
    {
      name: 'Restaurant',
      places: [
        { name: 'Delicious Resto', time: '1 menit' },
        { name: 'Eat & Great Resto', time: '3 menit' },
      ],
    },
  ],
  [
    { name: 'Gerbang Tol', places: [{ name: 'Tol Jagorawi', time: '15 Menit' }] },
    {
      name: 'Rumah sakit',
      places: [
        { name: 'RS. Syamsudin', time: '15 Menit' },
        { name: 'RS. Media care', time: '15 Menit' },
      ],
    },
    {
      name: 'SPBU',
      places: [
        { name: 'Pertamina Sukamaju', time: '1 menit' },
        { name: 'MOBIL Sukamaju', time: '3 menit' },
        { name: 'Shell Sukamaju', time: '3 menit' },
      ],
    },
  ],
  [
    {
      name: 'Shoping Mall',
      places: [
        { name: 'Mall Jaya Indah', time: '1 menit' },
        { name: 'Mall Indonesia Indah', time: '3 menit' },
      ],
    },
  ],
]
