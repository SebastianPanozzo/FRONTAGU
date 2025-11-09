/**
 * Componente Button
 * Botón reutilizable con variantes y estados
 * Ferreyra & Panozzo - Odontología General
 */

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary-custom';
      case 'secondary':
        return 'btn-secondary-custom';
      case 'outline':
        return 'btn-outline-custom';
      default:
        return 'btn-primary-custom';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-custom ${getVariantClass()} ${fullWidth ? 'w-100' : ''} ${className}`}
      {...props}
    >
      {loading && (
        <span 
          className="spinner-border spinner-border-sm me-2" 
          role="status" 
          aria-hidden="true"
        ></span>
      )}
      {!loading && icon && <i className={`bi ${icon} me-2`}></i>}
      {children}
    </button>
  );
};

export default Button;