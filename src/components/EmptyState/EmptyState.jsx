import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { UI_TEXT } from '../../utils/constants'
import './EmptyState.css'

/**
 * Reusable empty state for lists without results. It is announced politely
 * so screen-reader users notice that the result set changed.
 */
function EmptyState({
  title = UI_TEXT.EMPTY_TITLE,
  message = UI_TEXT.EMPTY_MESSAGE,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={['empty-state', className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      <span className="empty-state__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21M7.5 10.5h6" strokeLinecap="round" />
        </svg>
      </span>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
}

export default EmptyState
