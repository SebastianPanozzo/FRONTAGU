import axiosInstance from './axiosConfig';

const APPOINTMENT_ENDPOINT = '/api/appointments';

/**
 * API de Turnos
 * Gestiona operaciones CRUD de turnos
 */
export const appointmentApi = {
  /**
   * Obtener todos los turnos (solo profesionales)
   * @returns {Promise} Lista de turnos
   */
  getAllAppointments: async () => {
    try {
      const response = await axiosInstance.get(APPOINTMENT_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener turnos');
    }
  },

  /**
   * Obtener turno por ID
   * @param {string} appointmentId - ID del turno
   * @returns {Promise} Datos del turno
   */
  getAppointmentById: async (appointmentId) => {
    try {
      const response = await axiosInstance.get(`${APPOINTMENT_ENDPOINT}/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener turno');
    }
  },

  /**
   * Obtener turnos de un usuario específico
   * @param {string} userId - ID del usuario
   * @returns {Promise} Lista de turnos del usuario
   */
  getAppointmentsByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`${APPOINTMENT_ENDPOINT}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener turnos del usuario');
    }
  },

  /**
   * Obtener turnos por fecha
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Promise} Lista de turnos de la fecha
   */
  getAppointmentsByDate: async (date) => {
    try {
      const response = await axiosInstance.get(`${APPOINTMENT_ENDPOINT}/date/${date}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener turnos por fecha');
    }
  },

  /**
   * Crear un nuevo turno (solo profesionales)
   * @param {Object} appointmentData - Datos del turno (date, startTime, endTime, userId, treatmentId, notes)
   * @returns {Promise} Turno creado
   */
  createAppointment: async (appointmentData) => {
    try {
      const response = await axiosInstance.post(APPOINTMENT_ENDPOINT, appointmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear turno');
    }
  },

  /**
   * Actualizar turno (solo profesionales)
   * @param {string} appointmentId - ID del turno
   * @param {Object} appointmentData - Datos a actualizar
   * @returns {Promise} Turno actualizado
   */
  updateAppointment: async (appointmentId, appointmentData) => {
    try {
      const response = await axiosInstance.put(`${APPOINTMENT_ENDPOINT}/${appointmentId}`, appointmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar turno');
    }
  },

  /**
   * Cambiar estado de un turno (solo profesionales)
   * @param {string} appointmentId - ID del turno
   * @param {string} state - Nuevo estado ('pending', 'confirmed', 'completed', 'cancelled')
   * @returns {Promise} Turno con estado actualizado
   */
  updateAppointmentState: async (appointmentId, state) => {
    try {
      const response = await axiosInstance.patch(`${APPOINTMENT_ENDPOINT}/${appointmentId}/state`, { state });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar estado del turno');
    }
  },

  /**
   * Eliminar turno (solo profesionales)
   * @param {string} appointmentId - ID del turno
   * @returns {Promise} Confirmación de eliminación
   */
  deleteAppointment: async (appointmentId) => {
    try {
      const response = await axiosInstance.delete(`${APPOINTMENT_ENDPOINT}/${appointmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar turno');
    }
  },
};

export default appointmentApi;