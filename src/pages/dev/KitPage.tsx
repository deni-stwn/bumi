import type { ReactNode } from 'react'
import { images } from '@/assets/images'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { ChevronRightCircleIcon } from '@/components/icons/ChevronRightCircleIcon'
import { DotIcon } from '@/components/icons/DotIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { EyeOffIcon } from '@/components/icons/EyeOffIcon'
import { FilterIcon } from '@/components/icons/FilterIcon'
import { InfoCircleIcon } from '@/components/icons/InfoCircleIcon'
import { LogoMark } from '@/components/icons/LogoMark'
import { LogoOutline } from '@/components/icons/LogoOutline'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { Container } from '@/components/layout/Container'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { Button } from '@/components/ui/Button'
import type { ButtonSize, ButtonVariant } from '@/components/ui/buttonStyles'
import { FieldSelect } from '@/components/ui/FieldSelect'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { Select } from '@/components/ui/Select'
import { SlashList } from '@/components/ui/SlashList'
import { TextField } from '@/components/ui/TextField'

// Development-only sheet of every src/components variant, for review against the Components page.
const variants: ButtonVariant[] = ['fill', 'outline', 'ghost']
const sizes: ButtonSize[] = ['lg', 'md', 'sm']
const options = [
  { value: 'rent-buy', label: 'Rent/Buy' },
  { value: 'rent', label: 'Rent' },
  { value: 'buy', label: 'Buy' },
]
const icons = [
  ChevronDownIcon,
  SearchIcon,
  DotIcon,
  ArrowUpRightCircleIcon,
  ChevronRightCircleIcon,
  ChevronLeftIcon,
  DownloadIcon,
  ArrowRightIcon,
  ShareIcon,
  FilterIcon,
  InfoCircleIcon,
  EyeOffIcon,
]

function Section({
  title,
  children,
  dark = false,
}: {
  title: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <section className={dark ? 'bg-gray-950 py-12' : 'py-12'}>
      <Container layout="full" className="flex flex-col gap-8">
        <h2
          className={
            dark
              ? 'text-body-sm-semibold text-neutral-white'
              : 'text-body-sm-semibold text-gray-950'
          }
        >
          {title}
        </h2>
        {children}
      </Container>
    </section>
  )
}

export default function KitPage() {
  return (
    <>
      <title>Component kit – Bumi</title>
      <Section title="Button: fill / outline / ghost × lg / md / sm (regular, disabled)">
        {variants.map((v) => (
          <div key={v} className="flex flex-wrap items-center gap-6">
            {sizes.map((s) => (
              <Button
                key={s}
                variant={v}
                size={s}
                iconLeft={<SearchIcon />}
                iconRight={<SearchIcon />}
              >
                Button
              </Button>
            ))}
            {sizes.map((s) => (
              <Button
                key={`${s}-d`}
                variant={v}
                size={s}
                disabled
                iconLeft={<SearchIcon />}
                iconRight={<SearchIcon />}
              >
                Button
              </Button>
            ))}
          </div>
        ))}
      </Section>
      <Section title="TextField light: lg / md / sm, with helper, error, disabled, with dropdown">
        <div className="grid gap-10 md:grid-cols-3">
          <TextField label="Label" placeholder="Input text" helper="Helper text" />
          <TextField label="Label" size="md" placeholder="Input text" helper="Helper text" />
          <TextField label="Label" size="sm" placeholder="Input text" helper="Helper text" />
          <TextField
            label="Label"
            placeholder="Input text"
            defaultValue="Inputed"
            helper="Helper text"
          />
          <TextField label="Label" placeholder="Input text" error="This field is required" />
          <TextField label="Label" placeholder="Input text" helper="Helper text" disabled />
          <TextField
            label="Loan Terms"
            hideLabel
            placeholder="Loan Terms"
            suffix={
              <FieldSelect
                label="Loan term unit"
                options={[
                  { value: 'year', label: 'Year' },
                  { value: 'month', label: 'Month' },
                ]}
              />
            }
          />
        </div>
      </Section>
      <Section title="TextField dark" dark>
        <div className="grid gap-10 md:grid-cols-3">
          <TextField tone="dark" label="Label" placeholder="Input text" helper="Helper text" />
          <TextField
            tone="dark"
            label="Label"
            placeholder="Input text"
            defaultValue="Inputed"
            helper="Helper text"
          />
          <TextField
            tone="dark"
            label="Label"
            placeholder="Input text"
            helper="Helper text"
            disabled
          />
        </div>
      </Section>
      <Section title="Select light: lg / sm × underlined / noline, disabled">
        <div className="grid gap-10 md:grid-cols-4">
          <Select label="Category" options={options} />
          <Select label="Category" options={options} underline={false} />
          <Select label="Category" size="sm" options={options} />
          <Select label="Category" options={options} disabled />
        </div>
      </Section>
      <Section title="Select dark" dark>
        <div className="grid gap-10 md:grid-cols-4">
          <Select tone="dark" label="Category" options={options} />
          <Select tone="dark" label="Category" options={options} underline={false} />
          <Select tone="dark" label="Category" size="sm" options={options} />
          <Select tone="dark" label="Category" options={options} disabled />
        </div>
      </Section>
      <Section title="PropertyCard (placeholder photo) and ArticleCard feature / compact">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <PropertyCard
            slug="villa-house"
            image={images.footerVillaWaterfront}
            alt="Villa house"
            name="Villa House"
            address="Cibuntu, Sukabumi"
            type="House"
            price="$810K"
            rent="$1k / Month"
          />
          <ArticleCard
            slug="navigating"
            image={images.footerVillaWaterfront}
            title="Navigating Your Real Estate Adventure: Essential Insights"
            excerpt="Dive into the world of real estate, where opportunities abound and dreams of homeownership come to life. Our platform is your gateway to discovering properties that match your aspirations and lifestyle."
            readTime="20 Minutes Read"
          />
          <ArticleCard
            variant="compact"
            slug="navigating"
            title="Navigating Your Real Estate Adventure: Essential Insights"
            readTime="20 Minutes Read"
          />
        </div>
      </Section>
      <Section title="Icons, logo, slash list">
        <div className="flex flex-wrap items-center gap-6 text-gray-950">
          {icons.map((Icon) => (
            <Icon key={Icon.name} />
          ))}
          <LogoMark />
          <LogoOutline />
        </div>
        <SlashList
          className="gap-4 text-body-xs-regular text-gray-950"
          slashClassName="text-black-variable-50"
          items={['Home', 'About', 'Contact Us']}
        />
      </Section>
    </>
  )
}
