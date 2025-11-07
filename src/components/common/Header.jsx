/**
 * Componente Header
 * Header para Landing Page con scroll to sections
 */

import { useState } from 'react';
import Button from './Button';

const Header = ({
  currentUser = null,
  onLogin,
  onRegister,
  onLogout,
  onWorkspace,
  scrollToSection
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handleWorkspace = () => {
    if (currentUser && currentUser.role === 'professional') {
      if (onWorkspace) {
        onWorkspace();
      }
    } else {
      alert('Acceso denegado. Solo los profesionales pueden acceder al workspace.');
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="navbar-custom fixed-top"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid px-0">
            {/* Brand */}
            <button
              className="navbar-brand-custom btn border-0 p-0"
              onClick={() => handleNavClick('home')}
              style={{ background: 'none' }}
            >
              <img
                style={{ width: '45px', height: '45px', borderRadius: '8px' }}
                className="me-2"
                src="/img/Icono.jpg"
                alt="Logo Ferreyra & Panozzo"
              />
              <span className="d-none d-sm-inline">Ferreyra y Panozzo</span>
            </button>

            {/* Toggler para mobile */}
            <button
              className="navbar-toggler border-0"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-controls="navbarContent"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              style={{
                backgroundColor: 'var(--burgundy)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px'
              }}
            >
              <i 
                className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`} 
                style={{ color: 'var(--glacier)', fontSize: '1.5rem' }}
              ></i>
            </button>

            {/* Navigation */}
            <div 
              className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
              id="navbarContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <button
                    className="navbar-link-custom btn border-0"
                    onClick={() => handleNavClick('about')}
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="navbar-link-custom btn border-0"
                    onClick={() => handleNavClick('services')}
                  >
                    Servicios
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="navbar-link-custom btn border-0"
                    onClick={() => handleNavClick('location')}
                  >
                    Ubicación
                  </button>
                </li>
              </ul>

              {/* Auth buttons */}
              <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                {currentUser ? (
                  <>
                    {/* Workspace button solo para profesionales */}
                    {currentUser.role === 'professional' && (
                      <Button
                        variant="secondary"
                        onClick={handleWorkspace}
                        icon="bi-briefcase"
                      >
                        Workspace
                      </Button>
                    )}

                    {/* Logout button */}
                    <Button
                      variant="primary"
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      icon="bi-box-arrow-right"
                    >
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        onLogin();
                        setIsMenuOpen(false);
                      }}
                      icon="bi-person"
                    >
                      Ingresar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        onRegister();
                        setIsMenuOpen(false);
                      }}
                      icon="bi-person-plus"
                    >
                      Registrarse
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Estilos para el menú mobile */}
      <style jsx>{`
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background-color: var(--dark-blue);
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid var(--burgundy);
          }

          .navbar-nav {
            width: 100%;
          }

          .nav-item {
            width: 100%;
            margin-bottom: 0.5rem;
          }

          .navbar-link-custom {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;