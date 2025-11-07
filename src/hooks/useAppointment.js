import { useAppointmentStore } from '../store/useAppointmentStore';
import appointmentApi from '../api/appointmentApi';

/**
 * Hook personalizado para gestión de turnos
 * Conecta el store con la API de turnos
 */
export const useAppointments = () => {
  const {
    appointments,
    selectedAppointment,
    loading,
    error,
    setAppointments,
    setSelectedAppointment,
    setLoading,
    setError,
    clearError,
    addAppointment,
    removeAppointment,
    updateAppointment,
    getAppointmentsByDate,
    getAppointmentsByUser,
    getAppointmentsByState,
    getPendingAppointments,
    getConfirmedAppointments,
    clearAppointments,
  } = useAppointmentStore();

  /**
   * Cargar todos los turnos (solo profesionales)
   */
  const loadAllAppointments = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.getAllAppointments();
      
      if (response.success && response.data) {
        setAppointments(response.data);
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar turnos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar turno por ID
   */
  const loadAppointmentById = async (appointmentId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.getAppointmentById(appointmentId);
      
      if (response.success && response.data) {
        setSelectedAppointment(response.data);
        return response.data;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar turno';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar turnos de un usuario
   */
  const loadAppointmentsByUser = async (userId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.getAppointmentsByUser(userId);
      
      if (response.success && response.data) {
        setAppointments(response.data);
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar turnos del usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar turnos por fecha
   */
  const loadAppointmentsByDate = async (date) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.getAppointmentsByDate(date);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar turnos por fecha';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear un nuevo turno
   */
  const createAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.createAppointment(appointmentData);
      
      if (response.success && response.appointment) {
        addAppointment(response.appointment);
        return response;
      }
      
      throw new Error('Error al crear turno');
    } catch (err) {
      const errorMessage = err.message || 'Error al crear turno';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar turno existente
   */
  const modifyAppointment = async (appointmentId, appointmentData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.updateAppointment(appointmentId, appointmentData);
      
      if (response.success && response.appointment) {
        updateAppointment(appointmentId, response.appointment);
        return response;
      }
      
      throw new Error('Error al actualizar turno');
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar turno';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cambiar estado de un turno
   */
  const changeAppointmentState = async (appointmentId, state) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.updateAppointmentState(appointmentId, state);
      
      if (response.success && response.appointment) {
        updateAppointment(appointmentId, response.appointment);
        return response;
      }
      
      throw new Error('Error al cambiar estado del turno');
    } catch (err) {
      const errorMessage = err.message || 'Error al cambiar estado del turno';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar turno
   */
  const deleteAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await appointmentApi.deleteAppointment(appointmentId);
      
      if (response.success) {
        removeAppointment(appointmentId);
        return response;
      }
      
      throw new Error('Error al eliminar turno');
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar turno';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    selectedAppointment,
    loading,
    error,
    loadAllAppointments,
    loadAppointmentById,
    loadAppointmentsByUser,
    loadAppointmentsByDate,
    createAppointment,
    modifyAppointment,
    changeAppointmentState,
    deleteAppointment,
    setSelectedAppointment,
    clearError,
    clearAppointments,
    getAppointmentsByDate,
    getAppointmentsByUser,
    getAppointmentsByState,
    getPendingAppointments,
    getConfirmedAppointments,
  };
};

export default useAppointments;