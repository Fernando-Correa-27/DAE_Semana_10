import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const results = []
for (const size of [
  { width: 1280, height: 900, name: '1280' },
  { width: 360, height: 800, name: '360' },
]) {
  const page = await browser.newPage({
    viewport: { width: size.width, height: size.height },
    colorScheme: 'dark',
  })
  const messages = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') messages.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => messages.push(`pageerror: ${err.message}`))

  await page.goto('http://localhost:5177', { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.reload({ waitUntil: 'networkidle' })

  const searchInputs = await page.locator('input[type="search"]').count()
  const heroSearchInside = await page.locator('.hero #hero-search').count()
  const genreSelects = await page.locator('select').count()
  await page.locator('#hero-search').fill('zootopia')
  await page.waitForTimeout(450)
  const cards = await page.locator('.movie-card').count()
  const countText = await page.locator('.movie-list__results-count').textContent()
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

  await page.screenshot({ path: `audit9-hero-${size.name}.png` })

  await page.locator('#movies').scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  await page.screenshot({ path: `audit9-results-${size.name}.png` })

  results.push({
    size: size.name,
    searchInputs,
    heroSearchInside,
    genreSelects,
    cards,
    countText,
    scrollWidth,
    clientWidth,
    messages,
  })
  await page.close()
}
console.log(JSON.stringify(results, null, 2))
await browser.close()
