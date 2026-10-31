import { beforeEach, describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from './constants'
import { readFavoriteIds, writeFavoriteIds } from './favorites'

const VALID_IDS = [1, 2, 3, 4, 5, 6, 7, 8]

describe('favorites storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty list when there is no stored value', () => {
    expect(readFavoriteIds(VALID_IDS)).toEqual([])
  })

  it('reads and sanitizes valid IDs', () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([1, 2, 2, 99, '3']))

    expect(readFavoriteIds(VALID_IDS)).toEqual([1, 2, 3])
  })

  it('tolerates corrupt JSON', () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, '{not-json')

    expect(() => readFavoriteIds(VALID_IDS)).not.toThrow()
    expect(readFavoriteIds(VALID_IDS)).toEqual([])
  })

  it('tolerates values that are not arrays', () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify({ id: 1 }))

    expect(readFavoriteIds(VALID_IDS)).toEqual([])
  })

  it('writes only numeric, unique IDs', () => {
    expect(writeFavoriteIds([1, 1, 2, '3', null])).toBe(true)

    expect(localStorage.getItem(STORAGE_KEYS.FAVORITES)).toBe('[1,2]')
  })

  it('returns false instead of throwing when storage is unavailable', () => {
    const original = Storage.prototype.setItem
    Storage.prototype.setItem = () => {
      throw new Error('quota exceeded')
    }

    try {
      expect(writeFavoriteIds([1])).toBe(false)
    } finally {
      Storage.prototype.setItem = original
    }
  })
})
