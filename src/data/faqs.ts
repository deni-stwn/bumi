export type Faq = { question: string; answer: string }

/**
 * FAQ of the three service pages (identical in every frame). Questions as designed, the repeated
 * second question included (design-notes L3). The design shows no open state, so the answers are
 * placeholder copy written for the site (design-notes PM9).
 */
export const serviceFaqs: Faq[] = [
  {
    question: 'What does property management include?',
    answer:
      'Day-to-day care of your property: tenant screening and onboarding, rent collection, scheduled inspections, maintenance and repairs, and regular financial reporting.',
  },
  {
    question: 'How do you handle property maintenance and repairs?',
    answer:
      'We schedule regular inspections and preventive upkeep, and our network of trusted vendors handles emergency repairs quickly. You approve major work before it starts.',
  },
  {
    question: 'How do you handle property maintenance and repairs?',
    answer:
      'We schedule regular inspections and preventive upkeep, and our network of trusted vendors handles emergency repairs quickly. You approve major work before it starts.',
  },
  {
    question: 'How do you select tenants for my property?',
    answer:
      'Every applicant goes through background, income and reference checks, so your property is let to reliable tenants.',
  },
  {
    question: 'How do you ensure my property generates maximum revenue?',
    answer:
      'We set competitive rents from current market data, keep vacancy periods short and review the results with you regularly.',
  },
  {
    question: 'What happens if a tenant damages my property?',
    answer:
      'We record the condition of the property at move-in and move-out, arrange the repairs and handle the claim against the deposit or insurance.',
  },
  {
    question: 'How often will I receive updates about my property?',
    answer:
      'You receive a financial report every month, and we contact you straight away about anything urgent.',
  },
  {
    question: 'Can you help me with legal compliance for my property?',
    answer:
      'Yes. We keep leases, safety certificates and inspections up to date with local regulations.',
  },
]
