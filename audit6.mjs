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

const inputs = page.locator('input[type="search"]')
const header = page.locator('#header-search')
const list = page.locator('#movie-list-search')

await header.fill('zootopia')
await page.waitForTimeout(500)
const sharedValue = await list.inputValue()
const countText = await page.locator('.movie-list__results-count').textContent()

await page.screenshot({ path: 'audit6-shared-search.png' })

await page.getByRole('button', { name: 'Limpiar búsqueda' }).first().click()
await page.waitForTimeout(300)
const headerAfterClear = await header.inputValue()
const listAfterClear = await list.inputValue()

console.log(
  JSON.stringify(
    {
      searchInputs: await inputs.count(),
      sharedValue,
      countText,
      headerAfterClear,
      listAfterClear,
      messages,
    },
    null,
    2
  )
)
await browser.close()
