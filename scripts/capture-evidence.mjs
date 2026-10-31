import { mkdirSync } from 'node:fs'
import { chromium } from '@playwright/test'

const baseUrl = process.env.EVIDENCE_URL || 'http://localhost:5173'
const outputDir = 'docs/lab-10/evidence'
mkdirSync(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const messages = []

async function newPage(width, height) {
  const page = await browser.newPage({
    viewport: { width, height },
    colorScheme: 'dark',
  })

  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      messages.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`))

  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.reload({ waitUntil: 'networkidle' })
  return page
}

async function scrollToMovies(page) {
  await page.locator('#movies').scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
}

// Desktop: home, search results, detail, favorites and empty state.
const desktop = await newPage(1280, 900)
await desktop.screenshot({ path: `${outputDir}/screenshot-01-homepage.jpeg`, type: 'jpeg', quality: 88 })

await desktop.locator('.movie-search__input').fill('zootopia')
await desktop.waitForTimeout(700)
await scrollToMovies(desktop)
await desktop.screenshot({ path: `${outputDir}/screenshot-02-search-results.jpeg`, type: 'jpeg', quality: 88 })

await desktop.locator('.movie-card').first().getByRole('button', { name: 'Ver Detalles' }).click()
await desktop.waitForTimeout(500)
await desktop.screenshot({ path: `${outputDir}/screenshot-03-movie-detail.jpeg`, type: 'jpeg', quality: 88 })
await desktop.getByRole('button', { name: 'Cerrar detalle' }).click()

await desktop.locator('.movie-search__input').fill('')
await desktop.waitForTimeout(700)
await scrollToMovies(desktop)
await desktop.locator('.movie-card').first().getByRole('button', { name: /Agregar a favoritos/i }).click()
await desktop.waitForTimeout(300)
await desktop.screenshot({ path: `${outputDir}/screenshot-04-favorites.jpeg`, type: 'jpeg', quality: 88 })

await desktop.locator('.movie-search__input').fill('película inexistente')
await desktop.waitForTimeout(700)
await scrollToMovies(desktop)
await desktop.screenshot({ path: `${outputDir}/screenshot-05-empty-state.jpeg`, type: 'jpeg', quality: 88 })
await desktop.close()

// Tablet and mobile: layout and detail at the smallest width.
for (const { width, height, name } of [
  { width: 768, height: 900, name: '768' },
  { width: 360, height: 800, name: '360' },
]) {
  const page = await newPage(width, height)
  await page.screenshot({
    path: `${outputDir}/screenshot-06-responsive-${name}.jpeg`,
    type: 'jpeg',
    quality: 88,
  })

  await page.locator('.movie-search__input').fill('wicked')
  await page.waitForTimeout(700)
  await scrollToMovies(page)
  await page.locator('.movie-card').first().getByRole('button', { name: 'Ver Detalles' }).click()
  await page.waitForTimeout(500)
  await page.screenshot({
    path: `${outputDir}/screenshot-07-detail-${name}.jpeg`,
    type: 'jpeg',
    quality: 88,
  })
  await page.close()
}

// Trailer shortcut from the banner.
const trailerPage = await newPage(1280, 900)
await trailerPage.getByRole('button', { name: 'Tráiler' }).click()
await trailerPage.waitForTimeout(900)
await trailerPage.screenshot({
  path: `${outputDir}/screenshot-08-trailer-section.jpeg`,
  type: 'jpeg',
  quality: 88,
})
await trailerPage.close()

await browser.close()

console.log(`Evidence written to ${outputDir}`)
console.log(messages.length > 0 ? messages.join('\n') : 'No console errors or warnings.')
