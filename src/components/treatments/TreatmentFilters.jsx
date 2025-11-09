/**
 * TreatmentFilters.jsx
 * Filtros de búsqueda para tratamientos
 * Ferreyra & Panozzo - Odontología General
 */

import { useState } from 'react';

const TreatmentFilters = ({ searchTerm, onSearch, totalCount, filteredCount }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  return (
    <div className="workspace-filters">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-8">
          <label htmlFor="searchTreatment" className="filter-label">
            <i className="bi bi-search me-2"></i>
            Buscar Tratamiento
          </label>
          <div className="position-relative">
            <input
              type="text"
              id="searchTreatment"
              className="filter-input"
              value={localSearchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre o descripción..."
              style={{ paddingRight: localSearchTerm ? '40px' : '12px' }}
            />
            {localSearchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="btn border-0 position-absolute"
                style={{
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--burgundy)',
                  padding: '0.25rem 0.5rem'
                }}
                title="Limpiar búsqueda"
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div 
            className="p-3 rounded text-center"
            style={{
              backgroundColor: 'var(--dark-blue)',
              color: 'var(--glacier)'
            }}
          >
            <div className="d-flex align-items-center justify-content-center gap-2">
              <i className="bi bi-funnel"></i>
              <span className="fw-semibold">
                Mostrando {filteredCount} de {totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentFilters;