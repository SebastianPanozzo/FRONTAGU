/**
 * Componente Form
 * Formulario genérico reutilizable con validación
 */

import { useState } from 'react';
import Button from './Button';

const Form = ({
  fields,
  onSubmit,
  submitText = 'Enviar',
  onCancel,
  cancelText = 'Cancelar',
  loading = false,
  className = ''
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      // Campo requerido
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }

      // Validación de email
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Email inválido';
        }
      }

      // Validación de contraseña
      if (field.type === 'password' && formData[field.name]) {
        if (formData[field.name].length < 6) {
          newErrors[field.name] = 'La contraseña debe tener al menos 6 caracteres';
        }
      }

      // Validación de teléfono
      if (field.type === 'tel' && formData[field.name]) {
        const phoneRegex = /^[\+]?[0-9\s\-()]+$/;
        if (!phoneRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Número de teléfono inválido';
        }
      }

      // Validación personalizada
      if (field.validate && formData[field.name]) {
        const validationError = field.validate(formData[field.name], formData);
        if (validationError) {
          newErrors[field.name] = validationError;
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
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((field) => (
        <div key={field.name} className="form-group-custom">
          <label htmlFor={field.name} className="form-label-custom">
            {field.label}
            {field.required && <span className="text-danger ms-1">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              className={`form-input-custom form-textarea-custom ${errors[field.name] ? 'is-invalid' : ''}`}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              disabled={loading || field.disabled}
              rows={field.rows || 4}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              className={`form-input-custom ${errors[field.name] ? 'is-invalid' : ''}`}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={loading || field.disabled}
            >
              <option value="">Seleccionar...</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <div className="form-check">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                className="form-check-input"
                checked={formData[field.name]}
                onChange={handleChange}
                disabled={loading || field.disabled}
              />
              <label className="form-check-label" htmlFor={field.name}>
                {field.checkboxLabel || field.label}
              </label>
            </div>
          ) : (
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              className={`form-input-custom ${errors[field.name] ? 'is-invalid' : ''}`}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              disabled={loading || field.disabled}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          )}

          {errors[field.name] && (
            <span className="form-error-custom">
              {errors[field.name]}
            </span>
          )}

          {field.helpText && !errors[field.name] && (
            <small className="form-text text-muted d-block mt-1">
              {field.helpText}
            </small>
          )}
        </div>
      ))}

      <div className="d-flex gap-2 mt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default Form;