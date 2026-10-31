import { useState, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'

/**
 * MovieList — Lista de películas con búsqueda, filtro y scroll animations
 */
function MovieList({
  movies,
  onSelect,
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

  // Count all movies for total display
  const totalMovies = useMemo(() => {
    return movies.length
  }, [movies])

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
      {/* Search & Filter Controls */}
      <div className="movie-list__controls">
        <div className="movie-list__search-bar">
          <svg
            className="movie-list__search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="search"
            className="movie-list__search-input"
            placeholder="Buscar películas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar películas"
          />
          {searchQuery && (
            <button
              className="movie-list__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div className="movie-list__filter-row">
          {genres && genres.length > 0 && (
            <select
              className="movie-list__filter-select"
              value={genreFilter}
              onChange={(e) => onGenreChange(e.target.value)}
              aria-label="Filtrar por género"
            >
              <option value="">Todos los géneros</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          )}

          {searchQuery && (
            <span className="movie-list__results-count">
              {totalMovies} resultado{totalMovies !== 1 ? 's' : ''} encontrado
              {totalMovies !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Heading */}
      <h2 className="movie-list__heading">
        {searchQuery ? `Resultados para "${searchQuery}"` : 'En cartelera'}
      </h2>

      {/* Movie Grid */}
      <div className="movie-list__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
        ))}
      </div>

      {/* Empty State */}
      {movies.length === 0 && (
        <p className="movie-list__empty">
          {searchQuery || genreFilter
            ? 'No se encontraron películas con esos criterios.'
            : 'No hay películas disponibles en este momento.'}
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
      image: PropTypes.string.isRequired,
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
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.string),
  genreFilter: PropTypes.string,
  onGenreChange: PropTypes.func,
}

export default MovieList
