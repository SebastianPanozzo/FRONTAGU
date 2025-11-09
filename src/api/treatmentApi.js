import axiosInstance from './axiosConfig';

const TREATMENT_ENDPOINT = '/api/treatments';

/**
 * API de Tratamientos
 * Gestiona operaciones CRUD de tratamientos
 */
export const treatmentApi = {
  /**
   * Obtener todos los tratamientos (público)
   * @returns {Promise} Lista de tratamientos
   */
  getAllTreatments: async () => {
    try {
      const response = await axiosInstance.get(TREATMENT_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener tratamientos');
    }
  },

  /**
   * Obtener tratamiento por ID (público)
   * @param {string} treatmentId - ID del tratamiento
   * @returns {Promise} Datos del tratamiento
   */
  getTreatmentById: async (treatmentId) => {
    try {
      const response = await axiosInstance.get(`${TREATMENT_ENDPOINT}/${treatmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener tratamiento');
    }
  },

  /**
   * Crear un nuevo tratamiento (solo profesionales)
   * @param {Object} treatmentData - Datos del tratamiento (name, description, price, duration, image)
   * @returns {Promise} Tratamiento creado
   */
  createTreatment: async (treatmentData) => {
    try {
      const response = await axiosInstance.post(TREATMENT_ENDPOINT, treatmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear tratamiento');
    }
  },

  /**
   * Actualizar tratamiento (solo profesionales)
   * @param {string} treatmentId - ID del tratamiento
   * @param {Object} treatmentData - Datos a actualizar
   * @returns {Promise} Tratamiento actualizado
   */
  updateTreatment: async (treatmentId, treatmentData) => {
    try {
      const response = await axiosInstance.put(`${TREATMENT_ENDPOINT}/${treatmentId}`, treatmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar tratamiento');
    }
  },

  /**
   * Eliminar tratamiento (solo profesionales)
   * @param {string} treatmentId - ID del tratamiento
   * @returns {Promise} Confirmación de eliminación
   */
  deleteTreatment: async (treatmentId) => {
    try {
      const response = await axiosInstance.delete(`${TREATMENT_ENDPOINT}/${treatmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar tratamiento');
    }
  },

  /**
   * Subir imagen de tratamiento a imgBB
   * @param {File} imageFile - Archivo de imagen
   * @returns {Promise} URL de la imagen subida
   */
  uploadTreatmentImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
      
      if (!IMGBB_API_KEY) {
        throw new Error('IMGBB_API_KEY no está configurada. Por favor, configura la variable de entorno VITE_IMGBB_API_KEY');
      }
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || 'Error al subir imagen');
      }
    } catch (error) {
      throw new Error('Error al subir imagen: ' + error.message);
    }
  },
};

export default treatmentApi;