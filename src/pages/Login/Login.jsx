// src/pages/Login/Login.jsx
import { useState } from 'react';
import Form from '../../components/Form';
import { userAPI } from '../../services/userAPI';

const Login = ({ onClose, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginFields = [
    {
      name: 'mail',
      label: 'Email',
      type: 'email',
      placeholder: 'Ingresa tu email',
      required: true
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Ingresa tu contraseña',
      required: true
    }
  ];

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const response = await userAPI.login(formData);
      
      if (response.success) {
        // Guardar token en localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        
        // Notificar al componente padre sobre el login exitoso
        if (onLoginSuccess) {
          onLoginSuccess(response.data.user);
        }
        
        // Mostrar mensaje de éxito
        alert('¡Bienvenido! Has iniciado sesión correctamente.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && (
        <div 
          className="alert alert-danger mx-3 mb-0"
          style={{
            backgroundColor: '#f8d7da',
            borderColor: '#650015',
            color: '#650015'
          }}
        >
          {errorMessage}
        </div>
      )}
      
      <Form
        fields={loginFields}
        onSubmit={handleLogin}
        submitText="Iniciar Sesión"
        title="Iniciar Sesión"
        isLoading={isLoading}
        onCancel={onClose}
      />
    </div>
  );
};

export default Login;