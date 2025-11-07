/**
 * Componente Navbar
 * Navbar para Workspace con React Router navigation
 */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Navbar = ({
  currentUser,
  onNavigate,
  onLogout,
  menuItems = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar-custom">
      <div className="container-fluid">
        {/* Brand */}
        <div className="d-flex align-items-center">
          <img
            style={{ width: '40px', height: '40px', borderRadius: '8px' }}
            className="me-2"
            src="/img/Icono.jpg"
            alt="Logo"
          />
          <span 
            className="navbar-brand-custom mb-0"
            style={{ fontSize: '1.25rem' }}
          >
            Workspace
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex align-items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`navbar-link-custom ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.path)}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </button>
          ))}

          {/* User info y logout */}
          {currentUser && (
            <div className="d-flex align-items-center gap-3 ms-3 ps-3" style={{ borderLeft: '2px solid var(--burgundy)' }}>
              <div className="text-end d-none d-xl-block">
                <p className="mb-0 fw-semibold" style={{ color: 'var(--glacier)', fontSize: '0.9rem' }}>
                  {currentUser.name} {currentUser.lastname}
                </p>
                <p className="mb-0" style={{ color: 'var(--glacier)', fontSize: '0.75rem', opacity: 0.8 }}>
                  {currentUser.role === 'professional' ? 'Profesional' : 'Usuario'}
                </p>
              </div>
              <Button
                variant="primary"
                onClick={onLogout}
                icon="bi-box-arrow-right"
              >
                Salir
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggler */}
        <button
          className="d-lg-none border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="d-lg-none position-absolute top-100 start-0 w-100 mt-2 px-3"
            style={{ zIndex: 1000 }}
          >
            <div 
              className="p-3 rounded-3"
              style={{ 
                backgroundColor: 'var(--dark-blue)',
                border: '2px solid var(--burgundy)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {/* User info mobile */}
              {currentUser && (
                <div className="mb-3 pb-3" style={{ borderBottom: '1px solid rgba(208, 228, 247, 0.2)' }}>
                  <p className="mb-1 fw-semibold" style={{ color: 'var(--glacier)' }}>
                    {currentUser.name} {currentUser.lastname}
                  </p>
                  <p className="mb-0 small" style={{ color: 'var(--glacier)', opacity: 0.8 }}>
                    {currentUser.role === 'professional' ? 'Profesional' : 'Usuario'}
                  </p>
                </div>
              )}

              {/* Menu items */}
              <ul className="list-unstyled mb-3">
                {menuItems.map((item) => (
                  <li key={item.path} className="mb-2">
                    <button
                      className={`navbar-link-custom w-100 text-start ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <i className={`bi ${item.icon} me-2`}></i>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Logout button mobile */}
              <Button
                variant="primary"
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                icon="bi-box-arrow-right"
                fullWidth
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;