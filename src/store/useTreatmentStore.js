import { create } from 'zustand';

/**
 * Store de Tratamientos
 * Gestiona el estado global de los tratamientos del sistema
 */
export const useTreatmentStore = create((set) => ({
  // Estado
  treatments: [],
  selectedTreatment: null,
  loading: false,
  error: null,

  // Acciones
  setTreatments: (treatments) => set({ treatments }),

  setSelectedTreatment: (treatment) => set({ selectedTreatment: treatment }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  addTreatment: (treatment) => set((state) => ({
    treatments: [...state.treatments, treatment],
  })),

  removeTreatment: (treatmentId) => set((state) => ({
    treatments: state.treatments.filter((tr) => tr.id !== treatmentId),
  })),

  updateTreatment: (treatmentId, treatmentData) => set((state) => ({
    treatments: state.treatments.map((tr) =>
      tr.id === treatmentId ? { ...tr, ...treatmentData } : tr
    ),
  })),

  // Búsqueda
  getTreatmentById: (treatmentId) => {
    const state = useTreatmentStore.getState();
    return state.treatments.find((tr) => tr.id === treatmentId);
  },

  searchTreatments: (searchTerm) => {
    const state = useTreatmentStore.getState();
    const term = searchTerm.toLowerCase();
    return state.treatments.filter(
      (tr) =>
        tr.name.toLowerCase().includes(term) ||
        tr.description.toLowerCase().includes(term)
    );
  },

  clearTreatments: () => set({ treatments: [], selectedTreatment: null }),
}));

export default useTreatmentStore;