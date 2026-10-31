import PropTypes from 'prop-types'

/**
 * MovieDetail — Modal de detalle de película con sinopsis completa y trailer
 */
function MovieDetail({ movie, onClose }) {
  if (!movie) return null

  return (
    <div
      className="movie-detail__backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="movie-detail"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${movie.title}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="movie-detail__close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ✕
        </button>

        <div className="movie-detail__content">
          {/* Movie Poster */}
          <div className="movie-detail__poster-wrapper">
            <img
              src={movie.poster}
              alt={`Póster de ${movie.title}`}
              className="movie-detail__poster"
            />
          </div>

          {/* Movie Info */}
          <div className="movie-detail__info">
            <h2 className="movie-detail__title">{movie.title}</h2>

            <div className="movie-detail__meta">
              <span className="movie-detail__age-badge">{movie.ageRating}</span>
              <span className="movie-detail__runtime">{movie.runtime}</span>
              <span className="movie-detail__score">
                <svg className="movie-detail__score-icon" viewBox="0 0 24 24" aria-hidden="true">
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
              <h3 className="movie-detail__synopsis-heading">Sinopsis</h3>
              <p className="movie-detail__synopsis">{movie.synopsis}</p>
            </div>

            {/* Showtimes */}
            {movie.showtimes && movie.showtimes.length > 0 && (
              <div className="movie-detail__showtimes">
                <h3 className="movie-detail__showtimes-heading">Horarios</h3>
                <div className="movie-detail__showtimes-grid">
                  {movie.showtimes.map((time) => (
                    <button
                      key={time}
                      className="movie-detail__showtime-btn"
                      onClick={() => {
                        alert(`Función seleccionada: ${movie.title} a las ${time}`)
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer */}
            {movie.trailer && (
              <div className="movie-detail__trailer">
                <h3 className="movie-detail__trailer-heading">Trailer</h3>
                <div className="movie-detail__trailer-wrapper">
                  <iframe
                    src={movie.trailer}
                    title={`Trailer de ${movie.title}`}
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
    image: PropTypes.string.isRequired,
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
