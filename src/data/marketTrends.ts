/** Market Trends frames 8405 / 7812 / 11058, copy as designed ("market market", "Analyst opinion"). */

export const marketIntro = {
  title: 'Stay Ahead with the Latest Market Trends',
  description:
    'Discover key insights and updates from the real estate market to make informed decisions on your next property investment.',
}

export type MarketTab = 'highlight' | 'definition' | 'structure' | 'reports' | 'methodology'

export const marketTabs: { value: MarketTab; label: string }[] = [
  { value: 'highlight', label: 'Highlight' },
  { value: 'definition', label: 'Market Definition' },
  { value: 'structure', label: 'Market Structure' },
  { value: 'reports', label: 'Reports' },
  { value: 'methodology', label: 'Methodology' },
]

/**
 * Bulleted lines per tab. Only Highlight is designed; the other tabs reuse copy from this page as
 * placeholders (design-notes MT2).
 */
export const marketTabContent: Record<MarketTab, string[]> = {
  highlight: [
    'The Real Estate market market in Indonesia is expected to reach a projected value of US$9.16tn by 2025.',
    'Among the various segments in the market, Residential Real Estate holds the largest share, with a projected market volume of US$7.95tn in the same year.',
    'Looking ahead, the market is anticipated to exhibit an annual growth rate of 1.21% (CAGR 2025-2029), resulting in a market volume of US$9.61tn by 2029.',
    'In the global context, United States is expected to generate the highest value in the Real Estate market market, reaching US$136.6tn in 2025.',
    'The real estate market in Indonesia is experiencing a surge in demand for luxury villas in popular tourist destinations.',
  ],
  // placeholder
  definition: [
    'Figures are based on value of residential and commercial real estate, average real estate value, residential estate transactions and leases.',
  ],
  // placeholder
  structure: [
    'Among the various segments in the market, Residential Real Estate holds the largest share, with a projected market volume of US$7.95tn in the same year.',
    'Commercial Real Estate makes up the rest of the market value.',
  ],
  // placeholder
  reports: ['Most recent update: Jul 2024', 'Source: Statista Market Insights'],
  // placeholder
  methodology: [
    'Market sizes are determined by a combined Top-Down and Bottom-Up approach, based on a specific rationale for each market segment.',
    'In our forecasts, we apply diverse forecasting techniques. The selection of forecasting techniques is based on the behavior of the particular market.',
  ],
}

/** Sidebar figures (placeholder). */
export const marketStats = [
  { label: 'Value (2025)', value: 'US $ 9.19tn' },
  { label: 'Residential Real Estate Volume (2025)', value: 'US $ 8M' },
]

export type SeriesKey = 'total' | 'commercial' | 'residential'

export const seriesNames: Record<SeriesKey, string> = {
  total: 'Total',
  commercial: 'Commercial Real Estate',
  residential: 'Residential Real Estate',
}

export type ChartId = 'value' | 'valueSplit' | 'volume' | 'transactionValue'

export type MarketChart = {
  id: ChartId
  /** Card title as designed; `nav` is the Overview link when it differs. */
  title: string
  kind: 'bars' | 'stacked' | 'line'
  /** Values per series on the 0–100 axis, one per year (placeholder data read off the designed bars). */
  series: Partial<Record<SeriesKey, number[]>>
  notes: string[]
}

export const chartYears = [
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
]

const residentialShare = [81.7, 63.8, 72.3, 75.8, 74.0, 69.7, 71.3, 60.6, 72.3, 74.6, 68.9]

const updated = ['Most recent update: Jul 2024', 'Source: Statista Market Insights']

export const marketCharts: Record<ChartId, MarketChart> = {
  value: {
    id: 'value',
    title: 'Value',
    kind: 'bars',
    series: {
      commercial: Array(11).fill(21.7),
      residential: [71.3, 68.6, 65.6, 68.6, 73.9, 75.9, 79.0, 84.9, 80.6, 86.5, 90.0],
    },
    notes: [
      'Notes: Data was converted from local currencies using average exchange rates of the respective year.',
      ...updated,
    ],
  },
  valueSplit: {
    id: 'valueSplit',
    title: 'Value Split',
    kind: 'stacked',
    series: {
      commercial: residentialShare.map((v) => Math.round((100 - v) * 10) / 10),
      residential: residentialShare,
    },
    notes: updated,
  },
  volume: {
    id: 'volume',
    title: 'Volume',
    kind: 'line',
    series: { residential: [44.4, 54.4, 54.4, 66.4, 48.5, 64.8, 67.2, 74.5, 67.2, 68.0, 69.6] },
    notes: [
      'Notes: Please note that this chart only covers the residential real estate market.',
      ...updated,
    ],
  },
  transactionValue: {
    id: 'transactionValue',
    title: 'Transaction Value',
    kind: 'bars',
    series: { residential: [81.8, 63.8, 72.3, 75.9, 74.1, 69.8, 71.3, 60.7, 72.3, 74.7, 69.0] },
    notes: updated,
  },
}

export const analystOpinion = [
  'The Indonesian Real Estate market has been growing rapidly, driven by shifting customer preferences, market trends, local conditions, and macroeconomic factors. The rising middle class and higher disposable income have increased demand for modern, luxurious properties with amenities like pools and security. Urbanization and population growth in major cities have boosted the need for high-rise condominiums, apartments, and mixed-use developments.',
  "Foreign investors are showing greater interest due to Indonesia's economic growth and favorable policies, while government infrastructure initiatives like new airports and roads are enhancing property values. Stable economic growth and low-interest rates have also made property investment more accessible.",
  "In summary, Indonesia's Real Estate market offers significant opportunities, fueled by growing demand, supportive policies, and a strong economy, attracting both domestic and international investors.",
]

export const methodology = [
  {
    label: 'Data coverage:',
    text: 'Figures are based on value of residential and commercial real estate, average real estate value, residential estate transactions and leases.',
  },
  {
    label: 'Modeling approach / Market size:',
    text: 'Market sizes are determined by a combined Top-Down and Bottom-Up approach, based on a specific rationale for each market segment. As a basis for evaluating markets, we use data from international organizations and industry associations. Next we use relevant key market indicators and data from country-specific associations such as GDP, price level index, household wealth, household size, number of renter and owner households, housing consumer spending per capita. This data helps us to estimate the market size for each country individually.',
  },
  {
    label: 'Forecasts:',
    text: 'In our forecasts, we apply diverse forecasting techniques. The selection of forecasting techniques is based on the behavior of the particular market. For example, exponential trend smoothing. The main drivers are GDP per capita, population, number of renter and owner households, price level index, housing consumer spending per capita.',
  },
  {
    label: 'Additional Notes:',
    text: 'The market is updated twice per year in case market dynamics change. The impacts of the Russia-Ukraine war are considered at a country-specific level.',
  },
]

/** Overview links, in page order (labels as designed: "Analyst Opinion" here, "Analyst opinion" on the card). */
export const overviewSections = [
  { id: 'value', label: 'Value' },
  { id: 'value-split', label: 'Value Split' },
  { id: 'volume', label: 'Volume' },
  { id: 'analyst-opinion', label: 'Analyst Opinion' },
  { id: 'transaction-value', label: 'Transaction Value' },
  { id: 'methodology', label: 'Methodology' },
]
