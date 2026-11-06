import { Hero } from '@/sections/resources/Hero'
import { ResourceList } from '@/sections/resources/ResourceList'

/** Resources: frames 6564 (1440), 7268 (768) and 10179 (425). */
export default function ResourcesPage() {
  return (
    <>
      <title>Resources – Bumi</title>
      <meta
        name="description"
        content="Explore our resources to make informed decisions at every step. From mortgage calculations to market insights, we’ve got you covered."
      />
      <Hero />
      <ResourceList />
    </>
  )
}
