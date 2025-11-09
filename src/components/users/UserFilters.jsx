/**
 * UserFilters.jsx
 * Componente de filtros y búsqueda para usuarios
 */

const UserFilters = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card-custom">
          <div className="card-body-custom">
            <div className="row g-3">
              {/* Filtro por rol */}
              <div className="col-12 col-md-4">
                <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
                  <i className="bi bi-funnel me-2"></i>
                  Filtrar por rol:
                </label>
                <select
                  className="form-input-custom"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Todos los usuarios</option>
                  <option value="user">Pacientes</option>
                  <option value="professional">Profesionales</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div className="col-12 col-md-8">
                <label className="form-label-custom" style={{ color: 'var(--glacier)' }}>
                  <i className="bi bi-search me-2"></i>
                  Buscar usuario:
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-input-custom"
                    placeholder="Nombre, apellido, email o teléfono..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingRight: searchTerm ? '40px' : '1rem' }}
                  />
                  {searchTerm && (
                    <button
                      className="btn border-0 position-absolute"
                      style={{
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--burgundy)',
                        padding: '0.25rem 0.5rem'
                      }}
                      onClick={() => setSearchTerm('')}
                      title="Limpiar búsqueda"
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;