import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'

/**
 * Movie detail dialog. It is rendered by the parent and exposes the full
 * synopsis, metadata, showtimes and trailer for the selected movie.
 */
function MovieDetail({ movie, onClose }) {
  if (!movie) return null

  return (
    <div className="movie-detail__backdrop" onClick={onClose} role="presentation">
      <div
        className="movie-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Button
          variant="ghost"
          iconOnly
          className="movie-detail__close"
          onClick={onClose}
          aria-label={UI_TEXT.CLOSE_DETAIL}
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

        <div className="movie-detail__content">
          <div className="movie-detail__poster-wrapper">
            <img
              src={movie.poster}
              alt={`${UI_TEXT.POSTER_ALT} ${movie.title}`}
              className="movie-detail__poster"
            />
          </div>

          <div className="movie-detail__info">
            <h2 className="movie-detail__title" id="movie-detail-title">
              {movie.title}
            </h2>

            <div className="movie-detail__meta">
              <span className="movie-detail__age-badge">{movie.ageRating}</span>
              <span className="movie-detail__runtime">{movie.runtime}</span>
              <span className="movie-detail__score">
                <svg
                  className="movie-detail__score-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {movie.score}
              </span>
              <span className="movie-detail__date">{movie.releaseDate}</span>
            </div>

            <div className="movie-detail__genres">
              {movie.genres?.map((genre) => (
                <span key={genre} className="movie-detail__genre-tag">
                  {genre}
                </span>
              ))}
            </div>

            <div className="movie-detail__synopsis-wrapper">
              <h3 className="movie-detail__synopsis-heading">{UI_TEXT.SYNOPSIS}</h3>
              <p className="movie-detail__synopsis">{movie.synopsis}</p>
            </div>

            {movie.showtimes?.length > 0 && (
              <div className="movie-detail__showtimes">
                <h3 className="movie-detail__showtimes-heading">{UI_TEXT.SHOWTIMES}</h3>
                <div className="movie-detail__showtimes-grid">
                  {movie.showtimes.map((time) => (
                    <Button
                      key={time}
                      variant="secondary"
                      size="sm"
                      className="movie-detail__showtime-btn"
                      onClick={() => {
                        window.alert(`${movie.title}: ${time}`)
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {movie.trailer && (
              <div className="movie-detail__trailer">
                <h3 className="movie-detail__trailer-heading">{UI_TEXT.TRAILER_HEADING}</h3>
                <div className="movie-detail__trailer-wrapper">
                  <iframe
                    src={movie.trailer}
                    title={`${UI_TEXT.TRAILER_IFRAME_TITLE} ${movie.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
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
}

export default MovieDetail
