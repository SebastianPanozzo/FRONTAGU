/**
 * ConfirmDeleteModal.jsx
 * Modal de confirmación para eliminar usuario(s)
 */

import { formatearNombreCompleto } from '../../utils/formatters';

const ConfirmDeleteModal = ({ user, onConfirm, onCancel }) => {
  if (!user) return null;

  const isMultiple = user.multiple;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      style={{ zIndex: 1060 }}
    >
      <div
        className="modal-content-custom"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        {/* Header */}
        <div
          className="modal-header-custom"
          style={{ backgroundColor: '#dc3545' }}
        >
          <h5 className="modal-title-custom">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Confirmar Eliminación
          </h5>
          <button
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Cerrar modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-custom">
          <div className="text-center mb-4">
            <i
              className="bi bi-trash-fill mb-3"
              style={{ fontSize: '3rem', color: '#dc3545' }}
            ></i>
          </div>

          {isMultiple ? (
            <>
              <p className="mb-3 text-center" style={{ color: 'var(--burgundy)', fontSize: '1.1rem' }}>
                ¿Está seguro de eliminar <strong>{user.users.length} usuario(s)</strong>?
              </p>
              <div
                className="p-3 rounded mb-3"
                style={{
                  backgroundColor: 'rgba(220, 53, 69, 0.1)',
                  border: '2px solid #dc3545',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                <h6 className="mb-2 fw-bold" style={{ color: 'var(--burgundy)' }}>
                  Usuarios a eliminar:
                </h6>
                <ul className="mb-0" style={{ color: 'var(--burgundy)' }}>
                  {user.users.map((u) => (
                    <li key={u.id}>
                      {formatearNombreCompleto(u)} ({u.mail})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="mb-3 text-center" style={{ color: 'var(--burgundy)', fontSize: '1.1rem' }}>
                ¿Está seguro de eliminar al usuario <strong>{formatearNombreCompleto(user)}</strong>?
              </p>
              <div
                className="p-3 rounded mb-3"
                style={{
                  backgroundColor: 'rgba(220, 53, 69, 0.1)',
                  border: '2px solid #dc3545'
                }}
              >
                <p className="mb-2" style={{ color: 'var(--burgundy)' }}>
                  <strong>Email:</strong> {user.mail}
                </p>
                <p className="mb-0" style={{ color: 'var(--burgundy)' }}>
                  <strong>Teléfono:</strong> {user.phone || 'No especificado'}
                </p>
              </div>
            </>
          )}

          <div
            className="alert mb-0"
            style={{
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              border: '2px solid #dc3545',
              color: '#dc3545',
              borderRadius: '12px'
            }}
          >
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            <strong>Advertencia:</strong> Esta acción no se puede deshacer.
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-custom">
          <button
            className="btn-custom btn-secondary-custom"
            onClick={onCancel}
            style={{ width: 'auto' }}
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancelar
          </button>
          <button
            className="btn-custom"
            onClick={onConfirm}
            style={{
              width: 'auto',
              backgroundColor: '#dc3545',
              color: 'white',
              border: '2px solid #dc3545'
            }}
          >
            <i className="bi bi-trash-fill me-2"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;