export type TermUnit = 'year' | 'month'

export type MortgageInput = {
  /** The amount borrowed. */
  loanAmount: number
  /** Annual interest rate in percent. */
  interestRate: number
  downPayment: number
  term: number
  termUnit: TermUnit
}

export type MortgageResult = {
  monthlyPayment: number
  totalInterest: number
  /** Property price (loan + down payment) plus interest, as the result label says. */
  totalCost: number
}

/** Standard annuity: a fixed monthly payment that repays the loan at the annual rate over the term. */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { loanAmount, interestRate, downPayment, term, termUnit } = input
  const months = termUnit === 'year' ? term * 12 : term
  const rate = interestRate / 100 / 12
  const monthlyPayment =
    rate === 0 ? loanAmount / months : (loanAmount * rate) / (1 - (1 + rate) ** -months)
  const totalInterest = monthlyPayment * months - loanAmount
  return { monthlyPayment, totalInterest, totalCost: loanAmount + downPayment + totalInterest }
}

/**
 * Reads what a visitor types: "250000", "250,000", "250.000", "$ 250 000", "4,5" or "4.5 %".
 * A group of three digits after the separator is a thousands separator; otherwise a comma is a
 * decimal comma. Returns NaN for anything else.
 */
export function parseAmount(text: string) {
  const s = text.replace(/[\s$%]/g, '')
  if (s === '') return NaN
  if (/^\d{1,3}([.,]\d{3})+$/.test(s)) return Number(s.replace(/[.,]/g, ''))
  if (!/^\d*[.,]?\d+$/.test(s)) return NaN
  return Number(s.replace(',', '.'))
}

const scales = [
  [1e9, 'b'],
  [1e6, 'm'],
  [1e3, 'k'],
] as const

/** Amounts in the design's short style: $950, $2k, $5k, $2,8m (one decimal, decimal comma). */
export function formatShortAmount(value: number) {
  for (const [size, suffix] of scales) {
    if (Math.abs(value) >= size) {
      const short = Math.round((value / size) * 10) / 10
      return `$${String(short).replace('.', ',')}${suffix}`
    }
  }
  return `$${Math.round(value)}`
}
