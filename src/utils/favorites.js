import { STORAGE_KEYS } from './constants'

/**
 * Reads favorite movie IDs from localStorage. Corrupt JSON, non-array values,
 * unknown IDs and duplicates are discarded instead of crashing the app.
 */
export function readFavoriteIds(validMovieIds = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const validIds = new Set(validMovieIds)
    const seen = new Set()
    const favoriteIds = []

    for (const value of parsed) {
      const id = typeof value === 'number' ? value : Number(value)
      if (Number.isInteger(id) && validIds.has(id) && !seen.has(id)) {
        seen.add(id)
        favoriteIds.push(id)
      }
    }

    return favoriteIds
  } catch {
    return []
  }
}

/**
 * Persists only valid numeric IDs. Storage quota or privacy errors are ignored
 * so favoriting still works for the current session.
 */
export function writeFavoriteIds(ids) {
  try {
    const safeIds = [...new Set(ids.filter(Number.isInteger))]
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(safeIds))
    return true
  } catch {
    return false
  }
}
