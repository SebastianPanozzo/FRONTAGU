/**
 * Componente Button
 * Botón reutilizable con variantes y estados
 */

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  style = {},
  fullWidth = false,
  ...props
}) => {
  const baseClass = 'btn-custom';
  const variantClass = variant === 'outline' 
    ? 'btn-outline-custom' 
    : variant === 'secondary'
    ? 'btn-secondary-custom'
    : 'btn-primary-custom';
  
  const widthClass = fullWidth ? 'w-100' : '';
  
  const buttonClasses = `${baseClass} ${variantClass} ${widthClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <>
          <span 
            className="spinner-border spinner-border-sm me-2" 
            role="status" 
            aria-hidden="true"
          ></span>
          Cargando...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <i className={`bi ${icon} me-2`}></i>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <i className={`bi ${icon} ms-2`}></i>
          )}
        </>
      )}
    </button>
  );
};

export default Button;