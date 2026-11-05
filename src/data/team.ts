import { images, type ImageAsset } from '@/assets/images'

export type TeamMember = { name: string; title: string; image: ImageAsset; alt: string }

// placeholder: names and titles as designed ("Excekutive" included, design-notes G7).
export const team: TeamMember[] = [
  {
    name: 'John Doe',
    title: 'Chief Tech Officer',
    image: images.teamJohnDoe,
    alt: 'Portrait of John Doe',
  },
  {
    name: 'Mujambe',
    title: 'Chief Excekutive Officer',
    image: images.teamMujambe,
    alt: 'Portrait of Mujambe',
  },
  {
    name: 'Raj Armingham',
    title: 'Marketing Lead',
    image: images.teamRajArmingham,
    alt: 'Portrait of Raj Armingham',
  },
  {
    name: 'Daisy Clark',
    title: 'Human Resources',
    image: images.teamDaisyClark,
    alt: 'Portrait of Daisy Clark',
  },
]
