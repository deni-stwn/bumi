import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'

// placeholder: options around the values shown in the design.
export const searchFields = [
  { name: 'category', label: 'Category', options: ['Rent/Buy', 'Rent', 'Buy'] },
  { name: 'type', label: 'Type', options: ['Residential', 'Commercial', 'Vacation'] },
  { name: 'city', label: 'City', options: ['Alabama', 'California', 'Kentucky', 'Texas'] },
  { name: 'price', label: 'Price', options: ['$600k - $1000k', '$300k - $600k', '$1000k+'] },
].map((f) => ({ ...f, options: f.options.map((o) => ({ value: o, label: o })) }))

/** Submitting any property search opens the results page with the form values as the query. */
export function useSearchSubmit() {
  const navigate = useNavigate()
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    new FormData(e.currentTarget).forEach((v, k) => v && params.set(k, String(v)))
    navigate(`/properties/search?${params}`)
  }
}
