/**
 * UserTable.jsx
 * Tabla de usuarios con opciones de selección y acciones
 * Versión limpia - sin función de detalles de usuario
 */

import { formatearFecha, formatearNombreCompleto, obtenerIniciales } from '../../utils/formatters';

const UserTable = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onDeleteUser,
  loading
}) => {
  const getRoleLabel = (role) => {
    return role === 'professional' ? 'Profesional' : 'Paciente';
  };

  const getStateLabel = (state) => {
    return (state === 'activeSession' || state === 'sessionStarted') ? 'Activo' : 'Inactivo';
  };

  const isUserActive = (state) => {
    return state === 'activeSession' || state === 'sessionStarted';
  };

  const hasSelectableUsers = users.some(user => user.role === 'user');

  if (users.length === 0) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card-custom">
            <div className="card-body-custom text-center py-5">
              <i
                className="bi bi-people mb-3"
                style={{ fontSize: '3rem', color: 'var(--glacier)', opacity: 0.5 }}
              ></i>
              <h5 style={{ color: 'var(--glacier)' }}>No se encontraron usuarios</h5>
              <p className="mb-0" style={{ color: 'var(--glacier)', opacity: 0.8 }}>
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card-custom">
          {/* Header de la tabla */}
          <div
            className="card-header-custom d-flex justify-content-between align-items-center"
            style={{ borderRadius: '1.5rem 1.5rem 0 0' }}
          >
            <h5 className="mb-0" style={{ color: 'var(--glacier)' }}>
              Lista de Usuarios
            </h5>
            {hasSelectableUsers && (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                  checked={selectedUsers.length === users.filter(u => u.role === 'user').length && selectedUsers.length > 0}
                  onChange={onSelectAll}
                  style={{
                    cursor: 'pointer',
                    borderColor: 'var(--glacier)',
                    backgroundColor: selectedUsers.length > 0 ? 'var(--glacier)' : 'transparent'
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="selectAll"
                  style={{ color: 'var(--glacier)', cursor: 'pointer' }}
                >
                  Seleccionar todos
                </label>
              </div>
            )}
          </div>

          {/* Tabla responsive */}
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: 'rgba(101, 0, 21, 0.1)' }}>
                <tr>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Selección
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Usuario
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Email
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Teléfono
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Fecha Nacimiento
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Rol
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Estado
                  </th>
                  <th style={{ color: 'var(--burgundy)', fontWeight: '600', borderBottom: '2px solid var(--burgundy)' }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      backgroundColor: selectedUsers.includes(user.id) 
                        ? 'rgba(101, 0, 21, 0.05)' 
                        : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {/* Checkbox de selección */}
                    <td>
                      {user.role === 'user' ? (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => onSelectUser(user.id)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ) : (
                        <span style={{ color: 'var(--burgundy)', opacity: 0.5 }}>
                          <i className="bi bi-lock-fill"></i>
                        </span>
                      )}
                    </td>

                    {/* Información del usuario */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: user.role === 'professional' ? 'var(--burgundy)' : 'rgba(101, 0, 21, 0.7)',
                            color: 'var(--glacier)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}
                        >
                          {obtenerIniciales(formatearNombreCompleto(user))}
                        </div>
                        <div>
                          <div className="fw-medium" style={{ color: 'var(--burgundy)' }}>
                            {formatearNombreCompleto(user)}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ color: 'var(--burgundy)' }}>{user.email || '-'}</td>
                    <td style={{ color: 'var(--burgundy)' }}>{user.phone || '-'}</td>
                    <td style={{ color: 'var(--burgundy)' }}>
                      {formatearFecha(user.birthdate)}
                    </td>

                    {/* Badge de rol */}
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: user.role === 'professional' ? 'var(--burgundy)' : 'rgba(101, 0, 21, 0.7)',
                          color: 'var(--glacier)',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>

                    {/* Badge de estado */}
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: isUserActive(user.state) ? '#198754' : '#6c757d',
                          color: 'white',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <i className={`bi ${isUserActive(user.state) ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                        {getStateLabel(user.state)}
                      </span>
                    </td>

                    {/* Botones de acción */}
                    <td>
                      <div className="d-flex gap-2">
                        {user.role === 'user' && (
                          <button
                            className="btn btn-sm"
                            onClick={() => onDeleteUser(user)}
                            title="Eliminar usuario"
                            style={{
                              backgroundColor: 'transparent',
                              border: '1px solid #dc3545',
                              color: '#dc3545',
                              borderRadius: '8px',
                              padding: '0.25rem 0.5rem'
                            }}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;