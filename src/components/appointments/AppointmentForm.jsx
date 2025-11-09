/**
 * AppointmentForm.jsx
 * Formulario para crear/editar turnos
 */

import { useState, useEffect } from 'react';
import { fechaParaInput } from '../../utils/formatters';
import { APPOINTMENT_CONFIG } from '../../utils/constants';

const AppointmentForm = ({ 
  appointment, 
  users, 
  treatments, 
  onSubmit, 
  onCancel, 
  modoEdicion 
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    treatmentId: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: '',
    state: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [busquedaPaciente, setBusquedaPaciente] = useState('');
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

  useEffect(() => {
    if (appointment && modoEdicion) {
      setFormData({
        userId: appointment.userId || '',
        treatmentId: appointment.treatmentId || '',
        date: fechaParaInput(appointment.date) || '',
        startTime: appointment.startTime || '',
        endTime: appointment.endTime || '',
        notes: appointment.notes || '',
        state: appointment.state || 'pending'
      });
    }
  }, [appointment, modoEdicion]);

  useEffect(() => {
    // Filtrar solo usuarios con rol 'user'
    const pacientes = users.filter(u => u.role === 'user');
    
    if (busquedaPaciente) {
      const termino = busquedaPaciente.toLowerCase();
      const filtrados = pacientes.filter(p => 
        `${p.name} ${p.lastname}`.toLowerCase().includes(termino) ||
        p.email.toLowerCase().includes(termino) ||
        (p.dni && p.dni.includes(termino))
      );
      setPacientesFiltrados(filtrados);
    } else {
      setPacientesFiltrados(pacientes);
    }
  }, [busquedaPaciente, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-calcular hora de fin si cambia la hora de inicio o tratamiento
    if (name === 'startTime' || name === 'treatmentId') {
      calcularHoraFin(
        name === 'startTime' ? value : formData.startTime,
        name === 'treatmentId' ? value : formData.treatmentId
      );
    }
  };

  const calcularHoraFin = (startTime, treatmentId) => {
    if (!startTime || !treatmentId) return;

    const tratamiento = treatments.find(t => t.id === treatmentId);
    if (!tratamiento || !tratamiento.duration) return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const duracionMinutos = tratamiento.duration;
    
    const totalMinutos = hours * 60 + minutes + duracionMinutos;
    const endHours = Math.floor(totalMinutos / 60);
    const endMinutes = totalMinutos % 60;

    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    
    setFormData(prev => ({
      ...prev,
      endTime
    }));
  };

  const validarFormulario = () => {
    const newErrors = {};

    if (!formData.userId) {
      newErrors.userId = 'Debe seleccionar un paciente';
    }

    if (!formData.treatmentId) {
      newErrors.treatmentId = 'Debe seleccionar un tratamiento';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const fechaSeleccionada = new Date(formData.date + 'T00:00:00');
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada < hoy && !modoEdicion) {
        newErrors.date = 'No se pueden crear turnos en fechas pasadas';
      }
    }

    if (!formData.startTime) {
      newErrors.startTime = 'La hora de inicio es requerida';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'La hora de fin es requerida';
    }

    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit(formData);
    }
  };

  const pacienteSeleccionado = users.find(u => u.id === formData.userId);
  const tratamientoSeleccionado = treatments.find(t => t.id === formData.treatmentId);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* Título del formulario */}
        <div className="col-12">
          <h4 style={{ color: 'var(--glacier)', marginBottom: '1.5rem' }}>
            <i className={`bi ${modoEdicion ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
            {modoEdicion ? 'Editar Turno' : 'Crear Nuevo Turno'}
          </h4>
        </div>

        {/* Búsqueda y Selección de Paciente */}
        <div className="col-12">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Buscar Paciente <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-input-custom mb-2"
            value={busquedaPaciente}
            onChange={(e) => setBusquedaPaciente(e.target.value)}
            placeholder="Buscar por nombre, email o DNI..."
          />
          <select
            name="userId"
            className={`form-input-custom ${errors.userId ? 'is-invalid' : ''}`}
            value={formData.userId}
            onChange={handleChange}
            size="5"
            style={{ minHeight: '120px' }}
          >
            <option value="">Seleccione un paciente</option>
            {pacientesFiltrados.map(paciente => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.name} {paciente.lastname} - {paciente.email}
                {paciente.dni && ` (DNI: ${paciente.dni})`}
              </option>
            ))}
          </select>
          {errors.userId && (
            <span className="form-error-custom">{errors.userId}</span>
          )}
          {pacientesFiltrados.length === 0 && (
            <small className="form-text" style={{ color: 'var(--burgundy)' }}>
              No se encontraron pacientes
            </small>
          )}
        </div>

        {/* Info Paciente Seleccionado */}
        {pacienteSeleccionado && (
            <div className="col-12">
                <div 
                    className="alert-custom alert-info" 
                    style={{ 
                        color: 'var(--glacier)',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                >
                    <i className="bi bi-person-check me-2"></i>
                    <strong>Paciente seleccionado:</strong> {pacienteSeleccionado.name} {pacienteSeleccionado.lastname}
                    <br />
                    <small style={{ wordBreak: 'break-all' }}>
                    Email: {pacienteSeleccionado.email}
                    </small>
                </div>
            </div>
        )}

        {/* Tratamiento */}
        <div className="col-12">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Tratamiento <span className="text-danger">*</span>
          </label>
          <select
            name="treatmentId"
            className={`form-input-custom ${errors.treatmentId ? 'is-invalid' : ''}`}
            value={formData.treatmentId}
            onChange={handleChange}
          >
            <option value="" >Seleccione un tratamiento</option >
            {treatments.map(tratamiento => (
              <option key={tratamiento.id} value={tratamiento.id}>
                {tratamiento.name} - {tratamiento.duration} min - ${tratamiento.price}
              </option>
            ))}
          </select>
          {errors.treatmentId && (
            <span className="form-error-custom">{errors.treatmentId}</span>
          )}
        </div>

        {/* Info Tratamiento Seleccionado */}
        {tratamientoSeleccionado && (
            <div className="col-12">
                <div 
                    className="alert-custom alert-success" 
                    style={{ 
                        color: 'var(--glacier)',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                >
                    <i className="bi bi-heart-pulse me-2"></i>
                    <strong>Tratamiento:</strong> {tratamientoSeleccionado.name}
                    <br />
                    <small>
                        Duración: {tratamientoSeleccionado.duration} minutos | 
                        Precio: ${tratamientoSeleccionado.price}
                    </small>
                </div>
            </div>
        )}

        {/* Fecha */}
        <div className="col-md-4">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Fecha <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            name="date"
            className={`form-input-custom ${errors.date ? 'is-invalid' : ''}`}
            value={formData.date}
            onChange={handleChange}
            min={!modoEdicion ? new Date().toISOString().split('T')[0] : undefined}
          />
          {errors.date && (
            <span className="form-error-custom">{errors.date}</span>
          )}
        </div>

        {/* Hora Inicio */}
        <div className="col-md-4">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Hora Inicio <span className="text-danger">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            className={`form-input-custom ${errors.startTime ? 'is-invalid' : ''}`}
            value={formData.startTime}
            onChange={handleChange}
            min={APPOINTMENT_CONFIG.WORKING_HOURS_START}
            max={APPOINTMENT_CONFIG.WORKING_HOURS_END}
          />
          {errors.startTime && (
            <span className="form-error-custom">{errors.startTime}</span>
          )}
          <small className="form-text" style={{ color: 'var(--glacier)' }}>
            Horario: {APPOINTMENT_CONFIG.WORKING_HOURS_START} - {APPOINTMENT_CONFIG.WORKING_HOURS_END}
          </small>
        </div>

        {/* Hora Fin */}
        <div className="col-md-4">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Hora Fin <span className="text-danger">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            className={`form-input-custom ${errors.endTime ? 'is-invalid' : ''}`}
            value={formData.endTime}
            onChange={handleChange}
            min={formData.startTime}
          />
          {errors.endTime && (
            <span className="form-error-custom">{errors.endTime}</span>
          )}
          <small className="form-text" style={{ color: 'var(--glacier)' }}>
            {tratamientoSeleccionado && 'Auto-calculada según duración'}
          </small>
        </div>

        {/* Observaciones */}
        <div className="col-12">
          <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
            Observaciones
          </label>
          <textarea
            name="notes"
            className="form-input-custom form-textarea-custom"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Observaciones o notas adicionales sobre el turno..."
          ></textarea>
        </div>

        {/* Estado (solo en modo edición) */}
        {modoEdicion && (
          <div className="col-12">
            <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
              Estado
            </label>
            <select
              name="state"
              className="form-input-custom"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmado</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="d-flex gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-custom btn-outline-custom"
          style={{ color: 'var(--glacier)' }}
        >
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-custom btn-primary-custom"
          disabled={pacientesFiltrados.length === 0 || treatments.length === 0}
        >
          <i className={`bi ${modoEdicion ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
          {modoEdicion ? 'Guardar Cambios' : 'Crear Turno'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;