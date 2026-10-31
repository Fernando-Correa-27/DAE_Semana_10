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
await page.screenshot({ path: 'audit4-home.png', fullPage: false })

const state = await page.evaluate(() => {
  const themeButton = document.querySelector('.header__theme-toggle')
  const themeIcon = themeButton?.querySelector('svg')
  const primary = document.querySelector('.hero__btn--primary')
  const trailer = document.querySelector('.hero__btn--ghost')
  return {
    themeLabel: themeButton?.getAttribute('aria-label'),
    themeButtonBox: themeButton ? { w: themeButton.getBoundingClientRect().width, h: themeButton.getBoundingClientRect().height } : null,
    themeIconBox: themeIcon ? { w: themeIcon.getBoundingClientRect().width, h: themeIcon.getBoundingClientRect().height } : null,
    themeIconFill: themeIcon ? getComputedStyle(themeIcon).fill : null,
    primaryBg: primary ? getComputedStyle(primary).backgroundImage : null,
    trailerColor: trailer ? getComputedStyle(trailer).color : null,
    buttons: [...document.querySelectorAll('button')].map((b) => b.className),
  }
})

await page.getByRole('button', { name: 'Ver Detalles' }).click()
await page.waitForTimeout(300)
const detail = await page.evaluate(() => {
  const close = document.querySelector('.movie-detail__close')
  const star = document.querySelector('.movie-detail__score-icon')
  const showtime = document.querySelector('.movie-detail__showtime-btn')
  return {
    closeBox: close ? { w: close.getBoundingClientRect().width, h: close.getBoundingClientRect().height } : null,
    closeSvgBox: close?.querySelector('svg') ? { w: close.querySelector('svg').getBoundingClientRect().width, h: close.querySelector('svg').getBoundingClientRect().height } : null,
    starBox: star ? { w: star.getBoundingClientRect().width, h: star.getBoundingClientRect().height } : null,
    showtimeClass: showtime?.className,
  }
})
console.log(JSON.stringify({ state, detail, messages }, null, 2))
await browser.close()
