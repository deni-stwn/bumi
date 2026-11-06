// Scroll-reveal check of every route at the frame widths in qa.config.json: scrolls each page to the bottom, then fails
// if any [data-reveal] element is still hidden, keeps inline GSAP styles or a SplitText wrapper, if an
// element traps the scroll (scrolls vertically by itself), or if the console logged an error or warning. Also prints the page height, which must not change
// with motion on or off (no layout shift).
// Usage: npm run dev, then: npm run qa:motion [-- http://localhost:5173]
// Needs Google Chrome installed.
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'

const base = process.argv[2] ?? 'http://localhost:5173'
// Frame widths and routes: scripts/qa.config.json (every page, plus one unknown path for the 404).
const { widths, routes } = JSON.parse(
  readFileSync(new URL('./qa.config.json', import.meta.url), 'utf8'),
)

const port = 9700 + Math.floor(Math.random() * 200)
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpdir()}/qa-motion-${port}`,
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
const logs = []
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
  if (m.method === 'Runtime.exceptionThrown') {
    logs.push(m.params.exceptionDetails.exception?.description ?? 'exception')
  }
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
    logs.push(m.params.args.map((a) => a.value ?? a.description).join(' '))
  }
})
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id
    pending.set(i, r)
    ws.send(JSON.stringify({ id: i, method, params }))
  })
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }))?.result
    ?.value

const scrollToBottom = `new Promise(async (done) => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 300) {
    scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 90))
  }
  done()
})`

const findProblems = `(() => {
  const problems = []
  const parts = (el) => {
    const kind = el.dataset.reveal
    if (kind === 'stagger') return [el, ...el.children]
    if (kind === 'media') return [el, el.querySelector('img')].filter(Boolean)
    if (kind === 'wordmark') return [el, el.firstElementChild].filter(Boolean)
    if (kind === 'bars') return [el, ...el.querySelectorAll('[data-bar]')]
    return [el]
  }
  for (const el of document.querySelectorAll('[data-reveal]')) {
    for (const part of parts(el)) {
      const label = el.dataset.reveal + ' "' + (part.textContent || '').trim().slice(0, 32) + '"'
      if (Number(getComputedStyle(part).opacity) < 0.05) problems.push('hidden ' + label)
      if (part.style.opacity || part.style.transform || part.style.clipPath) {
        problems.push('inline style left ' + label + ': ' + part.getAttribute('style'))
      }
    }
    if (el.dataset.reveal === 'lines' && el.querySelector(':scope > div > div')) {
      problems.push('SplitText not reverted "' + el.textContent.trim().slice(0, 32) + '"')
    }
  }
  // Scroll traps: an element on the page that scrolls vertically by itself catches the wheel (on a
  // Mac the whole gesture latches to it), so the page stops scrolling until the pointer leaves it.
  // A horizontal row with overflow-x: auto gets overflow-y: auto too unless it says hidden, and the
  // text's descenders below a trimmed line are enough to make it scroll. Intended vertical
  // scrollers (none on the page so far) would carry data-scroll-y.
  for (const el of document.body.querySelectorAll('*')) {
    if (el.closest('[data-scroll-y], dialog')) continue
    const overflowY = getComputedStyle(el).overflowY
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
      const name = el.getAttribute('aria-label') || el.className.toString().slice(0, 48)
      problems.push('scroll trap: ' + el.tagName.toLowerCase() + ' "' + name + '" scrolls ' +
        (el.scrollHeight - el.clientHeight) + ' px vertically (add overflow-y-hidden)')
    }
  }
  return problems
})()`

await send('Page.enable')
await send('Runtime.enable')
let failures = 0
for (const width of widths) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width < 1024,
  })
  for (const route of routes) {
    logs.length = 0
    await send('Page.navigate', { url: base + route })
    await sleep(800)
    await evaluate(scrollToBottom)
    await sleep(3200)
    const problems = [...(await evaluate(findProblems)), ...logs.map((l) => 'console: ' + l)]
    const height = await evaluate('document.documentElement.scrollHeight')
    failures += problems.length
    console.log(
      `${width}px ${route.padEnd(44)} ${String(height).padStart(5)} px  ${problems.length ? problems.join('\n      ') : 'OK'}`,
    )
  }
}
ws.close()
chrome.kill()
process.exit(failures ? 1 : 0)
