const DATE_FORMATTER = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const YOUTUBE_HOSTS = new Set(['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com'])
const VIMEO_HOSTS = new Set(['player.vimeo.com'])

/**
 * Formats an ISO date (YYYY-MM-DD) for the Spanish (Peru) interface without
 * shifting the day because of the browser time zone.
 */
export function formatReleaseDate(value) {
  if (!value) return ''

  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value

  return DATE_FORMATTER.format(date)
}

/**
 * Returns a safe embed URL or null. Only HTTPS YouTube and Vimeo embed URLs
 * are accepted so a movie record cannot inject an arbitrary iframe source.
 */
export function getSafeTrailerUrl(value) {
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null

    if (YOUTUBE_HOSTS.has(url.hostname) && url.pathname.startsWith('/embed/')) {
      return url.toString()
    }

    if (VIMEO_HOSTS.has(url.hostname) && url.pathname.startsWith('/video/')) {
      return url.toString()
    }

    return null
  } catch {
    return null
  }
}

export const FALLBACK_POSTER = '/assets/posters/fallback.svg'
