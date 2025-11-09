/**
 * AppointmentsManager.jsx
 * Gestor principal de turnos para profesionales
 * Ferreyra & Panozzo - Odontología General
 */

import { useState, useEffect } from 'react';
import { useAppointments } from '../../hooks/useAppointment';
import { useUsers } from '../../hooks/useUser';
import { useTreatments } from '../../hooks/useTreatment';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import AppointmentList from '../../components/appointments/AppointmentList';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import AppointmentDetail from '../../components/appointments/AppointmentDetail';
import AppointmentFilters from '../../components/appointments/AppointmentFilters';
import ConfirmModal from '../../components/appointments/ConfirmModal';
import { APPOINTMENT_STATES, MESSAGES } from '../../utils/constants';
import { formatearFecha } from '../../utils/formatters';

const AppointmentsManager = () => {
  const { currentUser } = useAuth();
  
  const {
    appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    loadAllAppointments,
    createAppointment,
    modifyAppointment,
    changeAppointmentState,
    deleteAppointment,
    clearError: clearAppointmentsError,
  } = useAppointments();

  const { users, loadAllUsers } = useUsers();
  const { treatments, loadAllTreatments } = useTreatments();

  const [vistaActual, setVistaActual] = useState('lista'); // 'lista', 'formulario', 'detalle'
  const [appointmentSeleccionado, setAppointmentSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  
  // Filtros
  const [filtros, setFiltros] = useState({
    estado: 'todos',
    fecha: '',
    usuario: '',
    busqueda: ''
  });

  // Modal de confirmación
  const [modalConfirm, setModalConfirm] = useState({
    show: false,
    titulo: '',
    mensaje: '',
    tipo: 'warning',
    onConfirm: null
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      clearAppointmentsError();
      await Promise.all([
        loadAllAppointments().catch(() => []),
        loadAllUsers().catch(() => []),
        loadAllTreatments().catch(() => [])
      ]);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    }
  };

  // Filtrar turnos según criterios
  const appointmentsFiltrados = appointments.filter(appointment => {
    // Filtro por estado
    if (filtros.estado !== 'todos' && appointment.state !== filtros.estado) {
      return false;
    }

    // Filtro por fecha
    if (filtros.fecha && appointment.date !== filtros.fecha) {
      return false;
    }

    // Filtro por usuario
    if (filtros.usuario && appointment.userId !== filtros.usuario) {
      return false;
    }

    // Filtro por búsqueda (nombre del usuario o tratamiento)
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      const usuario = users.find(u => u.id === appointment.userId);
      const tratamiento = treatments.find(t => t.id === appointment.treatmentId);
      
      const nombreUsuario = usuario ? `${usuario.name} ${usuario.lastname}`.toLowerCase() : '';
      const nombreTratamiento = tratamiento ? tratamiento.name.toLowerCase() : '';
      
      if (!nombreUsuario.includes(busqueda) && !nombreTratamiento.includes(busqueda)) {
        return false;
      }
    }

    return true;
  });

  // Contar turnos por estado
  const contadores = {
    todos: appointments.length,
    pending: appointments.filter(a => a.state === APPOINTMENT_STATES.PENDING).length,
    confirmed: appointments.filter(a => a.state === APPOINTMENT_STATES.CONFIRMED).length,
    completed: appointments.filter(a => a.state === APPOINTMENT_STATES.COMPLETED).length,
    cancelled: appointments.filter(a => a.state === APPOINTMENT_STATES.CANCELLED).length,
  };

  const handleNuevoTurno = () => {
    setAppointmentSeleccionado(null);
    setModoEdicion(false);
    setVistaActual('formulario');
  };

  const handleVerDetalle = (appointment) => {
    setAppointmentSeleccionado(appointment);
    setVistaActual('detalle');
  };

  const handleEditarTurno = (appointment) => {
    setAppointmentSeleccionado(appointment);
    setModoEdicion(true);
    setVistaActual('formulario');
  };

  const handleCambiarEstado = (appointment, nuevoEstado) => {
    setModalConfirm({
      show: true,
      titulo: 'Cambiar Estado del Turno',
      mensaje: `¿Está seguro de cambiar el estado del turno a "${nuevoEstado}"?`,
      tipo: 'warning',
      onConfirm: () => confirmarCambioEstado(appointment.id, nuevoEstado)
    });
  };

  const confirmarCambioEstado = async (appointmentId, nuevoEstado) => {
    try {
      await changeAppointmentState(appointmentId, nuevoEstado);
      setSuccessMessage('Estado del turno actualizado correctamente');
      setModalConfirm({ ...modalConfirm, show: false });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error al cambiar estado:', err);
    }
  };

  const handleEliminarTurno = (appointment) => {
    setModalConfirm({
      show: true,
      titulo: 'Eliminar Turno',
      mensaje: MESSAGES.CONFIRM.DELETE_APPOINTMENT,
      tipo: 'danger',
      onConfirm: () => confirmarEliminar(appointment.id)
    });
  };

  const confirmarEliminar = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setSuccessMessage(MESSAGES.SUCCESS.APPOINTMENT_DELETED);
      setModalConfirm({ ...modalConfirm, show: false });
      if (vistaActual === 'detalle') {
        setVistaActual('lista');
      }
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error al eliminar turno:', err);
    }
  };

  const handleSubmitForm = async (appointmentData) => {
    try {
      if (modoEdicion && appointmentSeleccionado) {
        await modifyAppointment(appointmentSeleccionado.id, appointmentData);
        setSuccessMessage(MESSAGES.SUCCESS.APPOINTMENT_UPDATED);
      } else {
        await createAppointment(appointmentData);
        setSuccessMessage(MESSAGES.SUCCESS.APPOINTMENT_CREATED);
      }
      setVistaActual('lista');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error al guardar turno:', err);
    }
  };

  const handleCancelarForm = () => {
    setVistaActual('lista');
    setAppointmentSeleccionado(null);
    setModoEdicion(false);
  };

  const handleVolverALista = () => {
    setVistaActual('lista');
    setAppointmentSeleccionado(null);
  };

  const isLoading = appointmentsLoading;

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="h2 mb-2 fw-bold" style={{ color: 'var(--dark-blue)' }}>
                <i className="bi bi-calendar-check me-2"></i>
                Gestión de Turnos
              </h1>
              <p className="mb-0" style={{ color: 'var(--burgundy)', opacity: 0.8 }}>
                {vistaActual === 'lista' && 'Administre los turnos de sus pacientes'}
                {vistaActual === 'formulario' && (modoEdicion ? 'Editar turno existente' : 'Crear nuevo turno')}
                {vistaActual === 'detalle' && 'Detalle del turno'}
              </p>
            </div>
            <div className="d-flex gap-2">
              {vistaActual === 'lista' && (
                <>
                  <button
                    onClick={cargarDatos}
                    className="btn-custom btn-secondary-custom"
                    title="Actualizar datos"
                    style={{ width: 'auto', whiteSpace: 'nowrap' }}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Actualizar
                  </button>
                  <button
                    onClick={handleNuevoTurno}
                    className="btn-custom btn-primary-custom"
                    style={{ width: 'auto', whiteSpace: 'nowrap' }}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Nuevo Turno
                  </button>
                </>
              )}
              {(vistaActual === 'formulario' || vistaActual === 'detalle') && (
                <button
                  onClick={handleVolverALista}
                  className="btn-custom btn-secondary-custom"
                  style={{ width: 'auto', whiteSpace: 'nowrap' }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {successMessage && (
        <div className="row mb-4">
          <div className="col-12">
            <ErrorMessage
              message={successMessage}
              type="success"
              onDismiss={() => setSuccessMessage('')}
            />
          </div>
        </div>
      )}

      {appointmentsError && (
        <div className="row mb-4">
          <div className="col-12">
            <ErrorMessage
              message={appointmentsError}
              type="error"
              onDismiss={clearAppointmentsError}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="row">
          <div className="col-12">
            <Loading message="Cargando turnos..." size="lg" />
          </div>
        </div>
      ) : (
        <>
          {/* Vista Lista */}
          {vistaActual === 'lista' && (
            <>
              <AppointmentFilters
                filtros={filtros}
                setFiltros={setFiltros}
                contadores={contadores}
                usuarios={users}
              />
              
              <div className="row">
                <div className="col-12">
                  <div className="card-custom">
                    <div className="card-body-custom">
                      <AppointmentList
                        appointments={appointmentsFiltrados}
                        users={users}
                        treatments={treatments}
                        onVerDetalle={handleVerDetalle}
                        onEditar={handleEditarTurno}
                        onCambiarEstado={handleCambiarEstado}
                        onEliminar={handleEliminarTurno}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Vista Formulario */}
          {vistaActual === 'formulario' && (
            <div className="row">
              <div className="col-12">
                <div className="card-custom">
                  <div className="card-header-custom">
                    <h5 className="mb-0" style={{ color: 'var(--glacier)' }}>
                      <i className={`bi ${modoEdicion ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                      {modoEdicion ? 'Editar Turno' : 'Nuevo Turno'}
                    </h5>
                  </div>
                  <div className="card-body-custom">
                    <AppointmentForm
                      appointment={appointmentSeleccionado}
                      users={users}
                      treatments={treatments}
                      onSubmit={handleSubmitForm}
                      onCancel={handleCancelarForm}
                      modoEdicion={modoEdicion}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vista Detalle */}
          {vistaActual === 'detalle' && appointmentSeleccionado && (
            <div className="row">
              <div className="col-12">
                <AppointmentDetail
                  appointment={appointmentSeleccionado}
                  users={users}
                  treatments={treatments}
                  onEditar={handleEditarTurno}
                  onCambiarEstado={handleCambiarEstado}
                  onEliminar={handleEliminarTurno}
                  onVolver={handleVolverALista}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmación */}
      <ConfirmModal
        show={modalConfirm.show}
        titulo={modalConfirm.titulo}
        mensaje={modalConfirm.mensaje}
        tipo={modalConfirm.tipo}
        onConfirm={modalConfirm.onConfirm}
        onCancel={() => setModalConfirm({ ...modalConfirm, show: false })}
      />
    </div>
  );
};

export default AppointmentsManager;