import { Hero } from '@/sections/about/Hero'
import { Intro } from '@/sections/about/Intro'
import { Team } from '@/sections/about/Team'

/** About: frames 3232 (1440), 3329 (768) and 3404 (425). */
export default function AboutPage() {
  return (
    <>
      <title>About – Bumi</title>
      <meta
        name="description"
        content="We are here to help you find the perfect property that matches your needs and aspirations. Meet the Bumi team."
      />
      <Hero />
      <Intro />
      <Team />
    </>
  )
}
