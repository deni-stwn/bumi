// Full-page screenshot with device emulation (Chrome DevTools Protocol), for visual QA against Figma.
// Usage: npm run qa:shot -- <url> <width> <out.png> [mobile=1|0] [js-to-run-before-capture] [clip-height]
// Needs Google Chrome installed. Reports scrollWidth so horizontal overflow is caught by numbers.
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
const [, , url, width, out, mobile = '1', pre = '', clipH = ''] = process.argv
const port = 9333 + Math.floor(Math.random() * 500)
const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpdir()}/qa-shot-${port}`,
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
const w = Number(width)
await send('Emulation.setDeviceMetricsOverride', {
  width: w,
  height: 900,
  deviceScaleFactor: 1,
  mobile: mobile === '1',
})
await send('Page.enable')
await send('Page.navigate', { url })
await sleep(2500)
// Scroll through the page so lazy images load, then measure the full height.
const {
  result: { value: h },
} = await send('Runtime.evaluate', {
  expression: `(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0);await new Promise(r=>setTimeout(r,600));return document.documentElement.scrollHeight})()`,
  awaitPromise: true,
  returnByValue: true,
})
const {
  result: { value: overflow },
} = await send('Runtime.evaluate', {
  expression: 'document.documentElement.scrollWidth',
  returnByValue: true,
})
const H = clipH ? Number(clipH) : h
await send('Emulation.setDeviceMetricsOverride', {
  width: w,
  height: H,
  deviceScaleFactor: 1,
  mobile: mobile === '1',
})
await sleep(500)
if (pre) {
  await send('Runtime.evaluate', { expression: pre, awaitPromise: true })
  await sleep(700)
}
const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: w, height: H, scale: 1 },
})
writeFileSync(out, Buffer.from(shot.data, 'base64'))
console.log(JSON.stringify({ width: w, height: h, scrollWidth: overflow }))
ws.close()
chrome.kill()
