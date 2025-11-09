/**
 * AppointmentFilters.jsx
 * Componente de filtros para turnos
 */

import { formatearNombreCompleto } from '../../utils/formatters';

const AppointmentFilters = ({ filtros, setFiltros, contadores, usuarios }) => {
  const handleFiltroEstado = (estado) => {
    setFiltros(prev => ({
      ...prev,
      estado
    }));
  };

  const handleFiltroFecha = (e) => {
    setFiltros(prev => ({
      ...prev,
      fecha: e.target.value
    }));
  };

  const handleFiltroUsuario = (e) => {
    setFiltros(prev => ({
      ...prev,
      usuario: e.target.value
    }));
  };

  const handleBusqueda = (e) => {
    setFiltros(prev => ({
      ...prev,
      busqueda: e.target.value
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      estado: 'todos',
      fecha: '',
      usuario: '',
      busqueda: ''
    });
  };

  const pacientes = usuarios.filter(u => u.role === 'user');

  return (
    <div className="row g-3 mb-4">
      {/* Filtros por Estado */}
      <div className="col-12">
        <div className="card-custom">
          <div className="card-body-custom p-3">
            <div className="btn-group w-100" role="group" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                type="button"
                className={`btn ${filtros.estado === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleFiltroEstado('todos')}
                style={{
                  backgroundColor: filtros.estado === 'todos' ? '#650015' : 'transparent',
                  borderColor: '#D0E4F7',
                  color: filtros.estado === 'todos' ? 'white' : '#D0E4F7',
                  flex: '1 1 auto'
                }}
              >
                Todos ({contadores.todos})
              </button>
              <button
                type="button"
                className={`btn ${filtros.estado === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleFiltroEstado('pending')}
                style={{
                  backgroundColor: filtros.estado === 'pending' ? '#650015' : 'transparent',
                  borderColor: '#D0E4F7',
                  color: filtros.estado === 'pending' ? 'white' : '#D0E4F7',
                  flex: '1 1 auto'
                }}
              >
                Pendientes ({contadores.pending})
              </button>
              <button
                type="button"
                className={`btn ${filtros.estado === 'confirmed' ? 'btn-info' : 'btn-outline-info'}`}
                onClick={() => handleFiltroEstado('confirmed')}
                style={{
                  backgroundColor: filtros.estado === 'confirmed' ? '#650015' : 'transparent',
                  borderColor: '#D0E4F7',
                  color: filtros.estado === 'confirmed' ? 'white' : '#D0E4F7',
                  flex: '1 1 auto'
                }}
              >
                Confirmados ({contadores.confirmed})
              </button>
              <button
                type="button"
                className={`btn ${filtros.estado === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => handleFiltroEstado('completed')}
                style={{
                  backgroundColor: filtros.estado === 'completed' ? '#650015' : 'transparent',
                  borderColor: '#D0E4F7',
                  color: filtros.estado === 'completed' ? 'white' : '#D0E4F7',
                  flex: '1 1 auto'
                }}
              >
                Completados ({contadores.completed})
              </button>
              <button
                type="button"
                className={`btn ${filtros.estado === 'cancelled' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => handleFiltroEstado('cancelled')}
                style={{
                  backgroundColor: filtros.estado === 'cancelled' ? '#650015' : 'transparent',
                  borderColor: '#D0E4F7',
                  color: filtros.estado === 'cancelled' ? 'white' : '#D0E4F7',
                  flex: '1 1 auto'
                }}
              >
                Cancelados ({contadores.cancelled})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros Adicionales */}
      <div className="col-12">
        <div className="card-custom">
          <div className="card-body-custom p-3">
            <div className="row g-3">
              {/* Búsqueda */}
              <div className="col-md-4">
                <label className="form-label-custom mb-2" style={{ color: 'var(--glacier)' }}>
                  <i className="bi bi-search me-2"></i>
                  Buscar
                </label>
                <input
                  type="text"
                  className="form-input-custom"
                  placeholder="Buscar por paciente o tratamiento..."
                  value={filtros.busqueda}
                  onChange={handleBusqueda}
                />
              </div>

              {/* Filtro por Fecha */}
              <div className="col-md-3">
                <label className="form-label-custom mb-2" style={{ color: 'var(--glacier)' }}>
                  <i className="bi bi-calendar me-2"></i>
                  Fecha
                </label>
                <input
                  type="date"
                  className="form-input-custom"
                  value={filtros.fecha}
                  onChange={handleFiltroFecha}
                />
              </div>

              {/* Filtro por Paciente */}
              <div className="col-md-3">
                <label className="form-label-custom mb-2" style={{ color: 'var(--glacier)' }}>
                  <i className="bi bi-person me-2"></i>
                  Paciente
                </label>
                <select
                  className="form-input-custom"
                  value={filtros.usuario}
                  onChange={handleFiltroUsuario}
                >
                  <option value="">Todos los pacientes</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {formatearNombreCompleto(paciente)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón Limpiar */}
              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="button"
                  className="btn-custom btn-secondary-custom w-100"
                  onClick={limpiarFiltros}
                  title="Limpiar filtros"
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;