/**
 * Componente Navbar
 * Barra de navegación adaptable para Landing y Workspace
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';

const Navbar = ({ isWorkspace = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, isAuthenticated, isProfessional } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleWorkspace = () => {
    if (isProfessional()) {
      navigate('/workspace/home');
    }
    setIsMenuOpen(false);
  };

  const handleBackToHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className="navbar-custom fixed-top"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="container-fluid px-3 px-lg-4">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid px-0">
            {/* Brand */}
            <button
              className="navbar-brand-custom btn border-0 p-0"
              onClick={handleBackToHome}
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
              {/* Enlaces de workspace si estamos en workspace */}
              {isWorkspace && isProfessional() && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                  <li className="nav-item">
                    <button
                      className={`navbar-link-custom btn border-0 ${isActive('/workspace/home') ? 'active' : ''}`}
                      onClick={() => navigateTo('/workspace/home')}
                      style={{ color: 'var(--glacier)' }}
                    >
                      <i className="bi bi-house-door me-1"></i>
                      Dashboard
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`navbar-link-custom btn border-0 ${isActive('/workspace/appointments') ? 'active' : ''}`}
                      onClick={() => navigateTo('/workspace/appointments')}
                      style={{ color: 'var(--glacier)' }}
                    >
                      <i className="bi bi-calendar-check me-1"></i>
                      Turnos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`navbar-link-custom btn border-0 ${isActive('/workspace/treatments') ? 'active' : ''}`}
                      onClick={() => navigateTo('/workspace/treatments')}
                      style={{ color: 'var(--glacier)' }}
                    >
                      <i className="bi bi-heart-pulse me-1"></i>
                      Tratamientos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`navbar-link-custom btn border-0 ${isActive('/workspace/users') ? 'active' : ''}`}
                      onClick={() => navigateTo('/workspace/users')}
                      style={{ color: 'var(--glacier)' }}
                    >
                      <i className="bi bi-people me-1"></i>
                      Usuarios
                    </button>
                  </li>
                </ul>
              )}

              {/* Si NO estamos en workspace, mostrar espacio flexible */}
              {!isWorkspace && <div className="me-auto"></div>}

              {/* Auth buttons */}
              <div className="d-flex flex-row gap-2 mt-3 mt-lg-0">
                {isAuthenticated ? (
                  <>
                    {/* Workspace button solo para profesionales y solo si NO estamos ya en workspace */}
                    {isProfessional() && !isWorkspace && (
                      <Button
                        variant="secondary"
                        onClick={handleWorkspace}
                        icon="bi-briefcase"
                      >
                        Workspace
                      </Button>
                    )}

                    {/* Si estamos en workspace, botón para volver a Home */}
                    {isWorkspace && (
                      <Button
                        variant="secondary"
                        onClick={handleBackToHome}
                        icon="bi-house"
                      >
                        Inicio
                      </Button>
                    )}

                    {/* User info (solo desktop) */}
                    <div className="d-none d-lg-flex align-items-center me-2">
                      <span style={{ color: 'var(--glacier)', fontSize: '0.9rem' }}>
                        {currentUser?.name || 'Usuario'}
                      </span>
                    </div>

                    {/* Logout button */}
                    <Button
                      variant="primary"
                      onClick={handleLogout}
                      icon="bi-box-arrow-right"
                    >
                      <span className="d-none d-sm-inline">Cerrar Sesión</span>
                      <span className="d-inline d-sm-none">Salir</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={handleLogin}
                      icon="bi-person"
                    >
                      Ingresar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleRegister}
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
      <style>{`
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

          /* Botones horizontales en mobile también */
          .d-flex.flex-column.flex-lg-row {
            flex-direction: row !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;