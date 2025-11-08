/**
 * StatCard.jsx
 * Componente para mostrar estadísticas en el dashboard
 */

const StatCard = ({ icon, value, label, subtitle, color = 'burgundy' }) => {
  const colorClass = color === 'glacier' ? 'var(--burgundy)' : 'var(--glacier)';
  const bgColor = color === 'burgundy' 
    ? 'rgba(101, 0, 21, 0.1)' 
    : 'rgba(177, 193, 216, 0.1)';

  return (
    <div className="card-custom h-100">
      <div className="card-body-custom text-center">
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: colorClass,
          }}
        >
          <i 
            className={`bi ${icon}`} 
            style={{ color: 'var(--burgundy)', fontSize: '1.5rem' }}
          ></i>
        </div>
        
        <h3 className="display-4 fw-bold mb-2" style={{ color: colorClass }}>
          {value}
        </h3>
        
        <p className="mb-1 fw-semibold" style={{ color: 'var(--glacier)' }}>
          {label}
        </p>
        
        {subtitle && (
          <small 
            className="d-block" 
            style={{ 
              color: 'var(--glacier)', 
              opacity: 0.8,
              fontSize: '0.85rem' 
            }}
          >
            {subtitle}
          </small>
        )}
      </div>
    </div>
  );
};

export default StatCard;