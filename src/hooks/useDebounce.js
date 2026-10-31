import { useEffect, useState } from 'react'

/**
 * Returns a debounced copy of a value. The timer is reset on every change and
 * cleared on unmount, so callers can filter expensive lists only after the
 * user stops typing.
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
