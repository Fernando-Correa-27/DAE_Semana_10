import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import MovieSearch from '../MovieSearch/MovieSearch'
import { UI_TEXT } from '../../utils/constants'

/**
 * Movie grid with search and genre controls. The filtered list is derived
 * by the parent; this component only renders it and owns the reveal effect.
 */
function MovieList({
  movies,
  onSelect,
  favoriteIds = [],
  onToggleFavorite,
  searchQuery,
  onSearchChange,
  genres,
  genreFilter,
  onGenreChange,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
        <div className="movie-list__search-bar">
          <MovieSearch
            id="movie-list-search"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>

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

          {searchQuery && (
            <span className="movie-list__results-count" aria-live="polite">
              {movies.length}{' '}
              {movies.length === 1 ? UI_TEXT.RESULTS_SINGULAR : UI_TEXT.RESULTS_PLURAL}
            </span>
          )}
        </div>
      </div>

      <h2 className="movie-list__heading">
        {searchQuery
          ? `${UI_TEXT.RESULTS_FOR} "${searchQuery}"`
          : UI_TEXT.MOVIES_TITLE}
      </h2>

      <div className="movie-list__grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelect}
          />
        ))}
      </div>

      {movies.length === 0 && (
        <p className="movie-list__empty">
          {searchQuery || genreFilter ? UI_TEXT.EMPTY_MESSAGE : UI_TEXT.NO_MOVIES}
        </p>
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
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.string),
  genreFilter: PropTypes.string,
  onGenreChange: PropTypes.func,
}

export default MovieList
