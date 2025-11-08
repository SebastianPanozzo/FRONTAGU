/**
 * UserStats.jsx
 * Componente de estadísticas de usuarios
 */

const UserStats = ({ stats }) => {
  return (
    <div className="row g-4 mb-4">
      {/* Total de usuarios */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card-custom h-100">
          <div className="card-body-custom text-center">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--burgundy)'
              }}
            >
              <i className="bi bi-people-fill" style={{ fontSize: '1.5rem', color: 'var(--glacier)' }}></i>
            </div>
            <h3 className="mb-2 fw-bold" style={{ color: 'var(--glacier)' }}>
              {stats.total}
            </h3>
            <p className="mb-0" style={{ color: 'var(--glacier)', opacity: 0.9 }}>
              Total de Usuarios
            </p>
          </div>
        </div>
      </div>

      {/* Profesionales */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card-custom h-100">
          <div className="card-body-custom text-center">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--burgundy)'
              }}
            >
              <i className="bi bi-person-badge-fill" style={{ fontSize: '1.5rem', color: 'var(--glacier)' }}></i>
            </div>
            <h3 className="mb-2 fw-bold" style={{ color: 'var(--glacier)' }}>
              {stats.professionals}
            </h3>
            <p className="mb-0" style={{ color: 'var(--glacier)', opacity: 0.9 }}>
              Profesionales
            </p>
          </div>
        </div>
      </div>

      {/* Pacientes */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card-custom h-100">
          <div className="card-body-custom text-center">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--burgundy)'
              }}
            >
              <i className="bi bi-person-fill" style={{ fontSize: '1.5rem', color: 'var(--glacier)' }}></i>
            </div>
            <h3 className="mb-2 fw-bold" style={{ color: 'var(--glacier)' }}>
              {stats.regularUsers}
            </h3>
            <p className="mb-0" style={{ color: 'var(--glacier)', opacity: 0.9 }}>
              Pacientes
            </p>
          </div>
        </div>
      </div>

      {/* Usuarios activos */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="card-custom h-100">
          <div className="card-body-custom text-center">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--burgundy)'
              }}
            >
              <i className="bi bi-person-check-fill" style={{ fontSize: '1.5rem', color: 'var(--glacier)' }}></i>
            </div>
            <h3 className="mb-2 fw-bold" style={{ color: 'var(--glacier)' }}>
              {stats.activeUsers}
            </h3>
            <p className="mb-0" style={{ color: 'var(--glacier)', opacity: 0.9 }}>
              Usuarios Activos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;