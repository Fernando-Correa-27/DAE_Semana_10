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

const firstCard = page.locator('.movie-card').first()
const favorite = firstCard.locator('.movie-card__favorite')
const before = await favorite.getAttribute('aria-pressed')
const labelBefore = await favorite.getAttribute('aria-label')
await favorite.click()
await page.waitForTimeout(200)
const after = await favorite.getAttribute('aria-pressed')
const labelAfter = await favorite.getAttribute('aria-label')
const activeCount = await page.locator('.movie-card__favorite[aria-pressed="true"]').count()
await page.screenshot({ path: 'audit-favorite.png' })

await page.reload({ waitUntil: 'networkidle' })
const afterReload = await page.locator('.movie-card__favorite').first().getAttribute('aria-pressed')

console.log(JSON.stringify({ before, after, labelBefore, labelAfter, activeCount, afterReload, messages }, null, 2))
await browser.close()
