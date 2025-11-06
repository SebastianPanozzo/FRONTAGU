// src/pages/Register/Register.jsx
import { useState } from 'react';
import Form from '../../components/Form';
import { userAPI } from '../../services/userAPI';

const Register = ({ onClose, onRegisterSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const registerFields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ingresa tu nombre',
      required: true
    },
    {
      name: 'lastname',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Ingresa tu apellido',
      required: true
    },
    {
      name: 'mail',
      label: 'Email',
      type: 'email',
      placeholder: 'Ingresa tu email',
      required: true
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: 'tel',
      placeholder: 'Ingresa tu teléfono (ej: +5493794123456)',
      required: true
    },
    {
      name: 'birthdate',
      label: 'Fecha de Nacimiento',
      type: 'date',
      required: true
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Crea una contraseña (mín. 6 caracteres)',
      required: true
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Contraseña',
      type: 'password',
      placeholder: 'Confirma tu contraseña',
      required: true
    }
  ];

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Preparar datos para enviar (sin confirmPassword y con rol por defecto)
    const userData = {
      name: formData.name,
      lastname: formData.lastname,
      mail: formData.mail,
      phone: formData.phone,
      birthdate: formData.birthdate,
      password: formData.password,
      role: 'user' // Rol por defecto
    };

    try {
      // 1. Registrar usuario
      const registerResponse = await userAPI.register(userData);
      
      if (registerResponse.success) {
        // 2. Hacer login automático después del registro
        try {
          const loginResponse = await userAPI.login({
            mail: formData.mail,
            password: formData.password
          });

          if (loginResponse.success) {
            // Guardar token y datos del usuario
            localStorage.setItem('authToken', loginResponse.data.token);
            localStorage.setItem('currentUser', JSON.stringify(loginResponse.data.user));
            
            // Notificar al componente padre sobre el registro y login exitoso
            if (onRegisterSuccess) {
              onRegisterSuccess(loginResponse.data.user);
            }

            // Mostrar mensaje de éxito
            alert('¡Registro exitoso! Has sido logueado automáticamente. ¡Bienvenido!');
          }
        } catch (loginError) {
          // Si falla el login automático, aún así mostrar éxito de registro
          console.error('Error en login automático:', loginError);
          alert('¡Registro exitoso! Por favor, inicia sesión con tus credenciales.');
          
          // Notificar solo el registro exitoso sin login
          if (onRegisterSuccess) {
            onRegisterSuccess({ registered: true, autoLogin: false });
          }
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setErrorMessage(error.message || 'Error al registrar usuario. Intenta nuevamente.');
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
        fields={registerFields}
        onSubmit={handleRegister}
        submitText="Registrarse"
        title="Crear Cuenta"
        isLoading={isLoading}
        onCancel={onClose}
      />
    </div>
  );
};

export default Register;