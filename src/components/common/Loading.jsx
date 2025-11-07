/**
 * Componente Loading
 * Spinner de carga reutilizable con mensaje personalizable
 */

const Loading = ({ message = 'Cargando...', size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClass}`} role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      {message && (
        <p 
          className="mt-3 fw-medium" 
          style={{ color: 'var(--dark-blue)' }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;