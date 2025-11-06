// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para requests
api.interceptors.request.use((config) => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios API
export const serviceAPI = {
  // Obtener todos los servicios
  getAllServices: async () => {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener servicios');
    }
  },

  // Obtener servicio por ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener servicio');
    }
  },

  // Crear servicio
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear servicio');
    }
  },

  // Actualizar servicio
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar servicio');
    }
  },

  // Eliminar servicio
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar servicio');
    }
  }
};

export default api;