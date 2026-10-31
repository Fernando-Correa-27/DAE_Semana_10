import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import EmptyState from '../EmptyState/EmptyState'
import { UI_TEXT } from '../../utils/constants'

/**
 * Movie grid with genre controls. The filtered list and the applied search
 * term are derived by the parent; this component only renders them and owns
 * the reveal effect.
 */
function MovieList({
  movies,
  onSelect,
  favoriteIds = [],
  onToggleFavorite,
  activeQuery = '',
  genres,
  genreFilter,
  onGenreChange,
  onClearFilters,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const isFiltering = Boolean(activeQuery || genreFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section
      className="movie-list"
      id="movies"
      ref={sectionRef}
      aria-label="Cartelera de películas"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div className="movie-list__controls">
        <div className="movie-list__filter-row">
          {genres?.length > 0 && (
            <select
              className="movie-list__filter-select"
              value={genreFilter}
              onChange={(event) => onGenreChange(event.target.value)}
              aria-label={UI_TEXT.GENRE_FILTER_LABEL}
            >
              <option value="">{UI_TEXT.ALL_GENRES}</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          )}

          {activeQuery && (
            <span className="movie-list__results-count" aria-live="polite">
              {movies.length}{' '}
              {movies.length === 1 ? UI_TEXT.RESULTS_SINGULAR : UI_TEXT.RESULTS_PLURAL}
            </span>
          )}
        </div>
      </div>

      <h2 className="movie-list__heading">
        {activeQuery
          ? `${UI_TEXT.RESULTS_FOR} "${activeQuery}"`
          : UI_TEXT.MOVIES_TITLE}
      </h2>

      {movies.length > 0 ? (
        <div className="movie-list__grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onShowDetails={onSelect}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={isFiltering ? UI_TEXT.EMPTY_TITLE : UI_TEXT.NO_MOVIES}
          message={isFiltering ? UI_TEXT.EMPTY_MESSAGE : undefined}
          actionLabel={isFiltering ? UI_TEXT.CLEAR_FILTERS : undefined}
          onAction={isFiltering ? onClearFilters : undefined}
        />
      )}
    </section>
  )
}

MovieList.propTypes = {
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
      releaseDate: PropTypes.string,
      showtimes: PropTypes.arrayOf(PropTypes.string),
      trailer: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  favoriteIds: PropTypes.arrayOf(PropTypes.number),
  onToggleFavorite: PropTypes.func,
  activeQuery: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  genreFilter: PropTypes.string,
  onGenreChange: PropTypes.func,
  onClearFilters: PropTypes.func,
}

export default MovieList
