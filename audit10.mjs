import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' })
const messages = []
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') messages.push(`${msg.type()}: ${msg.text()}`)
})
page.on('pageerror', (err) => messages.push(`pageerror: ${err.message}`))

await page.goto('http://localhost:5177', { waitUntil: 'networkidle' })
await page.evaluate(() => {
  localStorage.setItem('theme', 'dark')
  localStorage.removeItem('favorites')
})
await page.reload({ waitUntil: 'networkidle' })
await page.locator('#movies').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)

const favorite = page.locator('.movie-card__favorite').first()
await favorite.click()
await page.waitForTimeout(250)
const storedAfterClick = await page.evaluate(() => localStorage.getItem('favorites'))

await page.reload({ waitUntil: 'networkidle' })
await page.locator('#movies').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)
const pressedAfterReload = await page.locator('.movie-card__favorite').first().getAttribute('aria-pressed')

await page.evaluate(() => localStorage.setItem('favorites', '{not-json'))
await page.reload({ waitUntil: 'networkidle' })
await page.locator('#movies').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)
const pressedAfterCorrupt = await page.locator('.movie-card__favorite').first().getAttribute('aria-pressed')
const repairedValue = await page.evaluate(() => localStorage.getItem('favorites'))

console.log(
  JSON.stringify({ storedAfterClick, pressedAfterReload, pressedAfterCorrupt, repairedValue, messages }, null, 2)
)
await browser.close()
