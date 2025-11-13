/**
 * ConfirmDeleteTreatment.jsx
 * Modal de confirmación para eliminar tratamiento(s)
 * Ferreyra & Panozzo - Odontología General
 */

const ConfirmDeleteTreatment = ({ treatment, onConfirm, onCancel }) => {
  if (!treatment) return null;

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

          <p className="mb-3 text-center" style={{ color: 'var(--burgundy)', fontSize: '1.1rem' }}>
            ¿Está seguro de eliminar el tratamiento <strong>{treatment.name}</strong>?
          </p>

          <div
            className="p-3 rounded mb-3"
            style={{
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              border: '2px solid #dc3545'
            }}
          >
            <p className="mb-2" style={{ color: 'var(--burgundy)' }}>
              <strong>Nombre:</strong> {treatment.name}
            </p>
            <p className="mb-2" style={{ color: 'var(--burgundy)' }}>
              <strong>Descripción:</strong> {treatment.description || 'No especificada'}
            </p>
            <p className="mb-0" style={{ color: 'var(--burgundy)' }}>
              <strong>Precio:</strong> {treatment.price ? `$${treatment.price.toLocaleString()}` : 'No especificado'}
            </p>
          </div>

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

export default ConfirmDeleteTreatment;