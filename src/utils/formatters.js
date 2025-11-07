/**
 * Funciones de formateo para datos del sistema
 */

/**
 * Formatea una fecha al formato español (DD/MM/YYYY)
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '-';
  
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  
  if (isNaN(f.getTime())) return '-';
  
  return f.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Formatea una fecha y hora al formato español (DD/MM/YYYY HH:mm)
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateadas
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '-';
  
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  
  if (isNaN(f.getTime())) return '-';
  
  return f.toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formatea una hora (HH:MM)
 * @param {string} hora - Hora en formato HH:MM o HH:MM:SS
 * @returns {string} Hora formateada HH:MM
 */
export const formatearHora = (hora) => {
  if (!hora) return '-';
  
  // Si viene en formato HH:MM:SS, extraer solo HH:MM
  if (hora.length > 5) {
    return hora.substring(0, 5);
  }
  
  return hora;
};

/**
 * Formatea un monto monetario en pesos argentinos
 * @param {number} monto - Monto a formatear
 * @returns {string} Monto formateado
 */
export const formatearMoneda = (monto) => {
  if (monto === null || monto === undefined) return '$0.00';
  
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(monto);
};

/**
 * Formatea un número con separadores de miles
 * @param {number} numero - Número a formatear
 * @returns {string} Número formateado
 */
export const formatearNumero = (numero) => {
  if (numero === null || numero === undefined) return '0';
  
  return new Intl.NumberFormat('es-AR').format(numero);
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (texto) => {
  if (!texto) return '';
  
  return texto
    .toLowerCase()
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

/**
 * Normaliza un string (quita espacios y convierte a mayúsculas)
 * @param {string} texto - String a normalizar
 * @returns {string} String normalizado
 */
export const normalizeString = (texto) => {
  if (!texto) return '';
  return texto.trim().toUpperCase();
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, longitud = 50) => {
  if (!texto) return '';
  if (texto.length <= longitud) return texto;
  return texto.substring(0, longitud) + '...';
};

/**
 * Calcula los días entre dos fechas
 * @param {Date|string} fecha1 - Primera fecha
 * @param {Date|string} fecha2 - Segunda fecha
 * @returns {number} Días de diferencia
 */
export const calcularDiasEntre = (fecha1, fecha2) => {
  const f1 = fecha1 instanceof Date ? fecha1 : new Date(fecha1);
  const f2 = fecha2 instanceof Date ? fecha2 : new Date(fecha2);
  
  const diferencia = f2.getTime() - f1.getTime();
  return Math.ceil(diferencia / (1000 * 3600 * 24));
};

/**
 * Verifica si una fecha está vencida (es anterior a hoy)
 * @param {Date|string} fecha - Fecha a verificar
 * @returns {boolean} True si está vencida
 */
export const esFechaVencida = (fecha) => {
  if (!fecha) return false;
  
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  return f < hoy;
};

/**
 * Verifica si una fecha es hoy
 * @param {Date|string} fecha - Fecha a verificar
 * @returns {boolean} True si es hoy
 */
export const esFechaHoy = (fecha) => {
  if (!fecha) return false;
  
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  const hoy = new Date();
  
  return (
    f.getDate() === hoy.getDate() &&
    f.getMonth() === hoy.getMonth() &&
    f.getFullYear() === hoy.getFullYear()
  );
};

/**
 * Convierte fecha del formato del backend (YYYY-MM-DD) al formato de input date
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
export const fechaParaInput = (fecha) => {
  if (!fecha) return '';
  
  // Si ya está en formato correcto
  if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return fecha;
  }
  
  const f = fecha instanceof Date ? fecha : new Date(fecha);
  
  if (isNaN(f.getTime())) return '';
  
  const year = f.getFullYear();
  const month = String(f.getMonth() + 1).padStart(2, '0');
  const day = String(f.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Formatea el nombre completo de una persona
 * @param {Object} persona - Objeto con name y lastname
 * @returns {string} Nombre completo formateado
 */
export const formatearNombreCompleto = (persona) => {
  if (!persona) return '-';
  
  const { name, lastname } = persona;
  
  if (!name && !lastname) return '-';
  if (!lastname) return capitalize(name);
  if (!name) return capitalize(lastname);
  
  return `${capitalize(name)} ${capitalize(lastname)}`;
};

/**
 * Formatea un número de teléfono
 * @param {string} telefono - Número de teléfono
 * @returns {string} Teléfono formateado
 */
export const formatearTelefono = (telefono) => {
  if (!telefono) return '-';
  
  // Eliminar caracteres no numéricos excepto +
  const limpio = telefono.replace(/[^\d+]/g, '');
  
  return limpio;
};

/**
 * Obtiene las iniciales de un nombre
 * @param {string} nombre - Nombre completo
 * @returns {string} Iniciales (máximo 2 letras)
 */
export const obtenerIniciales = (nombre) => {
  if (!nombre) return '?';
  
  const palabras = nombre.trim().split(' ');
  
  if (palabras.length === 1) {
    return palabras[0].charAt(0).toUpperCase();
  }
  
  return (palabras[0].charAt(0) + palabras[palabras.length - 1].charAt(0)).toUpperCase();
};

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const esEmailValido = (email) => {
  if (!email) return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default {
  formatearFecha,
  formatearFechaHora,
  formatearHora,
  formatearMoneda,
  formatearNumero,
  capitalize,
  normalizeString,
  truncarTexto,
  calcularDiasEntre,
  esFechaVencida,
  esFechaHoy,
  fechaParaInput,
  formatearNombreCompleto,
  formatearTelefono,
  obtenerIniciales,
  esEmailValido,
};