import { useAuthStore } from '../store/useAuthStore';
import authApi from '../api/authApi';

/**
 * Hook personalizado para autenticación
 * Conecta el store con la API de autenticación
 */
export const useAuth = () => {
  const {
    currentUser,
    token,
    isAuthenticated,
    loading,
    error,
    setLoading,
    setError,
    clearError,
    login: storeLogin,
    logout: storeLogout,
    updateUser,
    isProfessional,
    isUser,
  } = useAuthStore();

  /**
   * Registrar un nuevo usuario
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authApi.register(userData);
      
      if (response.success && response.user && response.token) {
        storeLogin(response.user, response.token);
        return response;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      const errorMessage = err.message || 'Error al registrar usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Iniciar sesión
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authApi.login(credentials);
      
      if (response.success && response.user && response.token) {
        storeLogin(response.user, response.token);
        return response;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      setLoading(true);
      clearError();
      
      await authApi.logout();
      storeLogout();
      
      return { success: true };
    } catch (err) {
      // Aunque falle la API, cerramos sesión localmente
      storeLogout();
      console.warn('Error en logout:', err.message);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtener perfil del usuario autenticado
   */
  const getProfile = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authApi.getProfile();
      
      if (response.success && response.data) {
        updateUser(response.data);
        return response.data;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener perfil';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verificar validez del token
   */
  const verifyToken = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await authApi.verifyToken();
      
      return response.success;
    } catch (err) {
      // Si el token es inválido, cerrar sesión
      storeLogout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    token,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    getProfile,
    verifyToken,
    clearError,
    isProfessional,
    isUser,
  };
};

export default useAuth;