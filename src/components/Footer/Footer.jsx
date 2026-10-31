import PropTypes from 'prop-types'

/**
 * Footer — Pie de página con información del sitio
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <p className="footer__text">
          &copy; {currentYear} Cartelera de Cine. Proyecto académico — DAE Semana 9
        </p>
        <p className="footer__text footer__text--muted">
          Todos los datos mostrados son ficticios y utilizados con fines educativos.
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  /* No props — component is static */
}

export default Footer
