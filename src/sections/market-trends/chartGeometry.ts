import type { ChartId, SeriesKey } from '@/data/marketTrends'

/** A text run placed at its baseline start (FigCraft's cap-trimmed box: left, bottom). */
type Placed = { text: string; x: number; y: number }

/**
 * One chart as drawn in the desktop frame (8405), in Chart Body coordinates (px). Generated from the
 * FigCraft layers: everything is placed as drawn, except bar and point heights, which come from the
 * series values (src/data/marketTrends.ts) on the axis scale (`zero` and `hundred` are the 0 and 100
 * gridlines). Value labels are the design's placeholders ("7.9", "1,6"), not the data.
 */
export type ChartGeometry = {
  /** Drawn area: x1, y1, x2, y2 (the SVG viewBox). */
  box: [number, number, number, number]
  zero: number
  hundred: number
  /** Gridlines: x, y, width. */
  grid: [number, number, number][]
  ticks: (Placed & { size: 12 | 14 })[]
  /** Reads bottom to top; x, y is the baseline start. */
  axisTitle: Placed
  years: { y: number; x: number[]; alexandria?: string[] }
  legend: {
    series: SeriesKey
    dot: [number, number]
    label: Placed & { light?: boolean; alexandria?: boolean }
  }[]
  /** Line-chart legend: the stroke through the dot, x1 to x2. */
  legendLine?: [number, number]
  valueLabels: (Placed & { rotate?: boolean; alexandria?: boolean })[]
  /** Bars: width, the bottom they rise from, and each series' x per year. */
  bars?: { width: number; bottom: number; x: Partial<Record<SeriesKey, number[]>> }
  /** Line chart: point radius and x per year. */
  points?: { r: number; x: number[] }
}

/**
 * Where the drawing sits in its card per frame. Tablet and mobile draw the desktop chart scaled
 * (`scale`, then moved by x, y) inside a plot area of `plotHeight`, as in frames 7812 and 11058; the
 * notes below the divider keep their own padding (MT4).
 */
export type ChartFrame = {
  scale: number
  x: number
  y: number
  /** Card px the legend moves sideways from its scaled place (the frames re-centre it, MT4). */
  legendShift?: number
  plotHeight: number
  notes: { top: number; left: number; right?: number; bottom: number; nowrap?: boolean }
}

export type ChartLayout = {
  geometry: ChartGeometry
  frames: Record<'base' | 'md' | 'lg', ChartFrame>
}

