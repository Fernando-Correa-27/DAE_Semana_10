import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'
import {
  FALLBACK_POSTER,
  formatReleaseDate,
  getSafeTrailerUrl,
} from '../../utils/formatters'
import './MovieDetailModal.css'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Accessible movie detail dialog rendered in a portal on document.body.
 * It locks background scrolling, traps focus, closes with Escape, the close
 * button or a backdrop click, and returns focus to the element that opened it.
 */
function MovieDetailModal({ movie, onClose, initialSection = 'details' }) {
  const [posterFailed, setPosterFailed] = useState(false)
  const dialogRef = useRef(null)
  const trailerSectionRef = useRef(null)
  const titleId = useId()
  const synopsisId = useId()
  const synopsisHeadingId = useId()

  const releaseDate = formatReleaseDate(movie.releaseDate)
  const trailerUrl = getSafeTrailerUrl(movie.trailer)
  const posterSrc = posterFailed || !movie.poster ? FALLBACK_POSTER : movie.poster

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    dialogRef.current?.querySelector('.movie-detail-modal__close')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    if (initialSection !== 'trailer') return

    const target = trailerSectionRef.current
    target?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }, [initialSection])

  return createPortal(
    <div className="movie-detail-modal__backdrop" onClick={onClose} role="presentation">
      <div
        className="movie-detail-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={synopsisId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <Button
          variant="ghost"
          iconOnly
          className="movie-detail-modal__close"
          onClick={onClose}
          aria-label={UI_TEXT.CLOSE_DETAIL}
          title={UI_TEXT.CLOSE_DETAIL}
        >
          <svg
            className="btn__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Button>

        <div className="movie-detail-modal__scroll">
          <div className="movie-detail-modal__grid">
            <div className="movie-detail-modal__poster-column">
              <img
                className="movie-detail-modal__poster"
                src={posterSrc}
                alt={
                  posterFailed
                    ? UI_TEXT.POSTER_FALLBACK_ALT
                    : `${UI_TEXT.POSTER_ALT} ${movie.title}`
                }
                onError={() => setPosterFailed(true)}
              />
            </div>

            <div className="movie-detail-modal__info">
              <p className="movie-detail-modal__eyebrow">{UI_TEXT.DETAIL_DIALOG_LABEL}</p>
              <h2 className="movie-detail-modal__title" id={titleId}>
                {movie.title}
              </h2>

              <dl className="movie-detail-modal__meta">
                <div className="movie-detail-modal__meta-item">
                  <dt>{UI_TEXT.AGE_RATING_LABEL}</dt>
                  <dd>
                    <span className="movie-detail-modal__age">{movie.ageRating}</span>
                  </dd>
                </div>
                <div className="movie-detail-modal__meta-item">
                  <dt>{UI_TEXT.RUNTIME_LABEL}</dt>
                  <dd>{movie.runtime}</dd>
                </div>
                <div className="movie-detail-modal__meta-item">
                  <dt>{UI_TEXT.SCORE_LABEL}</dt>
                  <dd>
                    <span
                      className="movie-detail-modal__score"
                      aria-label={`${UI_TEXT.SCORE_LABEL}: ${movie.score} ${UI_TEXT.SCORE_OUT_OF}`}
                    >
                      <svg
                        className="movie-detail-modal__score-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      {movie.score}
                      <span className="movie-detail-modal__score-max">
                        {UI_TEXT.SCORE_OUT_OF}
                      </span>
                    </span>
                  </dd>
                </div>
                <div className="movie-detail-modal__meta-item">
                  <dt>{UI_TEXT.RELEASE_DATE_LABEL}</dt>
                  <dd>
                    <time dateTime={movie.releaseDate}>{releaseDate}</time>
                  </dd>
                </div>
              </dl>

              {movie.genres?.length > 0 && (
                <div className="movie-detail-modal__genres" aria-label={UI_TEXT.GENRES_LABEL}>
                  {movie.genres.map((genre) => (
                    <span key={genre} className="movie-detail-modal__chip">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <section
                className="movie-detail-modal__section"
                aria-labelledby={synopsisHeadingId}
              >
                <h3 className="movie-detail-modal__section-title" id={synopsisHeadingId}>
                  {UI_TEXT.SYNOPSIS}
                </h3>
                <p className="movie-detail-modal__synopsis" id={synopsisId}>
                  {movie.synopsis}
                </p>
              </section>

              {movie.showtimes?.length > 0 && (
                <section
                  className="movie-detail-modal__section"
                  aria-labelledby={`${titleId}-showtimes`}
                >
                  <h3
                    className="movie-detail-modal__section-title"
                    id={`${titleId}-showtimes`}
                  >
                    {UI_TEXT.SHOWTIMES}
                  </h3>
                  <ul className="movie-detail-modal__chips">
                    {movie.showtimes.map((time) => (
                      <li key={time} className="movie-detail-modal__chip">
                        {time}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section
                className="movie-detail-modal__section movie-detail-modal__trailer"
                ref={trailerSectionRef}
                aria-labelledby={`${titleId}-trailer`}
              >
                <h3
                  className="movie-detail-modal__section-title"
                  id={`${titleId}-trailer`}
                  tabIndex={-1}
                >
                  {UI_TEXT.TRAILER_HEADING}
                </h3>
                {trailerUrl ? (
                  <div className="movie-detail-modal__trailer-frame">
                    <iframe
                      src={trailerUrl}
                      title={`${UI_TEXT.TRAILER_IFRAME_TITLE} ${movie.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ) : (
                  <p className="movie-detail-modal__trailer-unavailable" role="status">
                    {UI_TEXT.TRAILER_UNAVAILABLE}
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

MovieDetailModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    synopsis: PropTypes.string.isRequired,
    ageRating: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    runtime: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    releaseDate: PropTypes.string,
    showtimes: PropTypes.arrayOf(PropTypes.string),
    trailer: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  initialSection: PropTypes.oneOf(['details', 'trailer']),
}

export default MovieDetailModal
