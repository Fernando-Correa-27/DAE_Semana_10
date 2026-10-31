import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import MovieSearch from './MovieSearch'

function renderSearch(props = {}) {
  const onChange = vi.fn()
  const utils = render(
    <MovieSearch id="test-search" value="" onChange={onChange} {...props} />
  )
  return { ...utils, onChange }
}

describe('MovieSearch', () => {
  it('renders a controlled search box with an accessible label', () => {
    renderSearch()

    expect(
      screen.getByRole('searchbox', { name: 'Buscar películas' })
    ).toBeInTheDocument()
  })

  it('reports every change to the parent', () => {
    const { onChange } = renderSearch()
    const input = screen.getByRole('searchbox', { name: 'Buscar películas' })

    fireEvent.change(input, { target: { value: 'zootopia' } })

    expect(onChange).toHaveBeenCalledWith('zootopia')
  })

  it('renders the value supplied by the parent', () => {
    renderSearch({ value: 'wicked' })

    expect(screen.getByRole('searchbox', { name: 'Buscar películas' })).toHaveValue(
      'wicked'
    )
  })

  it('clears the query through the reusable button', async () => {
    const user = userEvent.setup()
    const { onChange } = renderSearch({ value: 'wicked' })

    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('does not render the clear button for an empty query', () => {
    renderSearch()

    expect(
      screen.queryByRole('button', { name: 'Limpiar búsqueda' })
    ).not.toBeInTheDocument()
  })
})
