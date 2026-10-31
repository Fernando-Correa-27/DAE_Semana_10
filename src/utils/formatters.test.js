import { describe, expect, it } from 'vitest'
import {
  FALLBACK_POSTER,
  formatReleaseDate,
  getSafeTrailerUrl,
} from './formatters'

describe('formatReleaseDate', () => {
  it('formats a release date in Spanish (Peru) without time-zone shifts', () => {
    expect(formatReleaseDate('2025-11-21')).toBe('21 de noviembre de 2025')
  })

  it('returns the original value when the date is invalid', () => {
    expect(formatReleaseDate('not-a-date')).toBe('not-a-date')
  })

  it('returns an empty string when the date is missing', () => {
    expect(formatReleaseDate('')).toBe('')
  })
})

describe('getSafeTrailerUrl', () => {
  it('accepts a YouTube embed URL', () => {
    expect(getSafeTrailerUrl('https://www.youtube.com/embed/abc123')).toBe(
      'https://www.youtube.com/embed/abc123'
    )
  })

  it('accepts a privacy-enhanced YouTube embed URL', () => {
    expect(getSafeTrailerUrl('https://www.youtube-nocookie.com/embed/abc123')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123'
    )
  })

  it('accepts a Vimeo player URL', () => {
    expect(getSafeTrailerUrl('https://player.vimeo.com/video/123456')).toBe(
      'https://player.vimeo.com/video/123456'
    )
  })

  it('rejects non-HTTPS URLs', () => {
    expect(getSafeTrailerUrl('http://www.youtube.com/embed/abc123')).toBeNull()
  })

  it('rejects script URLs', () => {
    expect(getSafeTrailerUrl('javascript:alert(1)')).toBeNull()
  })

  it('rejects YouTube watch pages that are not embeds', () => {
    expect(getSafeTrailerUrl('https://www.youtube.com/watch?v=abc123')).toBeNull()
  })

  it('rejects unknown hosts', () => {
    expect(getSafeTrailerUrl('https://example.com/embed/abc123')).toBeNull()
  })

  it('returns null when no URL is provided', () => {
    expect(getSafeTrailerUrl('')).toBeNull()
    expect(getSafeTrailerUrl(undefined)).toBeNull()
  })
})

describe('FALLBACK_POSTER', () => {
  it('points to a local asset', () => {
    expect(FALLBACK_POSTER).toBe('/assets/posters/fallback.svg')
  })
})
