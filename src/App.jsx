import { useState, useMemo, useEffect, useCallback } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import MovieList from './components/MovieList/MovieList'
import MovieDetail from './components/MovieDetail/MovieDetail'
import moviesData from './data/cartelera'

import './styles/component-overrides.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)

  const featured = useMemo(() => moviesData.find((m) => m.featured) || null, [])
  const list = useMemo(() => moviesData.filter((m) => !m.featured), [])

  // All movies for carousel
  const carouselMovies = useMemo(() => {
    const featuredMovies = moviesData.filter((m) => m.featured)
    if (featuredMovies.length > 0) return featuredMovies
    // Fallback: use first 3 movies if no featured
    return moviesData.slice(0, 3)
  }, [])

  // Genre list
  const genres = useMemo(() => {
    const allGenres = moviesData.flatMap((m) => m.genres || [])
    return [...new Set(allGenres)].sort()
  }, [])

  // Filtered movies
  const filteredMovies = useMemo(() => {
    let filtered = list

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(query) ||
        m.synopsis.toLowerCase().includes(query)
      )
    }

    if (genreFilter) {
      filtered = filtered.filter((m) => (m.genres || []).includes(genreFilter))
    }

    return filtered
  }, [list, searchQuery, genreFilter])

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Detect system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Carousel auto-rotation
  useEffect(() => {
    if (carouselMovies.length <= 1) return

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % carouselMovies.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [carouselMovies.length])

  // Pause on page hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.body.style.setProperty('--carousel-paused', 'true')
      } else {
        document.body.style.setProperty('--carousel-paused', 'false')
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Handlers
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const handleSelectMovie = useCallback((movie) => {
    setSelectedMovie(movie)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  const handleNextSlide = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % carouselMovies.length)
  }, [carouselMovies.length])

  const handlePrevSlide = useCallback(() => {
    setHeroIndex((prev) =>
      prev === 0 ? carouselMovies.length - 1 : prev - 1
    )
  }, [carouselMovies.length])

  // Touch state for swipe
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.touches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    if (distance > minSwipeDistance) {
      handleNextSlide()
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, handleNextSlide, handlePrevSlide])

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        genres={genres}
        genreFilter={genreFilter}
        onGenreChange={setGenreFilter}
      />
      <main className="app__main">
        <Hero
          movies={carouselMovies}
          currentIndex={heroIndex}
          onSelect={handleSelectMovie}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        <MovieList
          movies={filteredMovies}
          onSelect={handleSelectMovie}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          genres={genres}
          genreFilter={genreFilter}
          onGenreChange={setGenreFilter}
        />
      </main>
      <Footer />

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}

export default App
