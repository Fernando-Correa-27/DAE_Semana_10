import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' })
const messages = []
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') messages.push(`${msg.type()}: ${msg.text()}`)
})
page.on('pageerror', (err) => messages.push(`pageerror: ${err.message}`))

await page.goto('http://localhost:5177', { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('theme', 'dark'))
await page.reload({ waitUntil: 'networkidle' })
await page.locator('#movies').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)

const input = page.locator('#movie-list-search')
await input.fill('zootopia')
await page.waitForTimeout(100)
const early = await page.locator('.movie-card').count()
await page.waitForTimeout(350)
const late = await page.locator('.movie-card').count()
const countText = await page.locator('.movie-list__results-count').textContent()

await input.fill('')
await page.waitForTimeout(350)
const restored = await page.locator('.movie-card').count()

console.log(JSON.stringify({ early, late, countText, restored, messages }, null, 2))
await browser.close()
