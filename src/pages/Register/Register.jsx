/**
 * Página de Registro
 * Ferreyra & Panozzo - Odontología General
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Form from '../../components/common/Form';
import ErrorMessage from '../../components/common/ErrorMessage';
import { MESSAGES, ROLES } from '../../utils/constants';
import { fechaParaInput } from '../../utils/formatters';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const [localError, setLocalError] = useState('');

  // Obtener fecha máxima (18 años atrás)
  const getMaxBirthdate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return fechaParaInput(today);
  };

  // Validación personalizada para nombre y apellido
  const validateName = (value) => {
    if (/\d/.test(value)) {
      return 'No se permiten números en este campo';
    }
    return null;
  };

  const registerFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Juan',
      required: true,
      helpText: 'Tu nombre de pila',
      validate: validateName
    },
    {
      name: 'lastname',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Pérez',
      required: true,
      helpText: 'Tu apellido',
      validate: validateName
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      required: true,
      helpText: 'Usarás este email para iniciar sesión'
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'tel',
      placeholder: '+5493794123456',
      required: true,
      helpText: 'Incluye código de área (ej: +5493794123456)'
    },
    {
      name: 'birthdate',
      label: 'Fecha de Nacimiento',
      type: 'date',
      required: true,
      max: getMaxBirthdate(),
      helpText: 'Debes ser mayor de 18 años'
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••',
      required: true,
      helpText: 'Mínimo 6 caracteres'
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Contraseña',
      type: 'password',
      placeholder: '••••••••',
      required: true,
      helpText: 'Repite tu contraseña'
    }
  ];

  const handleRegister = async (formData) => {
    try {
      setLocalError('');
      clearError();

      // Preparar datos para el backend
      const userData = {
        name: formData.name.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        birthdate: formData.birthdate,
        password: formData.password,
        role: ROLES.USER // Rol por defecto
      };

      // Registrar usuario (el hook ya hace login automático si tiene éxito)
      await register(userData);

      // Registro exitoso - redirigir al workspace
      navigate('/workspace/dashboard', { replace: true });
    } catch (err) {
      setLocalError(err.message || MESSAGES.ERROR.REGISTER);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="app-container bg-glacier">
      <div className="min-h-screen d-flex align-center justify-center" style={{ padding: 'var(--spacing-xl)' }}>
        <div 
          className="w-100" 
          style={{ 
            maxWidth: '600px',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-xl)',
            border: '2px solid var(--burgundy)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div 
            style={{
              backgroundColor: 'var(--burgundy)',
              padding: 'var(--spacing-xl)',
              textAlign: 'center'
            }}
          >
            <div className="d-flex align-center justify-center gap-md mb-md">
              <i className="bi bi-heart-pulse-fill" style={{ fontSize: '2rem', color: 'var(--glacier)' }}></i>
              <h1 className="text-glacier font-extrabold" style={{ margin: 0, fontSize: 'var(--font-size-2xl)' }}>
                Ferreyra & Panozzo
              </h1>
            </div>
            <p className="text-glacier" style={{ margin: 0, fontSize: 'var(--font-size-base)' }}>
              Crea tu cuenta
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: 'var(--spacing-xl)' }}>
            {/* Error Message */}
            {(localError || error) && (
              <ErrorMessage 
                type="error" 
                message={localError || error} 
                onDismiss={() => {
                  setLocalError('');
                  clearError();
                }}
              />
            )}

            {/* Formulario */}
            <Form
              fields={registerFields}
              onSubmit={handleRegister}
              submitText="Crear Cuenta"
              onCancel={handleCancel}
              cancelText="Volver al Inicio"
              loading={loading}
            />

            {/* Separador */}
            <div className="text-center mt-lg mb-lg">
              <span style={{ color: 'var(--burgundy)', opacity: 0.7 }}>
                ¿Ya tienes cuenta?
              </span>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              onClick={handleLoginRedirect}
              disabled={loading}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                backgroundColor: 'transparent',
                color: 'var(--burgundy)',
                border: '2px solid var(--burgundy)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--burgundy)';
                e.target.style.color = 'var(--glacier)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--burgundy)';
              }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;