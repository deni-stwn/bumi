// Accessibility audit (axe-core, WCAG 2.2 A/AA + best practices) of every route at the frame widths in qa.config.json.
// Usage: npm run dev, then: npm run qa:a11y [-- http://localhost:5173]
// Needs Google Chrome installed.
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'

const base = process.argv[2] ?? 'http://localhost:5173'
// Frame widths and routes: scripts/qa.config.json (every page, plus one unknown path for the 404).
const { widths, routes } = JSON.parse(
  readFileSync(new URL('./qa.config.json', import.meta.url), 'utf8'),
)
const axeSource = readFileSync(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
  'utf8',
)

const port = 9700 + Math.floor(Math.random() * 200)
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpdir()}/qa-a11y-${port}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200)
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(
      (t) => t.type === 'page',
    )
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
})
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id
    pending.set(i, r)
    ws.send(JSON.stringify({ id: i, method, params }))
  })

let failures = 0
for (const width of widths) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width < 1024,
  })
  // Audit the content, not a frame of the scroll reveals: with reduced motion nothing is hidden.
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })
  for (const route of routes) {
    await send('Page.navigate', { url: base + route })
    await sleep(2000)
    await send('Runtime.evaluate', { expression: axeSource })
    // Low-contrast colours the client chose to keep (design-notes G4) are marked
    // data-design-contrast: they are counted, but not failed, for the colour-contrast rule only.
    const { result } = await send('Runtime.evaluate', {
      expression: `axe.run(document, { runOnly: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] })
        .then(r => {
          const isDesign = (n) => document.querySelector(n.target[n.target.length - 1])?.closest('[data-design-contrast]')
          let excepted = 0
          const violations = r.violations
            .map(v => {
              if (v.id !== 'color-contrast') return v
              const nodes = v.nodes.filter(n => !isDesign(n))
              excepted += v.nodes.length - nodes.length
              return { ...v, nodes }
            })
            .filter(v => v.nodes.length)
            .map(v => v.id + ' (' + v.nodes.length + ')')
          return JSON.stringify({ violations, excepted })
        })`,
      awaitPromise: true,
      returnByValue: true,
    })
    const { violations, excepted } = JSON.parse(result.value)
    failures += violations.length
    console.log(
      `${width}px ${route.padEnd(44)} ${violations.length ? violations.join(', ') : 'OK'}${excepted ? `  [design contrast exceptions: ${excepted}]` : ''}`,
    )
  }
}
ws.close()
chrome.kill()
process.exitCode = failures ? 1 : 0
