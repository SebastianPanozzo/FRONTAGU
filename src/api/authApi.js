import axiosInstance from './axiosConfig';

const AUTH_ENDPOINT = '/api/auth';

/**
 * API de Autenticación
 * Gestiona registro, login, logout y verificación de token
 */
export const authApi = {
  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario (name, lastname, email, password, phone, birthdate, role)
   * @returns {Promise} Response con usuario y token
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINT}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  /**
   * Iniciar sesión
   * @param {Object} credentials - Email y password
   * @returns {Promise} Response con usuario y token
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINT}/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Cerrar sesión
   * @returns {Promise} Response de confirmación
   */
  logout: async () => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINT}/logout`);
      return response.data;
    } catch (error) {
      // Incluso si falla, limpiamos el localStorage local
      console.warn('Error en logout del servidor:', error.message);
      return { success: true, message: 'Sesión cerrada localmente' };
    }
  },

  /**
   * Obtener perfil del usuario autenticado
   * @returns {Promise} Response con datos del usuario
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(`${AUTH_ENDPOINT}/profile`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  },

  /**
   * Verificar validez del token actual
   * @returns {Promise} Response con estado del token
   */
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get(`${AUTH_ENDPOINT}/verify`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token inválido');
    }
  },
};

export default authApi;