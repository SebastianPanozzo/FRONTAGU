import { useUserStore } from '../store/useUserStore';
import userApi from '../api/userApi';

/**
 * Hook personalizado para gestión de usuarios
 * Conecta el store con la API de usuarios
 */
export const useUsers = () => {
  const {
    users,
    selectedUser,
    loading,
    error,
    setUsers,
    setSelectedUser,
    setLoading,
    setError,
    clearError,
    addUser,
    removeUser,
    updateUser,
    getUsersByRole,
    getActiveUsers,
    clearUsers,
  } = useUserStore();

  /**
   * Cargar todos los usuarios
   */
  const loadAllUsers = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await userApi.getAllUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar usuarios';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar usuario por ID
   */
  const loadUserById = async (userId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await userApi.getUserById(userId);
      
      if (response.success && response.data) {
        setSelectedUser(response.data);
        return response.data;
      }
      
      return null;
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar usuarios por rol
   */
  const loadUsersByRole = async (role) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await userApi.getUsersByRole(role);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar usuarios por rol';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar usuarios activos
   */
  const loadActiveUsers = async () => {
    try {
      setLoading(true);
      clearError();
      
      const response = await userApi.getActiveUsers();
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return [];
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar usuarios activos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar usuario (solo rol 'user')
   */
  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      clearError();
      
      const response = await userApi.deleteUser(userId);
      
      if (response.success) {
        removeUser(userId);
        return response;
      }
      
      throw new Error('Error al eliminar usuario');
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar usuario';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    selectedUser,
    loading,
    error,
    loadAllUsers,
    loadUserById,
    loadUsersByRole,
    loadActiveUsers,
    deleteUser,
    setSelectedUser,
    clearError,
    clearUsers,
    getUsersByRole,
    getActiveUsers,
  };
};

export default useUsers;