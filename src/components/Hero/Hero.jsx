import PropTypes from 'prop-types'

/**
 * Hero — Sección destacada con carrusel de películas
 * Rotación automática cada 6s, controles de teclado y swipe móvil
 */
function Hero({
  movies,
  currentIndex,
  onSelect,
  onNext,
  onPrev,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) {
  if (!movies || movies.length === 0) return null

  const movie = movies[currentIndex] || movies[0]

  return (
    <section
      className="hero"
      id="featured"
      aria-label="Película destacada"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay">
        <div className="hero__container">
          <span className="hero__badge">
            <svg className="hero__badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Destacada
          </span>
          <h2 className="hero__title">{movie.title}</h2>
          <p className="hero__synopsis">{movie.synopsis}</p>

          <div className="hero__meta">
            <span className="hero__age-badge">{movie.ageRating}</span>
            <span className="hero__runtime">{movie.runtime}</span>
            <span className="hero__score">
              <svg className="hero__score-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {movie.score}
            </span>
          </div>

          <div className="hero__genres">
            {movie.genres?.map((genre) => (
              <span key={genre} className="hero__genre-tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="hero__actions">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => onSelect(movie)}
            >
              Ver Detalles
            </button>
            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn hero__btn--ghost"
              >
                Trailer
              </a>
            )}
          </div>

          {/* Slide Indicators */}
          {movies.length > 1 && (
            <div className="hero__indicators" role="tablist" aria-label="Selección de película">
              {movies.map((_, index) => (
                <button
                  key={index}
                  className={`hero__indicator${index === currentIndex ? ' hero__indicator--active' : ''}`}
                  onClick={() => {
                    const event = new CustomEvent('heroNavigate', { detail: index })
                    window.dispatchEvent(event)
                  }}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Película ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {movies.length > 1 && (
            <>
              <button
                className="hero__nav hero__nav--prev"
                onClick={onPrev}
                aria-label="Película anterior"
              >
                ‹
              </button>
              <button
                className="hero__nav hero__nav--next"
                onClick={onNext}
                aria-label="Siguiente película"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
      ageRating: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      runtime: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
      trailer: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
}

export default Hero
