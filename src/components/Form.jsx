// src/components/Form.jsx
import { useState } from 'react';

const Form = ({ 
  fields, 
  onSubmit, 
  submitText, 
  title, 
  isLoading = false,
  onCancel 
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Email inválido';
        }
      }
      
      if (field.type === 'password' && formData[field.name]) {
        if (formData[field.name].length < 6) {
          newErrors[field.name] = 'La contraseña debe tener al menos 6 caracteres';
        }
      }

      if (field.type === 'phone' && formData[field.name]) {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        if (!phoneRegex.test(formData[field.name].replace(/\s/g, ''))) {
          newErrors[field.name] = 'Número de teléfono inválido';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(208, 228, 247, 0.8)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div 
          className="modal-content border-0 shadow-lg"
          style={{ 
            backgroundColor: '#D0E4F7', // Color glacier para el fondo
            border: '2px solid #650015' // Borde burgundy
          }}
        >
          <div 
            className="modal-header border-0"
            style={{ backgroundColor: '#650015' }} // Header burgundy
          >
            <h5 className="modal-title fw-bold" style={{ color: '#D0E4F7' }}>
              {title}
            </h5>
            {onCancel && (
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                style={{ filter: 'invert(1)' }}
              ></button>
            )}
          </div>
          
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-3">
                  <label 
                    htmlFor={field.name} 
                    className="form-label fw-semibold"
                    style={{ color: '#650015' }} // Labels en burgundy
                  >
                    {field.label}
                    {field.required && <span className="text-danger"> *</span>}
                  </label>
                  
                  <input
                    type={field.type}
                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'white',
                      border: '2px solid #650015',
                      borderRadius: '8px',
                      color: '#650015'
                    }}
                  />
                  
                  {errors[field.name] && (
                    <div className="invalid-feedback d-block">
                      {errors[field.name]}
                    </div>
                  )}
                </div>
              ))}
            </form>
          </div>
          
          <div 
            className="modal-footer border-0 d-flex justify-content-between"
            style={{ backgroundColor: '#D0E4F7' }}
          >
            {onCancel && (
              <button
                type="button"
                className="btn"
                onClick={onCancel}
                disabled={isLoading}
                style={{
                  backgroundColor: 'transparent',
                  color: '#650015',
                  border: '2px solid #650015'
                }}
              >
                Cancelar
              </button>
            )}
            
            <button
              type="submit"
              className="btn"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                backgroundColor: '#650015',
                color: '#D0E4F7',
                border: '2px solid #650015',
                minWidth: '120px'
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Cargando...
                </>
              ) : (
                submitText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;