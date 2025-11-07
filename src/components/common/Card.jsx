/**
 * Componente Card
 * Card reutilizable con header, body y footer opcionales
 */

const Card = ({
  children,
  header,
  footer,
  image,
  imageAlt = 'Card image',
  imageHeight = '200px',
  className = '',
  bodyClassName = '',
  style = {},
  onClick,
  hoverable = true
}) => {
  const cardClasses = `card-custom ${hoverable && onClick ? 'cursor-pointer' : ''} ${className}`.trim();

  return (
    <div 
      className={cardClasses} 
      style={style}
      onClick={onClick}
    >
      {/* Image */}
      {image && (
        <div 
          className="card-image"
          style={{
            height: imageHeight,
            overflow: 'hidden',
            backgroundColor: 'var(--dark-blue)'
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className="d-none align-items-center justify-content-center h-100"
            style={{ color: 'var(--glacier)' }}
          >
            <div className="text-center">
              <i className="bi bi-image mb-2" style={{ fontSize: '2rem' }}></i>
              <p className="mb-0">Imagen no disponible</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      {header && (
        <div className="card-header-custom">
          {header}
        </div>
      )}

      {/* Body */}
      <div className={`card-body-custom ${bodyClassName}`}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="card-footer-custom">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;