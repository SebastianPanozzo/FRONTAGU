// src/services/userAPI.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Crear instancia de axios para usuarios
const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para agregar token a las requests
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('User API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Interceptor para responses
userApi.interceptors.response.use(
  (response) => {
    console.log('User API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('User API Error:', error.response?.data || error.message);
    
    // Si el token ha expirado, limpiar localStorage (excepto para logout)
    if (error.response?.status === 401 && !error.config.url.includes('/logout')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    }
    
    return Promise.reject(error);
  }
);

// Servicios de usuario
export const userAPI = {
  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await userApi.post('/users/api/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await userApi.post('/users/api/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  // Cerrar sesión
  logout: async (userId) => {
    try {
      // Verificar que tenemos token antes de hacer la llamada
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('No hay token para logout, solo limpiando localStorage');
        return { success: true, message: 'Sesión cerrada localmente' };
      }

      const response = await userApi.post(`/users/api/${userId}/logout`);
      return response.data;
    } catch (error) {
      // Si hay error en logout del servidor, aún así consideramos exitoso
      // ya que el objetivo es cerrar la sesión local
      console.warn('Error en logout del servidor:', error.message);
      return { success: true, message: 'Sesión cerrada localmente' };
    }
  },

  // Obtener perfil del usuario
  getProfile: async (userId) => {
    try {
      const response = await userApi.get(`/users/api/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  },

  // Actualizar perfil
  updateProfile: async (userId, userData) => {
    try {
      const response = await userApi.put(`/users/api/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar perfil');
    }
  },

  // Cambiar contraseña
  changePassword: async (userId, passwordData) => {
    try {
      const response = await userApi.put(`/users/api/${userId}/change-password`, passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cambiar contraseña');
    }
  },

  // Eliminar usuario
  deleteUser: async (userId) => {
    try {
      const response = await userApi.delete(`/users/api/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar usuario');
    }
  },

  // Obtener todos los usuarios (solo para profesionales)
  getAllUsers: async () => {
    try {
      const response = await userApi.get('/users/api');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios');
    }
  },

  // Obtener usuarios por rol
  getUsersByRole: async (role) => {
    try {
      const response = await userApi.get(`/users/api/role/${role}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios por rol');
    }
  },

  // Obtener usuarios por estado de sesión
  getUsersBySessionState: async (state) => {
    try {
      const response = await userApi.get(`/users/api/state/${state}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios por estado');
    }
  },

  // Acceso solo para profesionales
  professionalAccess: async () => {
    try {
      const response = await userApi.get('/users/api/professional-only');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Acceso denegado');
    }
  }
};

export default userApi;