/**
 * QuickActionCard.jsx
 * Componente para acciones rápidas en el dashboard
 */

import { Link } from 'react-router-dom';

const QuickActionCard = ({ to, icon, title, description, color = 'burgundy' }) => {
  const colorClass = color === 'burgundy' ? 'var(--burgundy)' : 'var(--dark-blue)';

  return (
    <Link to={to} className="text-decoration-none">
      <div className="card-custom h-100 hover-lift">
        <div className="card-body-custom text-center py-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: '70px',
              height: '70px',
              backgroundColor: colorClass,
            }}
          >
            <i 
              className={`bi ${icon}`} 
              style={{ color: 'var(--glacier)', fontSize: '2rem' }}
            ></i>
          </div>
          
          <h5 className="fw-bold mb-2" style={{ color: 'var(--glacier)' }}>
            {title}
          </h5>
          
          <p 
            className="mb-0" 
            style={{ 
              color: 'var(--glacier)', 
              opacity: 0.85,
              fontSize: '0.9rem' 
            }}
          >
            {description}
          </p>
        </div>
        
        <div className="card-footer-custom text-center py-3">
          <span 
            className="fw-semibold"
            style={{ color: 'var(--glacier)' }}
          >
            Acceder <i className="bi bi-arrow-right ms-1" style={{ color: 'var(--glacier)' }}></i>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;