import PropTypes from 'prop-types'
import './Button.css'

/**
 * Reusable, accessible button with primary, secondary and ghost variants.
 * It renders a native button, defaults to type="button" and accepts all
 * standard button attributes.
 */
function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...restProps
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    iconOnly ? 'btn--icon' : '',
    fullWidth ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...restProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  iconOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Button
