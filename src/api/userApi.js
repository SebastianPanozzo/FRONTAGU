import axiosInstance from './axiosConfig';

const USER_ENDPOINT = '/api/users';

/**
 * API de Usuarios
 * Gestiona operaciones CRUD de usuarios (solo profesionales)
 */
export const userApi = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise} Lista de usuarios
   */
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(USER_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios');
    }
  },

  /**
   * Obtener usuario por ID
   * @param {string} userId - ID del usuario
   * @returns {Promise} Datos del usuario
   */
  getUserById: async (userId) => {
    try {
      const response = await axiosInstance.get(`${USER_ENDPOINT}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuario');
    }
  },

  /**
   * Obtener usuarios por rol
   * @param {string} role - Rol ('user' o 'professional')
   * @returns {Promise} Lista de usuarios del rol especificado
   */
  getUsersByRole: async (role) => {
    try {
      const response = await axiosInstance.get(`${USER_ENDPOINT}/role/${role}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios por rol');
    }
  },

  /**
   * Obtener usuarios activos (sesión abierta)
   * @returns {Promise} Lista de usuarios activos
   */
  getActiveUsers: async () => {
    try {
      const response = await axiosInstance.get(`${USER_ENDPOINT}/active`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener usuarios activos');
    }
  },

  /**
   * Eliminar usuario (solo usuarios con rol 'user')
   * @param {string} userId - ID del usuario
   * @returns {Promise} Confirmación de eliminación
   */
  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`${USER_ENDPOINT}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar usuario');
    }
  },
};

export default userApi;