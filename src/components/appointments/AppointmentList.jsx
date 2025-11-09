/**
 * AppointmentList.jsx
 * Lista de turnos en formato tabla
 */

import { APPOINTMENT_STATE_LABELS, APPOINTMENT_STATE_COLORS } from '../../utils/constants';
import { formatearFecha, formatearHora, formatearNombreCompleto } from '../../utils/formatters';

const AppointmentList = ({
  appointments,
  users,
  treatments,
  onVerDetalle,
  onEditar,
  onCambiarEstado,
  onEliminar
}) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="alert-custom alert-info" style={{ color: 'var(--glacier)' }}>
        <i className="bi bi-info-circle me-2"></i>
        No se encontraron turnos con los filtros aplicados
      </div>
    );
  }

  const getUsuarioNombre = (userId) => {
    const usuario = users.find(u => u.id === userId);
    return usuario ? formatearNombreCompleto(usuario) : 'Usuario no encontrado';
  };

  const getTratamientoNombre = (treatmentId) => {
    const tratamiento = treatments.find(t => t.id === treatmentId);
    return tratamiento ? tratamiento.name : 'Tratamiento no encontrado';
  };

  const getBadgeClass = (state) => {
    const color = APPOINTMENT_STATE_COLORS[state] || 'secondary';
    const colorMap = {
      primary: 'var(--glacier)',
      success: '#28a745',
      warning: '#ffc107',
      danger: 'var(--burgundy)',
      secondary: '#6c757d'
    };
    return colorMap[color] || colorMap.secondary;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr style={{ 
            borderBottom: '2px solid var(--taupe)',
            backgroundColor: 'var(--glacier)'
          }}>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Paciente</th>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Tratamiento</th>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Fecha</th>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Horario</th>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Estado</th>
            <th style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} style={{ borderBottom: '1px solid var(--taupe)' }}>
              <td>
                <strong style={{ color: 'var(--dark-blue)' }}>
                  {getUsuarioNombre(appointment.userId)}
                </strong>
              </td>
              <td style={{ color: 'var(--burgundy)' }}>
                {getTratamientoNombre(appointment.treatmentId)}
              </td>
              <td>{formatearFecha(appointment.date)}</td>
              <td>
                {formatearHora(appointment.startTime)} - {formatearHora(appointment.endTime)}
              </td>
              <td>
                <span 
                  className="badge"
                  style={{ 
                    backgroundColor: getBadgeClass(appointment.state),
                    color: 'white',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px'
                  }}
                >
                  {APPOINTMENT_STATE_LABELS[appointment.state] || appointment.state}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => onVerDetalle(appointment)}
                    title="Ver detalles"
                    style={{
                      backgroundColor: 'var(--dark-blue)',
                      color: 'white',
                      border: 'none',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '6px'
                    }}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  
                  {appointment.state !== 'completed' && appointment.state !== 'cancelled' && (
                    <>
                      <button
                        className="btn btn-sm"
                        onClick={() => onEditar(appointment)}
                        title="Editar turno"
                        style={{
                          backgroundColor: 'var(--taupe)',
                          color: 'var(--dark-blue)',
                          border: 'none',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '6px'
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-sm dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{
                            backgroundColor: 'var(--burgundy)',
                            color: 'white',
                            border: 'none',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px'
                          }}
                          title="Cambiar estado"
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </button>
                        <ul className="dropdown-menu">
                          {appointment.state !== 'confirmed' && (
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => onCambiarEstado(appointment, 'confirmed')}
                              >
                                <i className="bi bi-check-circle me-2"></i>
                                Confirmar
                              </button>
                            </li>
                          )}
                          {appointment.state !== 'completed' && (
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => onCambiarEstado(appointment, 'completed')}
                              >
                                <i className="bi bi-check-circle-fill me-2"></i>
                                Completar
                              </button>
                            </li>
                          )}
                          {appointment.state !== 'cancelled' && (
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => onCambiarEstado(appointment, 'cancelled')}
                              >
                                <i className="bi bi-x-circle me-2"></i>
                                Cancelar
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                  
                  <button
                    className="btn btn-sm"
                    onClick={() => onEliminar(appointment)}
                    title="Eliminar turno"
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '6px'
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;