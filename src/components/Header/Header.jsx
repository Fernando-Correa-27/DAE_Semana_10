import PropTypes from 'prop-types'

/**
 * Header — Barra de navegación principal del sitio
 */
function Header({
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  genres,
  genreFilter,
  onGenreChange,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">&#9654;</span>
          <h1 className="header__title">Cartelera de Cine</h1>
        </div>

        <nav className="header__nav" aria-label="Navegación principal">
          <a href="#featured" className="header__link">
            Destacada
          </a>
          <a href="#movies" className="header__link">
            Cartelera
          </a>
          <a href="#footer" className="header__link">
            Contacto
          </a>
        </nav>

        <div className="header__actions">
          {/* Search */}
          <div className="header__search">
            <svg
              className="header__search-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="search"
              className="header__search-input"
              placeholder="Buscar películas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Buscar películas"
            />
            {searchQuery && (
              <button
                className="header__search-clear"
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Genre Filter */}
          {genres && genres.length > 0 && (
            <select
              className="header__filter-select"
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

          {/* Theme Toggle */}
          <button
            className={`header__theme-toggle ${theme === 'light' ? 'header__theme-toggle--light' : ''}`}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <svg className="header__theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              </svg>
            ) : (
              <svg className="header__theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  onToggleTheme: PropTypes.func,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.string),
  genreFilter: PropTypes.string,
  onGenreChange: PropTypes.func,
}

export default Header
