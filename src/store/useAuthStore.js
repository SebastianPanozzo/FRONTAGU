import { create } from 'zustand';

/**
 * Store de Autenticación
 * Gestiona el estado global de autenticación del usuario
 */
export const useAuthStore = create((set) => ({
  // Estado
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,

  // Acciones
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    set({ currentUser: user });
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token, isAuthenticated: !!token });
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  login: (user, token) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    set({
      currentUser: user,
      token,
      isAuthenticated: true,
      error: null,
    });
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    set({
      currentUser: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  updateUser: (userData) => set((state) => {
    const updatedUser = { ...state.currentUser, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return { currentUser: updatedUser };
  }),

  // Verificar si el usuario es profesional
  isProfessional: () => {
    const state = useAuthStore.getState();
    return state.currentUser?.role === 'professional';
  },

  // Verificar si el usuario es paciente
  isUser: () => {
    const state = useAuthStore.getState();
    return state.currentUser?.role === 'user';
  },
}));

export default useAuthStore;