export const chartLayouts: Record<ChartId, ChartLayout> = {
  value: {
    geometry: {
      box: [31.94, 45.94, 878.0, 627.0],
      zero: 560.21,
      hundred: 52.47,
      grid: [
        [123.0, 52.47, 755.0],
        [118.0, 153.47, 760.0],
        [117.0, 254.47, 761.0],
        [118.0, 355.47, 760.0],
        [120.0, 457.21, 758.0],
        [123.0, 560.21, 755.0],
      ],
      ticks: [
        { text: '100', x: 77.0, y: 56.94, size: 12 },
        { text: '80', x: 77.0, y: 157.94, size: 12 },
        { text: '60', x: 77.0, y: 258.94, size: 12 },
        { text: '40', x: 77.0, y: 359.94, size: 12 },
        { text: '20', x: 77.0, y: 462.43, size: 14 },
        { text: '0', x: 88.0, y: 565.43, size: 14 },
      ],
      axisTitle: { text: 'in million USD (US$)', x: 40.94, y: 375.0 },
      years: {
        y: 584.94,
        x: [133.0, 201.0, 269.0, 341.0, 409.0, 479.0, 550.0, 621.0, 692.0, 762.0, 832.0],
        alexandria: ['2028'],
      },
      legend: [
        { series: 'total', dot: [263.0, 621.0], label: { text: 'Total', x: 280.0, y: 625.47 } },
        {
          series: 'commercial',
          dot: [340.0, 621.0],
          label: { text: 'Commercial Real Estate', x: 357.0, y: 625.47 },
        },
        {
          series: 'residential',
          dot: [526.0, 621.0],
          label: { text: 'Residential Real Estate', x: 543.0, y: 625.47 },
        },
      ],
      valueLabels: [
        { text: '1,6', x: 135.45, y: 507.0, rotate: true },
        { text: '7.9', x: 152.9, y: 381.5, rotate: true },
        { text: '1,6', x: 204.45, y: 507.0, rotate: true },
        { text: '7.9', x: 221.9, y: 388.5, rotate: true },
        { text: '1,6', x: 273.45, y: 507.0, rotate: true },
        { text: '7.9', x: 290.9, y: 396.0, rotate: true },
        { text: '1,6', x: 342.45, y: 507.04, rotate: true },
        { text: '7.9', x: 359.9, y: 388.54, rotate: true },
        { text: '1,6', x: 411.45, y: 507.04, rotate: true },
        { text: '7.9', x: 428.9, y: 375.04, rotate: true },
        { text: '1,6', x: 480.45, y: 507.04, rotate: true },
        { text: '7.9', x: 497.9, y: 370.04, rotate: true },
        { text: '1,6', x: 549.45, y: 507.04, rotate: true },
        { text: '7.9', x: 566.9, y: 362.04, rotate: true },
        { text: '1,6', x: 618.45, y: 507.04, rotate: true },
        { text: '7.9', x: 635.9, y: 347.04, rotate: true },
        { text: '1,6', x: 687.45, y: 507.04, rotate: true },
        { text: '7.9', x: 704.9, y: 358.04, rotate: true },
        { text: '1,6', x: 756.45, y: 507.04, rotate: true },
        { text: '7.9', x: 773.9, y: 343.04, rotate: true },
        { text: '1,6', x: 825.45, y: 507.0, rotate: true },
        { text: '7.9', x: 842.9, y: 334.0, rotate: true },
      ],
      bars: {
        width: 9.0,
        bottom: 551.04,
        x: {
          commercial: [
            140.45, 209.45, 278.45, 347.45, 416.45, 485.45, 554.45, 623.45, 692.45, 761.45, 830.45,
          ],
          residential: [
            156.9, 225.9, 294.9, 363.9, 432.9, 501.9, 570.9, 639.9, 708.9, 777.9, 846.9,
          ],
        },
      },
    },
    frames: {
      lg: {
        scale: 1,
        x: 0,
        y: 0,
        plotHeight: 658,
        notes: { top: 31, left: 32, bottom: 41.57, nowrap: true },
      },
      // Tablet: the auto-width notes start 11.5 px left of the card and run past both edges (MT5).
      md: {
        scale: 0.77896,
        x: -22.43,
        y: 4.61,
        plotHeight: 523.24,
        notes: { top: 31, left: -11.5, bottom: 42, nowrap: true },
      },
      base: {
        scale: 0.77896,
        x: -4.93,
        y: 4.61,
        legendShift: -156.1,
        plotHeight: 523.24,
        notes: { top: 31, left: 20, right: 20, bottom: 42 },
      },
    },
  },
  valueSplit: {
    geometry: {
      box: [31.94, 60.94, 878.0, 642.0],
      zero: 574.47,
      hundred: 67.47,
      grid: [
        [123.0, 67.47, 755.0],
        [118.0, 168.47, 760.0],
        [117.0, 269.47, 761.0],
        [118.0, 370.47, 760.0],
        [117.0, 471.47, 761.0],
        [121.0, 574.47, 757.0],
      ],
      ticks: [
        { text: '100', x: 77.0, y: 71.94, size: 12 },
        { text: '80', x: 77.0, y: 172.94, size: 12 },
        { text: '60', x: 77.0, y: 273.94, size: 12 },
        { text: '40', x: 77.0, y: 374.94, size: 12 },
        { text: '20', x: 77.0, y: 475.94, size: 12 },
        { text: '0', x: 88.0, y: 578.94, size: 12 },
      ],
      axisTitle: { text: 'In Percent', x: 40.94, y: 346.04 },
      years: {
        y: 599.98,
        x: [133.0, 200.2, 267.4, 338.6, 405.8, 475.0, 545.2, 615.4, 685.6, 754.8, 824.0],
      },
      legend: [
        {
          series: 'commercial',
          dot: [327.0, 636.0],
          label: { text: 'Commercial Real Estate', x: 344.0, y: 640.47 },
        },
        {
          series: 'residential',
          dot: [513.0, 636.0],
          label: { text: 'Residential Real Estate', x: 530.0, y: 640.47 },
        },
      ],
      valueLabels: [
        { text: '1,6', x: 140.45, y: 120.08, rotate: true },
        { text: '7.9', x: 141.0, y: 372.08, rotate: true },
        { text: '1,6', x: 209.45, y: 165.58, rotate: true },
        { text: '7.9', x: 210.0, y: 417.58, rotate: true },
        { text: '1,6', x: 278.45, y: 144.08, rotate: true },
        { text: '7.9', x: 279.0, y: 396.08, rotate: true },
        { text: '1,6', x: 347.45, y: 135.08, rotate: true },
        { text: '7.9', x: 348.0, y: 387.08, rotate: true },
        { text: '1,6', x: 416.45, y: 139.58, rotate: true },
        { text: '7.9', x: 417.0, y: 391.58, rotate: true },
        { text: '1,6', x: 485.45, y: 150.58, rotate: true },
        { text: '7.9', x: 486.0, y: 402.58, rotate: true },
        { text: '1,6', x: 554.45, y: 146.58, rotate: true },
        { text: '7.9', x: 555.0, y: 398.58, rotate: true },
        { text: '1,6', x: 623.45, y: 173.58, rotate: true },
        { text: '7.9', x: 624.0, y: 425.58, rotate: true },
        { text: '1,6', x: 692.45, y: 144.08, rotate: true },
        { text: '7.9', x: 693.0, y: 396.08, rotate: true },
        { text: '1,6', x: 758.45, y: 138.04, rotate: true },
        { text: '7.9', x: 759.0, y: 390.04, rotate: true },
        { text: '1,6', x: 827.45, y: 152.54, rotate: true },
        { text: '7.9', x: 828.0, y: 404.54, rotate: true },
      ],
      bars: {
        width: 9.0,
        bottom: 570.08,
        x: {
          commercial: [
            145.45, 214.45, 283.45, 352.45, 421.45, 490.45, 559.45, 628.45, 697.45, 763.45, 832.45,
          ],
          residential: [
            145.0, 214.0, 283.0, 352.0, 421.0, 490.0, 559.0, 628.0, 697.0, 763.0, 832.0,
          ],
        },
      },
    },
    frames: {
      lg: {
        scale: 1,
        x: 0,
        y: 0,
        plotHeight: 673,
        notes: { top: 31, left: 32, bottom: 36.57, nowrap: true },
      },
      md: {
        scale: 0.77187,
        x: -19.2,
        y: -11.61,
        plotHeight: 523.14,
        notes: { top: 40, left: 24, right: 24, bottom: 37 },
      },
      base: {
        scale: 0.77187,
        x: -4.7,
        y: -11.61,
        legendShift: -170.8,
        plotHeight: 523.14,
        notes: { top: 40, left: 24, right: 24, bottom: 37 },
      },
    },
  },
  volume: {
    geometry: {
      box: [40.44, 69.94, 886.5, 651.0],
      zero: 584.21,
      hundred: 76.47,
      grid: [
        [131.5, 76.47, 755.0],
        [126.5, 177.47, 760.0],
        [125.5, 278.47, 761.0],
        [126.5, 379.47, 760.0],
        [128.5, 481.21, 758.0],
        [131.5, 584.21, 755.0],
      ],
      ticks: [
        { text: '100', x: 85.5, y: 80.94, size: 12 },
        { text: '80', x: 85.5, y: 181.94, size: 12 },
        { text: '60', x: 85.5, y: 282.94, size: 12 },
        { text: '40', x: 85.5, y: 383.94, size: 12 },
        { text: '20', x: 85.5, y: 486.43, size: 14 },
        { text: '0', x: 96.5, y: 589.43, size: 14 },
      ],
      axisTitle: { text: 'In million', x: 49.44, y: 357.0 },
      years: {
        y: 608.94,
        x: [141.5, 209.5, 277.5, 349.5, 417.5, 487.5, 558.5, 629.5, 700.5, 770.5, 840.5],
      },
      legend: [
        {
          series: 'residential',
          dot: [400.5, 645.0],
          label: {
            text: 'Residential  Real Estate',
            x: 417.5,
            y: 649.2,
            light: true,
            alexandria: true,
          },
        },
      ],
      legendLine: [390.5, 410.5],
      valueLabels: [
        { text: '7.9', x: 152.5, y: 345.0, alexandria: true },
        { text: '7.9', x: 223.5, y: 298.0, alexandria: true },
        { text: '7.9', x: 293.5, y: 298.0, alexandria: true },
        { text: '7.9', x: 366.5, y: 239.0, alexandria: true },
        { text: '7.9', x: 430.5, y: 327.0, alexandria: true },
        { text: '7.9', x: 499.5, y: 247.0, alexandria: true },
        { text: '7.9', x: 574.5, y: 232.0, alexandria: true },
        { text: '7.9', x: 640.5, y: 197.0, alexandria: true },
        { text: '7.9', x: 710.5, y: 235.0, alexandria: true },
        { text: '7.9', x: 776.5, y: 230.0, alexandria: true },
        { text: '7.9', x: 846.5, y: 220.0, alexandria: true },
      ],
      points: {
        r: 4,
        x: [151.5, 223.5, 293.5, 366.5, 430.5, 500.5, 574.5, 640.5, 710.5, 776.5, 846.5],
      },
    },
    frames: {
      // The card keeps its desktop height (930 px) at every width; the chart sits 72 px down in it.
      lg: {
        scale: 1,
        x: 0,
        y: 0,
        plotHeight: 698,
        notes: { top: 48, left: 48, bottom: 120, nowrap: true },
      },
      md: {
        scale: 0.80067,
        x: -11.43,
        y: 98.12,
        legendShift: -93.7,
        plotHeight: 698,
        notes: { top: 48, left: 24, bottom: 120, nowrap: true },
      },
      base: {
        scale: 0.80067,
        x: -11.43,
        y: 98.12,
        legendShift: -232.7,
        plotHeight: 698,
        notes: { top: 48, left: 24, bottom: 120, nowrap: true },
      },
    },
  },
  transactionValue: {
    geometry: {
      box: [31.94, 60.94, 878.0, 642.0],
      zero: 575.21,
      hundred: 67.47,
      grid: [
        [123.0, 67.47, 755.0],
        [118.0, 168.47, 760.0],
        [117.0, 269.47, 761.0],
        [118.0, 370.47, 760.0],
        [120.0, 472.21, 758.0],
        [123.0, 575.21, 755.0],
      ],
      ticks: [
        { text: '100', x: 77.0, y: 71.94, size: 12 },
        { text: '80', x: 77.0, y: 172.94, size: 12 },
        { text: '60', x: 77.0, y: 273.94, size: 12 },
        { text: '40', x: 77.0, y: 374.94, size: 12 },
        { text: '20', x: 77.0, y: 477.43, size: 14 },
        { text: '0', x: 88.0, y: 580.43, size: 14 },
      ],
      axisTitle: { text: 'In Percent', x: 40.94, y: 348.0 },
      years: {
        y: 599.94,
        x: [133.0, 201.0, 269.0, 341.0, 409.0, 479.0, 550.0, 621.0, 692.0, 762.0, 832.0],
      },
      legend: [
        {
          series: 'residential',
          dot: [393.0, 636.0],
          label: { text: 'Residential Real Estate', x: 410.0, y: 640.47 },
        },
      ],
      valueLabels: [
        { text: '7.9', x: 141.0, y: 372.04, rotate: true },
        { text: '7.9', x: 210.0, y: 417.54, rotate: true },
        { text: '7.9', x: 279.0, y: 396.04, rotate: true },
        { text: '7.9', x: 348.0, y: 387.04, rotate: true },
        { text: '7.9', x: 417.0, y: 391.54, rotate: true },
        { text: '7.9', x: 486.0, y: 402.54, rotate: true },
        { text: '7.9', x: 555.0, y: 398.54, rotate: true },
        { text: '7.9', x: 624.0, y: 425.54, rotate: true },
        { text: '7.9', x: 693.0, y: 396.04, rotate: true },
        { text: '7.9', x: 762.0, y: 390.04, rotate: true },
        { text: '7.9', x: 831.0, y: 404.54, rotate: true },
      ],
      bars: {
        width: 9.0,
        bottom: 570.04,
        x: {
          residential: [
            145.0, 214.0, 283.0, 352.0, 421.0, 490.0, 559.0, 628.0, 697.0, 766.0, 835.0,
          ],
        },
      },
    },
    frames: {
      lg: {
        scale: 1,
        x: 0,
        y: 0,
        plotHeight: 673,
        notes: { top: 31.04, left: 32, bottom: 36.53, nowrap: true },
      },
      md: {
        scale: 0.76596,
        x: -16.51,
        y: -0.24,
        legendShift: -6.75,
        plotHeight: 538.72,
        notes: { top: 48, left: 24, bottom: 48, nowrap: true },
      },
      base: {
        scale: 0.76596,
        x: -4.01,
        y: -0.24,
        legendShift: -161.2,
        plotHeight: 538.72,
        notes: { top: 48, left: 24, bottom: 48, nowrap: true },
      },
    },
  },
}
