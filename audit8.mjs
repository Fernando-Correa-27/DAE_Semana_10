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

await page.locator('#movie-list-search').fill('película inexistente')
await page.waitForTimeout(450)
const emptyTitle = await page.locator('.empty-state__title').textContent()
const emptyMessage = await page.locator('.empty-state__message').textContent()
const countBefore = await page.locator('.movie-card').count()
await page.locator('#movies').scrollIntoViewIfNeeded()
await page.screenshot({ path: 'audit8-empty.png' })

await page.getByRole('button', { name: 'Limpiar filtros' }).click()
await page.waitForTimeout(450)
const countAfter = await page.locator('.movie-card').count()
const inputAfter = await page.locator('#movie-list-search').inputValue()

console.log(
  JSON.stringify({ emptyTitle, emptyMessage, countBefore, countAfter, inputAfter, messages }, null, 2)
)
await browser.close()
