/**
 * Página de Login
 * Ferreyra & Panozzo - Odontología General
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Form from '../../components/common/Form';
import ErrorMessage from '../../components/common/ErrorMessage';
import { MESSAGES } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const [localError, setLocalError] = useState('');

  const loginFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      required: true,
      helpText: 'Ingresa el email con el que te registraste'
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••',
      required: true,
      helpText: 'Mínimo 6 caracteres'
    }
  ];

  const handleLogin = async (formData) => {
    try {
      setLocalError('');
      clearError();
      
      await login({
        email: formData.email,
        password: formData.password
      });

      // Login exitoso - redirigir al workspace
      navigate('/workspace/dashboard', { replace: true });
    } catch (err) {
      setLocalError(err.message || MESSAGES.ERROR.LOGIN);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="app-container bg-glacier">
      <div className="min-h-screen d-flex align-center justify-center" style={{ padding: 'var(--spacing-xl)' }}>
        <div 
          className="w-100" 
          style={{ 
            maxWidth: '500px',
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
              Ingresa a tu cuenta
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
              fields={loginFields}
              onSubmit={handleLogin}
              submitText="Iniciar Sesión"
              onCancel={handleCancel}
              cancelText="Volver al Inicio"
              loading={loading}
            />

            {/* Separador */}
            <div className="text-center mt-lg mb-lg">
              <span style={{ color: 'var(--burgundy)', opacity: 0.7 }}>
                ¿No tienes cuenta?
              </span>
            </div>

            {/* Botón Registrarse */}
            <button
              onClick={handleRegisterRedirect}
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
              <i className="bi bi-person-plus-fill me-2"></i>
              Crear una cuenta nueva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;