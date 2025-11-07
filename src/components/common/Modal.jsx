/**
 * Componente Modal
 * Modal reutilizable con portal
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = size === 'sm' 
    ? 'max-w-md' 
    : size === 'lg' 
    ? 'max-w-4xl' 
    : 'max-w-2xl';

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div 
        className={`modal-content-custom ${sizeClass}`}
        style={{ maxWidth: size === 'sm' ? '400px' : size === 'lg' ? '800px' : '600px' }}
      >
        {/* Modal Header */}
        {title && (
          <div className="modal-header-custom">
            <h5 className="modal-title-custom">{title}</h5>
            {showCloseButton && (
              <button
                type="button"
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body-custom">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="modal-footer-custom">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;