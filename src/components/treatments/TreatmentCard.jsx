/**
 * TreatmentCard.jsx
 * Tarjeta para mostrar información de un tratamiento
 * Ferreyra & Panozzo - Odontología General
 */

import { formatearMoneda, truncarTexto } from '../../utils/formatters';

const TreatmentCard = ({ treatment, onEdit, onDelete, isPublic = false }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  return (
    <div className="card-custom h-100" style={{ borderColor: 'var(--burgundy)' }}>
      {/* Image */}
      <div 
        style={{ 
          height: '250px', 
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'var(--dark-blue)'
        }}
      >
        {treatment.image ? (
          <>
            <img
              src={treatment.image}
              alt={treatment.name}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
              onError={handleImageError}
            />
            <div
              className="d-none align-items-center justify-content-center h-100"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'var(--dark-blue)',
                color: 'var(--glacier)'
              }}
            >
              <div className="text-center">
                <i className="bi bi-image mb-2" style={{ fontSize: '3rem' }}></i>
                <p className="mb-0">Sin imagen</p>
              </div>
            </div>
          </>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center h-100"
            style={{
              backgroundColor: 'var(--dark-blue)',
              color: 'var(--glacier)'
            }}
          >
            <div className="text-center">
              <i className="bi bi-heart-pulse mb-2" style={{ fontSize: '3rem' }}></i>
              <p className="mb-0">Sin imagen</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-body-custom d-flex flex-column">
        <h5 className="fw-bold mb-3" style={{ color: 'var(--glacier)' }}>
          {treatment.name}
        </h5>
        
        <p 
          className="flex-grow-1 mb-3" 
          style={{ 
            color: 'var(--glacier)', 
            opacity: 0.9,
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}
        >
          {isPublic ? treatment.description : truncarTexto(treatment.description, 120)}
        </p>

        {/* Price Badge */}
        <div className="mb-3">
          <span
            className="badge-custom badge-primary"
            style={{ 
              fontSize: '1.1rem',
              padding: '0.5rem 1rem'
            }}
          >
            {typeof treatment.price === 'number' 
              ? formatearMoneda(treatment.price) 
              : treatment.price}
          </span>
        </div>

        {/* Actions (solo para workspace) */}
        {!isPublic && (
          <div className="d-flex gap-2 mt-auto">
            <button
              className="btn-custom btn-secondary-custom flex-fill"
              onClick={() => onEdit(treatment)}
              style={{ fontSize: '0.9rem', padding: '0.6rem' }}
            >
              <i className="bi bi-pencil me-1"></i>
              Editar
            </button>
            <button
              className="btn-custom flex-fill"
              onClick={() => onDelete(treatment)}
              style={{ 
                fontSize: '0.9rem', 
                padding: '0.6rem',
                backgroundColor: 'var(--danger)',
                color: 'white',
                border: 'none'
              }}
            >
              <i className="bi bi-trash me-1"></i>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentCard;