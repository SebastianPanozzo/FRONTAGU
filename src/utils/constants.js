/**
 * Constantes globales del sistema frontend
 */

// Roles de usuario
export const ROLES = {
  USER: 'user',
  PROFESSIONAL: 'professional',
};

// Estados de sesión
export const SESSION_STATES = {
  OPEN: 'sessionStarted',
  CLOSED: 'closedSession',
};

// Estados de turnos
export const APPOINTMENT_STATES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Etiquetas de estados de turnos para mostrar
export const APPOINTMENT_STATE_LABELS = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

// Colores de estados de turnos (para badges)
export const APPOINTMENT_STATE_COLORS = {
  pending: 'warning',
  confirmed: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

// Configuración de turnos
export const APPOINTMENT_CONFIG = {
  MIN_DURATION: 15, // minutos
  DEFAULT_DURATION: 60, // minutos
  WORKING_HOURS_START: '06:00',
  WORKING_HOURS_END: '24:00',
};

// Rutas de navegación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  WORKSPACE: '/workspace',
  WORKSPACE_DASHBOARD: '/workspace/dashboard',
  WORKSPACE_APPOINTMENTS: '/workspace/appointments',
  WORKSPACE_TREATMENTS: '/workspace/treatments',
  WORKSPACE_USERS: '/workspace/users',
  WORKSPACE_PROFILE: '/workspace/profile',
};

// Mensajes del sistema
export const MESSAGES = {
  // Éxito
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    LOGOUT: 'Sesión cerrada correctamente',
    REGISTER: 'Usuario registrado exitosamente',
    APPOINTMENT_CREATED: 'Turno creado exitosamente',
    APPOINTMENT_UPDATED: 'Turno actualizado exitosamente',
    APPOINTMENT_DELETED: 'Turno eliminado exitosamente',
    TREATMENT_CREATED: 'Tratamiento creado exitosamente',
    TREATMENT_UPDATED: 'Tratamiento actualizado exitosamente',
    TREATMENT_DELETED: 'Tratamiento eliminado exitosamente',
    USER_DELETED: 'Usuario eliminado exitosamente',
  },
  
  // Error
  ERROR: {
    GENERIC: 'Ha ocurrido un error. Por favor, intente nuevamente.',
    LOGIN: 'Error al iniciar sesión. Verifique sus credenciales.',
    REGISTER: 'Error al registrar usuario.',
    LOAD_DATA: 'Error al cargar datos.',
    SAVE_DATA: 'Error al guardar datos.',
    DELETE_DATA: 'Error al eliminar.',
    UNAUTHORIZED: 'No tiene permisos para realizar esta acción.',
    SESSION_EXPIRED: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
  },
  
  // Confirmación
  CONFIRM: {
    DELETE_APPOINTMENT: '¿Está seguro de eliminar este turno?',
    DELETE_TREATMENT: '¿Está seguro de eliminar este tratamiento?',
    DELETE_USER: '¿Está seguro de eliminar este usuario?',
    CANCEL_APPOINTMENT: '¿Está seguro de cancelar este turno?',
    LOGOUT: '¿Está seguro de cerrar sesión?',
  },
};

// Validaciones
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-()]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PRICE: 0,
  MAX_PRICE: 999999,
};

// Información del consultorio
export const CLINIC_INFO = {
  NAME: 'Ferreyra & Panozzo - Odontología General',
  ADDRESS: '25 de Mayo 1484 - 1er piso consultorio 8',
  CITY: 'Corrientes Capital',
  PHONE: '+3794-592217', // Reemplazar con teléfono real
  EMAIL: '1993vere@gmail.com', // Reemplazar con email real
  COORDINATES: {
    lat: -27.4698, // Coordenadas de Corrientes Capital
    lng: -58.8344,
  },
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// Formatos de fecha
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
};

export default {
  ROLES,
  SESSION_STATES,
  APPOINTMENT_STATES,
  APPOINTMENT_STATE_LABELS,
  APPOINTMENT_STATE_COLORS,
  APPOINTMENT_CONFIG,
  ROUTES,
  MESSAGES,
  VALIDATION,
  CLINIC_INFO,
  PAGINATION,
  DATE_FORMATS,
};