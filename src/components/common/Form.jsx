/**
 * Componente Form
 * Formulario genérico reutilizable con validación mejorada
 */

import { useState } from 'react';
import Button from './Button';
import { VALIDATION } from '../../utils/constants';

const Form = ({
  fields,
  onSubmit,
  submitText = 'Enviar',
  onCancel,
  cancelText = 'Cancelar',
  loading = false,
  className = '',
  showCancelButton = true
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
      const value = formData[field.name];

      // Campo requerido
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} es requerido`;
        return;
      }

      // No validar campos vacíos opcionales
      if (!value) return;

      // Validación de email
      if (field.type === 'email') {
        if (!VALIDATION.EMAIL_REGEX.test(value)) {
          newErrors[field.name] = 'Email inválido';
        }
      }

      // Validación de contraseña
      if (field.type === 'password' && field.name === 'password') {
        if (value.length < VALIDATION.MIN_PASSWORD_LENGTH) {
          newErrors[field.name] = `La contraseña debe tener al menos ${VALIDATION.MIN_PASSWORD_LENGTH} caracteres`;
        }
      }

      // Validación de confirmación de contraseña
      if (field.name === 'confirmPassword') {
        if (value !== formData.password) {
          newErrors[field.name] = 'Las contraseñas no coinciden';
        }
      }

      // Validación de teléfono
      if (field.type === 'tel') {
        if (!VALIDATION.PHONE_REGEX.test(value)) {
          newErrors[field.name] = 'Número de teléfono inválido';
        }
      }

      // Validación de longitud máxima de nombre
      if ((field.name === 'name' || field.name === 'lastname') && value.length > VALIDATION.MAX_NAME_LENGTH) {
        newErrors[field.name] = `${field.label} no puede exceder ${VALIDATION.MAX_NAME_LENGTH} caracteres`;
      }

      // Validación personalizada
      if (field.validate) {
        const validationError = field.validate(value, formData);
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
        {showCancelButton && onCancel && (
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
          fullWidth={!showCancelButton || !onCancel}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};

export default Form;