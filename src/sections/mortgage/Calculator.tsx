import { useState, type FormEvent } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { FieldSelect } from '@/components/ui/FieldSelect'
import { TextField } from '@/components/ui/TextField'
import {
  calculateMortgage,
  formatShortAmount,
  parseAmount,
  type MortgageInput,
  type TermUnit,
} from '@/lib/mortgage'
import { MortgageResults, type ResultValues } from './MortgageResults'

type FieldName = 'loanAmount' | 'interestRate' | 'downPayment' | 'term'

/** Placeholders as designed ("Loan ammount", design-notes G7); the hidden labels repeat them. */
const fields: {
  name: FieldName
  placeholder: string
  error: string
  valid: (n: number) => boolean
}[] = [
  {
    name: 'loanAmount',
    placeholder: 'Loan ammount',
    error: 'Enter the amount you want to borrow.',
    valid: (n) => n > 0,
  },
  {
    name: 'interestRate',
    placeholder: 'Interest rate(%)',
    error: 'Enter a yearly rate from 0 to 100.',
    valid: (n) => n >= 0 && n <= 100,
  },
  {
    name: 'downPayment',
    placeholder: 'Down Payment',
    error: 'Enter 0 or more, or leave it empty.',
    valid: (n) => n >= 0,
  },
  {
    name: 'term',
    placeholder: 'Loan Terms',
    error: 'Enter the length of the loan.',
    valid: (n) => n > 0,
  },
]

const termUnits = [
  { value: 'year', label: 'Year' },
  { value: 'month', label: 'Month' },
]

// The design's figures, shown until the first calculation (design-notes R2).
const designValues: ResultValues = {
  monthlyPayment: '$2k',
  totalInterest: '$5k',
  totalCost: '$2,8m',
}

const empty: Record<FieldName, string> = {
  loanAmount: '',
  interestRate: '',
  downPayment: '',
  term: '',
}

/**
 * Calculator form and results. Desktop: a 756 px form (fields in two 354 px columns) and the 337 px
 * results, bottom-aligned in a 1280 px row against the right margin. Tablet and mobile stack them
 * 100 px apart; the tablet panel keeps 48 px of padding above and below (design-notes MC2).
 */
export function Calculator() {
  const [values, setValues] = useState(empty)
  const [unit, setUnit] = useState<TermUnit>('year')
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [results, setResults] = useState(designValues)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const numbers = {} as Record<FieldName, number>
    const nextErrors: Partial<Record<FieldName, string>> = {}
    for (const field of fields) {
      // An empty down payment counts as none.
      const text =
        field.name === 'downPayment' && values.downPayment.trim() === '' ? '0' : values[field.name]
      const n = parseAmount(text)
      if (Number.isNaN(n) || !field.valid(n)) nextErrors[field.name] = field.error
      numbers[field.name] = n
    }
    setErrors(nextErrors)
    const firstInvalid = fields.find((f) => nextErrors[f.name])
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }
    const input: MortgageInput = { ...numbers, termUnit: unit }
    const result = calculateMortgage(input)
    setResults({
      monthlyPayment: formatShortAmount(result.monthlyPayment),
      totalInterest: formatShortAmount(result.totalInterest),
      totalCost: formatShortAmount(result.totalCost),
    })
  }

  return (
    <Container
      as="section"
      aria-labelledby="calculator-title"
      className="pt-25 pb-50 md:py-62 md:pl-20.5"
    >
      <div className="flex flex-col gap-25 lg:ml-auto lg:max-w-320 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-10.5 lg:max-w-189 lg:min-w-0 lg:flex-1 lg:gap-9">
          <h2
            id="calculator-title"
            data-reveal="lines"
            className="font-gloock text-header-xs text-gray-950"
          >
            Calculator
          </h2>
          <form
            noValidate
            onSubmit={handleSubmit}
            data-reveal="up"
            className="flex flex-col gap-9.75"
          >
            <div className="flex flex-col gap-8 lg:grid lg:max-w-181 lg:grid-cols-2 lg:items-center lg:gap-x-4">
              {fields.map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.placeholder}
                  hideLabel
                  placeholder={field.placeholder}
                  inputMode="decimal"
                  autoComplete="off"
                  value={values[field.name]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                  error={errors[field.name]}
                  suffix={
                    field.name === 'term' ? (
                      <FieldSelect
                        label="Loan term unit"
                        options={termUnits}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as TermUnit)}
                      />
                    ) : undefined
                  }
                />
              ))}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Calculate Now
            </Button>
          </form>
        </div>
        <MortgageResults values={results} />
      </div>
    </Container>
  )
}
