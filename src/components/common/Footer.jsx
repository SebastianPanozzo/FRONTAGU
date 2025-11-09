/**
 * Componente Footer
 * Footer compartido para toda la aplicación
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="container py-4">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">
            {/* Nombre del consultorio */}
            <h5 className="fw-bold mb-3" style={{ color: 'var(--glacier)' }}>
              Ferreyra & Panozzo – Odontología General
            </h5>

            {/* Información de contacto */}
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-3">
              {/* Teléfono */}
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill" style={{ color: 'var(--glacier)' }}></i>
                <a 
                  href="tel:+5493794592217" 
                  className="footer-link fw-medium"
                  aria-label="Llamar al consultorio"
                >
                  +3794-592217
                </a>
              </div>

              {/* Email */}
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill" style={{ color: 'var(--glacier)' }}></i>
                <a 
                  href="mailto:contacto@ferreiraypanozzo.com.ar" 
                  className="footer-link fw-medium"
                  aria-label="Enviar email al consultorio"
                  style={{ wordBreak: 'break-all' }}
                >
                  1993vere@gmail.com
                </a>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="d-flex justify-content-center gap-3 mb-3">
              <a 
                href="https://www.facebook.com/share/14JX4adeFRU/" 
                className="btn d-flex align-items-center gap-2 px-3 py-2 rounded"
                style={{ 
                  backgroundColor: 'var(--burgundy)', 
                  color: 'var(--glacier)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar página de Facebook"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(101, 0, 21, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="bi bi-facebook" style={{ fontSize: '1.125rem' }}></i>
                <span className="small fw-medium">Síguenos</span>
              </a>

              <a 
                href="https://www.instagram.com/fp.odontologia.ar?igsh=bGk2Mjg1dXdwa3oy" 
                className="btn d-flex align-items-center gap-2 px-3 py-2 rounded"
                style={{ 
                  backgroundColor: 'var(--burgundy)', 
                  color: 'var(--glacier)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar página de Instagram"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(101, 0, 21, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="bi bi-instagram" style={{ fontSize: '1.125rem' }}></i>
                <span className="small fw-medium">Instagram</span>
              </a>
            </div>

            {/* Separador */}
            <hr style={{ 
              borderColor: 'rgba(208, 228, 247, 0.3)', 
              margin: '1.5rem 0' 
            }} />

            {/* Copyright */}
            <p className="mb-0 small" style={{ color: 'var(--glacier)', opacity: 0.9 }}>
              <i className="bi bi-c-circle me-1"></i>
              {currentYear} Ferreyra & Panozzo – Odontología General — Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;