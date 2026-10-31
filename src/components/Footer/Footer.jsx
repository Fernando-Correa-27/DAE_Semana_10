import { UI_TEXT } from '../../utils/constants'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Static site footer.
 */
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <p className="footer__text">
          &copy; {CURRENT_YEAR} {UI_TEXT.APP_TITLE}. {UI_TEXT.FOOTER_PROJECT}
        </p>
        <p className="footer__text footer__text--muted">{UI_TEXT.FOOTER_DISCLAIMER}</p>
      </div>
    </footer>
  )
}

export default Footer
