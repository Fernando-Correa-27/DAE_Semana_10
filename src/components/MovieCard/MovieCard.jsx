import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'

/**
 * Stateless movie card. Favorites and details are controlled by the parent
 * through callbacks; the card never stores its own state.
 */
function MovieCard({ movie, isFavorite = false, onToggleFavorite }) {
  const favoriteLabel = isFavorite ? UI_TEXT.FAVORITE_REMOVE : UI_TEXT.FAVORITE_ADD

  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`movie-card__star${i >= Math.round(movie.score) ? ' movie-card__star-empty' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ))

  return (
    <article className="movie-card" aria-label={`Película: ${movie.title}`}>
      <div className="movie-card__poster">
        <img
          src={movie.poster}
          alt={`Póster de ${movie.title}`}
          loading="lazy"
          className="movie-card__image"
        />
        <span className="movie-card__age-badge">{movie.ageRating}</span>
        <Button
          variant="ghost"
          iconOnly
          className="movie-card__favorite"
          onClick={() => onToggleFavorite?.(movie.id)}
          aria-label={favoriteLabel}
          title={favoriteLabel}
          aria-pressed={isFavorite}
        >
          <svg
            className="movie-card__favorite-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </Button>
        <div className="movie-card__overlay">
          <div className="movie-card__score-overlay">
            <svg className="movie-card__score-overlay-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {movie.score}
          </div>
        </div>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__rating">
          <span className="movie-card__stars" aria-label={`Calificación: ${movie.score} de 5`}>
            {stars}
          </span>
          <span className="movie-card__score">{movie.score}</span>
        </div>

        <p className="movie-card__synopsis">{movie.synopsis}</p>

        <div className="movie-card__showtimes">
          <span className="movie-card__showtimes-label">Horarios:</span>
          <div className="movie-card__showtimes-list">
            {movie.showtimes.map((time) => (
              <span key={time} className="movie-card__showtime-chip">
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    ageRating: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
}

export default MovieCard
