/**
 * Componente ErrorMessage
 * Muestra mensajes de error con opción de cierre
 */

const ErrorMessage = ({ message, onDismiss, type = 'error' }) => {
  if (!message) return null;

  const alertClass = `alert-custom alert-${type}`;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-exclamation-triangle-fill';
    }
  };

  return (
    <div className={alertClass} role="alert">
      <i className={`bi ${getIcon()}`} style={{ fontSize: '1.25rem' }}></i>
      <div className="flex-grow-1">
        <strong>
          {type === 'error' && 'Error: '}
          {type === 'success' && 'Éxito: '}
          {type === 'warning' && 'Advertencia: '}
          {type === 'info' && 'Información: '}
        </strong>
        {message}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          onClick={onDismiss}
          aria-label="Cerrar"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            opacity: 0.7
          }}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;