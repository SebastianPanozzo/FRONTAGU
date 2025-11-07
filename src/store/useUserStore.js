import { create } from 'zustand';

/**
 * Store de Usuarios
 * Gestiona el estado global de los usuarios del sistema
 */
export const useUserStore = create((set) => ({
  // Estado
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  // Acciones
  setUsers: (users) => set({ users }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),

  removeUser: (userId) => set((state) => ({
    users: state.users.filter((user) => user.id !== userId),
  })),

  updateUser: (userId, userData) => set((state) => ({
    users: state.users.map((user) =>
      user.id === userId ? { ...user, ...userData } : user
    ),
  })),

  // Filtros
  getUsersByRole: (role) => {
    const state = useUserStore.getState();
    return state.users.filter((user) => user.role === role);
  },

  getActiveUsers: () => {
    const state = useUserStore.getState();
    return state.users.filter((user) => user.state === 'sessionStarted');
  },

  clearUsers: () => set({ users: [], selectedUser: null }),
}));

export default useUserStore;