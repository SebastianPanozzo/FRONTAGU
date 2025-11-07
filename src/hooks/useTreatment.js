import { useTreatmentStore } from '../store/useTreatmentStore';
import treatmentApi from '../api/treatmentApi';

/**
 * Hook personalizado para gestión de tratamientos
 * Conecta el store con la API de tratamientos
 */
export const useTreatments = () => {
  const {
    treatments,
    selectedTreatment,
    loading,
    error,
    setTreatments,
    setSelectedTreatment,
    setLoading,
    setError,
    clearError,
    addTreatment,
    removeTreatment,
    updateTreatment,
    getTreatmentById,
    searchTreatments,
    clearTreatments,
  } = useTreatmentStore();

  /**
   * Cargar todos los tratamientos (público)
   */
  const loadAllTreatments = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await treatmentApi.getAllTreatments();
      
      if (response.success && response.data) {
        setTreatments(response.data);
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar tratamientos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar tratamiento por ID
   */
  const loadTreatmentById = async (treatmentId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await treatmentApi.getTreatmentById(treatmentId);
      
      if (response.success && response.data) {
        setSelectedTreatment(response.data);
        return response.data;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar tratamiento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear un nuevo tratamiento (solo profesionales)
   */
  const createTreatment = async (treatmentData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await treatmentApi.createTreatment(treatmentData);
      
      if (response.success && response.treatment) {
        addTreatment(response.treatment);
        return response;
      }
      
      throw new Error('Error al crear tratamiento');
    } catch (err) {
      const errorMessage = err.message || 'Error al crear tratamiento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar tratamiento existente (solo profesionales)
   */
  const modifyTreatment = async (treatmentId, treatmentData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await treatmentApi.updateTreatment(treatmentId, treatmentData);
      
      if (response.success && response.treatment) {
        updateTreatment(treatmentId, response.treatment);
        return response;
      }
      
      throw new Error('Error al actualizar tratamiento');
    } catch (err) {
      const errorMessage = err.message || 'Error al actualizar tratamiento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar tratamiento (solo profesionales)
   */
  const deleteTreatment = async (treatmentId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await treatmentApi.deleteTreatment(treatmentId);
      
      if (response.success) {
        removeTreatment(treatmentId);
        return response;
      }
      
      throw new Error('Error al eliminar tratamiento');
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar tratamiento';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Subir imagen de tratamiento
   */
  const uploadImage = async (imageFile) => {
    try {
      setLoading(true);
      clearError();
      
      const imageUrl = await treatmentApi.uploadTreatmentImage(imageFile);
      
      return imageUrl;
    } catch (err) {
      const errorMessage = err.message || 'Error al subir imagen';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    treatments,
    selectedTreatment,
    loading,
    error,
    loadAllTreatments,
    loadTreatmentById,
    createTreatment,
    modifyTreatment,
    deleteTreatment,
    uploadImage,
    setSelectedTreatment,
    clearError,
    clearTreatments,
    getTreatmentById,
    searchTreatments,
  };
};

export default useTreatments;