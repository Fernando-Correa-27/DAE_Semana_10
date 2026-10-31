import { chromium } from '@playwright/test'

const browser = await chromium.launch({ headless: true })
const sizes = [
  { width: 360, height: 800, name: '360' },
  { width: 768, height: 900, name: '768' },
  { width: 1280, height: 900, name: '1280' },
]
for (const size of sizes) {
  const page = await browser.newPage({
    viewport: { width: size.width, height: size.height },
    colorScheme: 'dark',
  })
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#movies').offsetTop))
  await page.waitForTimeout(900)
  await page.screenshot({ path: `audit5-${size.name}.png` })
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    searchInputsVisible: [...document.querySelectorAll('input[type="search"]')].filter(
      (el) => el.getBoundingClientRect().width > 0
    ).length,
    selectVisible: [...document.querySelectorAll('select')].filter(
      (el) => el.getBoundingClientRect().width > 0
    ).length,
    cards: document.querySelectorAll('.movie-card').length,
    rawButtonTags: [...document.querySelectorAll('button')].filter(
      (el) => !el.className.split(' ').includes('btn')
    ).length,
  }))
  console.log(size.name, JSON.stringify(state))
  await page.close()
}
await browser.close()
