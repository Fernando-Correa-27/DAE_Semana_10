import PropTypes from 'prop-types'

/**
 * MovieCard — Tarjeta individual de película
 */
function MovieCard({ movie }) {
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
    image: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    ageRating: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    showtimes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default MovieCard
