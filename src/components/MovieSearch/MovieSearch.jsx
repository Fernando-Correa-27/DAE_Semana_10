import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'
import './MovieSearch.css'

/**
 * Controlled movie search field. It owns no query state: the parent keeps
 * the value and receives every change, so the search can be shared by the
 * header, the banner and the movie list.
 */
function MovieSearch({
  id = 'movie-search',
  value,
  onChange,
  label = UI_TEXT.SEARCH_LABEL,
  placeholder = UI_TEXT.SEARCH_PLACEHOLDER,
  size = 'md',
  className = '',
}) {
  const classes = ['movie-search', `movie-search--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <svg className="movie-search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
      <input
        id={id}
        type="search"
        className="movie-search__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          className="movie-search__clear"
          onClick={() => onChange('')}
          aria-label={UI_TEXT.SEARCH_CLEAR}
        >
          <svg
            className="btn__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Button>
      )}
    </div>
  )
}

MovieSearch.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  className: PropTypes.string,
}

export default MovieSearch
