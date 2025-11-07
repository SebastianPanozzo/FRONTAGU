import { create } from 'zustand';

/**
 * Store de Turnos
 * Gestiona el estado global de los turnos del sistema
 */
export const useAppointmentStore = create((set) => ({
  // Estado
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,

  // Acciones
  setAppointments: (appointments) => set({ appointments }),

  setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment],
  })),

  removeAppointment: (appointmentId) => set((state) => ({
    appointments: state.appointments.filter((app) => app.id !== appointmentId),
  })),

  updateAppointment: (appointmentId, appointmentData) => set((state) => ({
    appointments: state.appointments.map((app) =>
      app.id === appointmentId ? { ...app, ...appointmentData } : app
    ),
  })),

  // Filtros
  getAppointmentsByDate: (date) => {
    const state = useAppointmentStore.getState();
    return state.appointments.filter((app) => app.date === date);
  },

  getAppointmentsByUser: (userId) => {
    const state = useAppointmentStore.getState();
    return state.appointments.filter((app) => app.userId === userId);
  },

  getAppointmentsByState: (state) => {
    const storeState = useAppointmentStore.getState();
    return storeState.appointments.filter((app) => app.state === state);
  },

  getPendingAppointments: () => {
    const state = useAppointmentStore.getState();
    return state.appointments.filter((app) => app.state === 'pending');
  },

  getConfirmedAppointments: () => {
    const state = useAppointmentStore.getState();
    return state.appointments.filter((app) => app.state === 'confirmed');
  },

  clearAppointments: () => set({ appointments: [], selectedAppointment: null }),
}));

export default useAppointmentStore;