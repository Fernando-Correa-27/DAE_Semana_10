import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('announces the empty result to assistive technology', () => {
    render(<EmptyState />)

    expect(screen.getByRole('status')).toHaveTextContent('Sin resultados')
  })

  it('renders a clear action when the parent provides one', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <EmptyState
        title="Sin resultados"
        message="No se encontraron películas con esos criterios."
        actionLabel="Limpiar búsqueda"
        onAction={onAction}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('omits the action when there is no callback', () => {
    render(<EmptyState actionLabel="Limpiar búsqueda" />)

    expect(
      screen.queryByRole('button', { name: 'Limpiar búsqueda' })
    ).not.toBeInTheDocument()
  })
})
