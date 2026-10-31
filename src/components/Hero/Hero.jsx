import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'

/**
 * Featured movie carousel. It rotates automatically, supports touch swipe
 * and exposes explicit previous, next and slide-selection controls.
 */
function Hero({
  movies,
  currentIndex,
  onSelect,
  onSelectIndex,
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
      aria-label={UI_TEXT.FEATURED_SECTION}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="hero__background"
        style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay">
        <div className="hero__container">
          <span className="hero__badge">
            <svg className="hero__badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {UI_TEXT.FEATURED_BADGE}
          </span>
          <h2 className="hero__title">{movie.title}</h2>
          <p className="hero__synopsis">{movie.synopsis}</p>

          <div className="hero__meta">
            <span className="hero__age-badge">{movie.ageRating}</span>
            <span className="hero__runtime">{movie.runtime}</span>
            <span
              className="hero__score"
              aria-label={`${UI_TEXT.SCORE_LABEL}: ${movie.score} de 5`}
            >
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
            <Button
              size="lg"
              className="hero__btn hero__btn--primary"
              onClick={() => onSelect(movie)}
            >
              {UI_TEXT.SEE_DETAILS}
            </Button>
            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn hero__btn--ghost"
              >
                {UI_TEXT.TRAILER}
              </a>
            )}
          </div>

          {movies.length > 1 && (
            <div
              className="hero__indicators"
              role="group"
              aria-label={UI_TEXT.CAROUSEL_LABEL}
            >
              {movies.map((item, index) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`hero__indicator${index === currentIndex ? ' hero__indicator--active' : ''}`}
                  onClick={() => onSelectIndex(index)}
                  aria-pressed={index === currentIndex}
                  aria-label={`${UI_TEXT.GO_TO_MOVIE} ${index + 1}`}
                />
              ))}
            </div>
          )}

          {movies.length > 1 && (
            <>
              <Button
                variant="ghost"
                iconOnly
                className="hero__nav hero__nav--prev"
                onClick={onPrev}
                aria-label={UI_TEXT.PREVIOUS_MOVIE}
              >
                <svg
                  className="btn__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                iconOnly
                className="hero__nav hero__nav--next"
                onClick={onNext}
                aria-label={UI_TEXT.NEXT_MOVIE}
              >
                <svg
                  className="btn__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Button>
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
      poster: PropTypes.string.isRequired,
      backdrop: PropTypes.string,
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
  onSelectIndex: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
}

export default Hero
