import { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import MovieDetailModal from './MovieDetailModal'

const baseMovie = {
  id: 1,
  title: 'Wicked: For Good',
  poster: '/assets/posters/wicked-for-good.webp',
  synopsis: 'La conclusión épica de la historia de las brujas de Oz.',
  ageRating: 'PG',
  score: 4.8,
  runtime: '144 min',
  genres: ['Musical', 'Fantasía', 'Drama'],
  releaseDate: '2025-11-21',
  showtimes: ['14:00', '16:30', '19:00'],
  trailer: 'https://www.youtube.com/embed/6DM3tQuhTSk',
}

function DetailHarness({ movie = baseMovie, initialSection = 'details' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir detalle
      </button>
      {open && (
        <MovieDetailModal
          movie={movie}
          onClose={() => setOpen(false)}
          initialSection={initialSection}
        />
      )}
    </>
  )
}

describe('MovieDetailModal', () => {
  it('opens as a dialog and shows the poster, metadata, chips and trailer', async () => {
    const user = userEvent.setup()
    render(<DetailHarness />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByRole('heading', { name: 'Wicked: For Good' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Póster de Wicked: For Good/i })).toBeInTheDocument()
    expect(screen.getByText('21 de noviembre de 2025')).toBeInTheDocument()
    expect(screen.getByText('Musical')).toBeInTheDocument()
    expect(screen.getByText('14:00')).toBeInTheDocument()
    expect(screen.getByTitle('Tráiler de Wicked: For Good')).toBeInTheDocument()
  })

  it('closes with the close button and returns focus to the opener', async () => {
    const user = userEvent.setup()
    render(<DetailHarness />)
    const opener = screen.getByRole('button', { name: 'Abrir detalle' })

    await user.click(opener)
    await user.click(screen.getByRole('button', { name: 'Cerrar detalle' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(opener).toHaveFocus()
  })

  it('closes with Escape and restores background scrolling', async () => {
    const user = userEvent.setup()
    render(<DetailHarness />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(document.body.style.overflow).toBe('')
  })

  it('closes when the backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<DetailHarness />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog.parentElement)

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('shows the fallback message when the movie has no valid trailer', async () => {
    const user = userEvent.setup()
    const movieWithoutTrailer = { ...baseMovie, trailer: '' }
    render(<DetailHarness movie={movieWithoutTrailer} />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))

    expect(screen.getByText('Tráiler no disponible')).toBeInTheDocument()
    expect(screen.queryByTitle(/Tráiler de/)).not.toBeInTheDocument()
  })

  it('rejects non-https trailer URLs instead of embedding them', async () => {
    const user = userEvent.setup()
    const movieWithUnsafeTrailer = { ...baseMovie, trailer: 'javascript:alert(1)' }
    render(<DetailHarness movie={movieWithUnsafeTrailer} />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))

    expect(screen.getByText('Tráiler no disponible')).toBeInTheDocument()
    expect(screen.queryByTitle(/Tráiler de/)).not.toBeInTheDocument()
  })

  it('replaces a broken poster with the local fallback image', async () => {
    const user = userEvent.setup()
    render(<DetailHarness />)

    await user.click(screen.getByRole('button', { name: 'Abrir detalle' }))
    const poster = screen.getByRole('img', { name: /Póster de Wicked: For Good/i })
    fireEvent.error(poster)

    expect(screen.getByRole('img', { name: 'Póster no disponible' })).toHaveAttribute(
      'src',
      '/assets/posters/fallback.svg'
    )
  })
})
