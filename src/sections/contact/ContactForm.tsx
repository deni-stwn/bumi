import { useState, type FormEvent } from 'react'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/cn'

type FieldName = 'name' | 'email' | 'phone' | 'subject' | 'message'

type Field = {
  name: FieldName
  placeholder: string
  type?: string
  autoComplete?: string
  /** An error message when the value is not acceptable, else null. */
  check: (value: string) => string | null
}

const required = (message: string) => (v: string) => (v.trim() ? null : message)

const fields: Field[] = [
  {
    name: 'name',
    placeholder: 'Full Name',
    autoComplete: 'name',
    check: required('Enter your name.'),
  },
  {
    name: 'email',
    placeholder: 'Email Address',
    type: 'email',
    autoComplete: 'email',
    check: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? null : 'Enter a valid email address.'),
  },
  {
    name: 'phone',
    placeholder: 'Phone Number',
    type: 'tel',
    autoComplete: 'tel',
    // Optional; when given, digits with the usual separators.
    check: (v) =>
      !v.trim() || /^\+?[\d\s()-]{6,}$/.test(v.trim()) ? null : 'Enter a valid phone number.',
  },
  { name: 'subject', placeholder: 'Subject', check: required('Enter a subject.') },
  { name: 'message', placeholder: 'Your Message', check: required('Enter your message.') },
]

/**
 * The contact form: Input (large) fields 100 px apart, two per row on desktop with "Your Message"
 * across both; one column below. Then the large "Send Result" button (label as designed, R3) with
 * the note 101 px to its right, or 24 px under it on mobile. Validated in the browser; the endpoint
 * is not defined yet, so a valid message shows the thank-you note in place of that note (G11).
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const next: Partial<Record<FieldName, string>> = {}
    for (const field of fields) {
      const error = field.check(String(data.get(field.name) ?? ''))
      if (error) next[field.name] = error
    }
    setErrors(next)
    const firstInvalid = fields.find((f) => next[f.name])
    if (firstInvalid) {
      setSent(false)
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }
    form.reset()
    setSent(true)
  }

  return (
    <Container as="section" aria-label="Contact form" className="mt-1.5 pt-25 pb-26.5">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-25">
        <div data-reveal="up" className="grid gap-y-25 lg:grid-cols-2 lg:gap-x-5">
          {fields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              type={field.type ?? 'text'}
              label={field.placeholder}
              hideLabel
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              error={errors[field.name]}
              className={cn(field.name === 'message' && 'lg:col-span-2')}
            />
          ))}
        </div>
        <div
          data-reveal="up"
          className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-25.25"
        >
          <Button type="submit" size="lg" iconRight={<ArrowUpRightCircleIcon />}>
            Send Result
          </Button>
          {/* Alexandria 14 Light at 140 % (20 px), a layer without a text style (CT2). Tablet keeps its
              424 px box past the column's right edge, as drawn, up to the screen edge (CT3). */}
          <p
            aria-live="polite"
            data-design-contrast
            className="font-alexandria text-body-xs-light leading-5 text-gray-400 md:w-106 md:max-w-[calc(100vw-21.5625rem)] md:shrink-0"
          >
            {sent
              ? 'Thank you! Your message has been sent. Our team will get back to you soon.'
              : 'We value your time and trust. Whether you need advice, guidance, or support, our dedicated team is here to help you make informed property decisions.'}
          </p>
        </div>
      </form>
    </Container>
  )
}
