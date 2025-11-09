/**
 * ConfirmModal.jsx
 * Modal de confirmación para acciones críticas
 */

import { useEffect } from 'react';

const ConfirmModal = ({ 
  show, 
  titulo, 
  mensaje, 
  tipo = 'warning', 
  onConfirm, 
  onCancel,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar'
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [show, onCancel]);

  if (!show) return null;

  const getIconClass = () => {
    switch (tipo) {
      case 'danger':
        return 'bi-exclamation-triangle-fill text-danger';
      case 'warning':
        return 'bi-exclamation-circle-fill text-warning';
      case 'info':
        return 'bi-info-circle-fill text-info';
      case 'success':
        return 'bi-check-circle-fill text-success';
      default:
        return 'bi-question-circle-fill';
    }
  };

  const getButtonClass = () => {
    switch (tipo) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-info';
      case 'success':
        return 'btn-success';
      default:
        return 'btn-primary';
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div 
          className="modal-content" 
          style={{ 
            borderRadius: '12px',
            border: '2px solid var(--taupe)'
          }}
        >
          <div 
            className="modal-header" 
            style={{ 
              backgroundColor: 'var(--glacier)',
              borderBottom: '2px solid var(--taupe)',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px'
            }}
          >
            <h5 className="modal-title d-flex align-items-center" style={{ color: 'var(--dark-blue)' }}>
              <i className={`bi ${getIconClass()} me-2`} style={{ fontSize: '1.5rem' }}></i>
              {titulo}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onCancel}
              aria-label="Cerrar"
            ></button>
          </div>
          
          <div className="modal-body" style={{ padding: '1.5rem' }}>
            <p className="mb-0" style={{ color: 'var(--dark-blue)', fontSize: '1rem' }}>
              {mensaje}
            </p>
          </div>
          
          <div 
            className="modal-footer" 
            style={{ 
              backgroundColor: 'var(--white)',
              borderTop: '1px solid var(--taupe)',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
          >
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              <i className="bi bi-x-circle me-2"></i>
              {textoCancelar}
            </button>
            <button 
              type="button" 
              className={`btn ${getButtonClass()}`}
              onClick={onConfirm}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              <i className="bi bi-check-circle me-2"></i>
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;