import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('wicked', 300))

    expect(result.current).toBe('wicked')
  })

  it('updates only after the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'wicked' } }
    )

    rerender({ value: 'wicked 2' })
    expect(result.current).toBe('wicked')

    act(() => vi.advanceTimersByTime(299))
    expect(result.current).toBe('wicked')

    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('wicked 2')
  })

  it('restarts the timer when the value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'z' } }
    )

    rerender({ value: 'zo' })
    act(() => vi.advanceTimersByTime(200))
    rerender({ value: 'zoo' })
    act(() => vi.advanceTimersByTime(200))
    expect(result.current).toBe('z')

    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('zoo')
  })

  it('clears the pending timer on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('pending', 300))

    unmount()
    act(() => vi.advanceTimersByTime(300))

    expect(vi.getTimerCount()).toBe(0)
  })
})
