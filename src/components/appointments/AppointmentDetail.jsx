/**
 * AppointmentDetail.jsx
 * Vista detallada de un turno
 */

import { 
  formatearFecha, 
  formatearHora, 
  formatearNombreCompleto,
  formatearMoneda 
} from '../../utils/formatters';
import { APPOINTMENT_STATE_LABELS, APPOINTMENT_STATE_COLORS } from '../../utils/constants';

const AppointmentDetail = ({
  appointment,
  users,
  treatments,
  onEditar,
  onCambiarEstado,
  onEliminar,
  onVolver
}) => {
  const usuario = users.find(u => u.id === appointment.userId);
  const tratamiento = treatments.find(t => t.id === appointment.treatmentId);

  const getBadgeClass = (state) => {
    const color = APPOINTMENT_STATE_COLORS[state] || 'secondary';
    const colorMap = {
      primary: 'var(--dark-blue)',
      success: '#28a745',
      warning: '#ffc107',
      danger: 'var(--burgundy)',
      secondary: '#6c757d'
    };
    return colorMap[color] || colorMap.secondary;
  };

  return (
    <div className="row g-4">
      {/* Card Principal */}
      <div className="col-lg-8">
        <div className="card-custom">
          <div className="card-header-custom">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0" style={{ color: 'var(--glacier)' }}>
                <i className="bi bi-calendar-check me-2"></i>
                Detalle del Turno
              </h5>
              <span 
                className="badge"
                style={{ 
                  backgroundColor: getBadgeClass(appointment.state),
                  color: 'white',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  borderRadius: '6px'
                }}
              >
                {APPOINTMENT_STATE_LABELS[appointment.state] || appointment.state}
              </span>
            </div>
          </div>
          
          <div className="card-body-custom">
            <div className="row g-4">
              {/* Información del Paciente */}
              <div className="col-12">
                <h6 style={{ color: 'var(--glacier)', fontWeight: 'bold', marginBottom: '1rem' }}>
                  <i className="bi bi-person me-2"></i>
                  Información del Paciente
                </h6>
                <div className="border rounded p-3" style={{ backgroundColor: 'var(--burgundy)' }}>
                  {usuario ? (
                    <>
                      <div className="mb-2">
                        <strong style={{ color: 'var(--glacier)' }}>Nombre:</strong>{' '}
                        <span>{formatearNombreCompleto(usuario)}</span>
                      </div>
                      <div className="mb-2">
                        <strong style={{ color: 'var(--glacier)' }}>Email:</strong>{' '}
                        <span>{usuario.email}</span>
                      </div>
                      {usuario.phone && (
                        <div className="mb-2">
                          <strong style={{ color: 'var(--glacier)' }}>Teléfono:</strong>{' '}
                          <span>{usuario.phone}</span>
                        </div>
                      )}
                      {usuario.dni && (
                        <div>
                          <strong style={{ color: 'var(--glacier)' }}>DNI:</strong>{' '}
                          <span>{usuario.dni}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-muted">Información de paciente no disponible</div>
                  )}
                </div>
              </div>

              {/* Información del Tratamiento */}
              <div className="col-12">
                <h6 style={{ color: 'var(--glacier)', fontWeight: 'bold', marginBottom: '1rem' }}>
                  <i className="bi bi-heart-pulse me-2"></i>
                  Información del Tratamiento
                </h6>
                <div className="border rounded p-3" style={{ backgroundColor: 'var(--burgundy)' }}>
                  {tratamiento ? (
                    <>
                      <div className="mb-2">
                        <strong style={{ color: 'var(--glacier)' }}>Tratamiento:</strong>{' '}
                        <span>{tratamiento.name}</span>
                      </div>
                      <div className="mb-2">
                        <strong style={{ color: 'var(--glacier)' }}>Descripción:</strong>{' '}
                        <span>{tratamiento.description || 'Sin descripción'}</span>
                      </div>
                      <div className="mb-2">
                        <strong style={{ color: 'var(--glacier)' }}>Duración:</strong>{' '}
                        <span>{tratamiento.duration} minutos</span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--glacier)' }}>Precio:</strong>{' '}
                        <span style={{ color: 'var(--glacier)', fontWeight: 'bold' }}>
                          {formatearMoneda(tratamiento.price)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-muted">Información de tratamiento no disponible</div>
                  )}
                </div>
              </div>

              {/* Información de Fecha y Hora */}
              <div className="col-12">
                <h6 style={{ color: 'var(--glacier)', fontWeight: 'bold', marginBottom: '1rem' }}>
                  <i className="bi bi-clock me-2"></i>
                  Fecha y Horario
                </h6>
                <div className="border rounded p-3" style={{ backgroundColor: 'var(--burgundy)' }}>
                  <div className="mb-2">
                    <strong style={{ color: 'var(--glacier)' }}>Fecha:</strong>{' '}
                    <span>{formatearFecha(appointment.date)}</span>
                  </div>
                  <div className="mb-2">
                    <strong style={{ color: 'var(--glacier)' }}>Hora de inicio:</strong>{' '}
                    <span>{formatearHora(appointment.startTime)}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--glacier)' }}>Hora de fin:</strong>{' '}
                    <span>{formatearHora(appointment.endTime)}</span>
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              {appointment.notes && (
                <div className="col-12">
                  <h6 style={{ color: 'var(--glacier)', fontWeight: 'bold', marginBottom: '1rem' }}>
                    <i className="bi bi-card-text me-2"></i>
                    Observaciones
                  </h6>
                  <div className="border rounded p-3" style={{ backgroundColor: 'var(--burgundy)' }}>
                    <p className="mb-0">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar con Acciones */}
      <div className="col-lg-4">
        <div className="card-custom">
          <div className="card-header-custom">
            <h6 className="mb-0" style={{ color: 'var(--glacier)' }}>
              <i className="bi bi-gear me-2"></i>
              Acciones
            </h6>
          </div>
          <div className="card-body-custom">
            <div className="d-grid gap-2">
              {appointment.state !== 'completed' && appointment.state !== 'cancelled' && (
                <>
                  <button
                    className="btn-custom btn-primary-custom"
                    onClick={() => onEditar(appointment)}
                  >
                    <i className="bi bi-pencil me-2"></i>
                    Editar Turno
                  </button>

                  {appointment.state !== 'confirmed' && (
                    <button
                      className="btn btn-success w-100"
                      onClick={() => onCambiarEstado(appointment, 'confirmed')}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Confirmar Turno
                    </button>
                  )}

                  {appointment.state !== 'completed' && (
                    <button
                      className="btn btn-info w-100"
                      onClick={() => onCambiarEstado(appointment, 'completed')}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}
                    >
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Marcar como Completado
                    </button>
                  )}

                  {appointment.state !== 'cancelled' && (
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => onCambiarEstado(appointment, 'cancelled')}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Cancelar Turno
                    </button>
                  )}
                </>
              )}

              <hr style={{ borderColor: 'var(--taupe)' }} />

              <button
                className="btn btn-danger w-100"
                onClick={() => onEliminar(appointment)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
              >
                <i className="bi bi-trash me-2"></i>
                Eliminar Turno
              </button>

              <button
                className="btn-custom btn-outline-custom"
                onClick={onVolver}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver a la Lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;