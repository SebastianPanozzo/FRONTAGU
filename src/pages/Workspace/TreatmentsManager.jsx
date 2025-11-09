/**
 * TreatmentsManager.jsx
 * Gestión completa de tratamientos para profesionales
 * Ferreyra & Panozzo - Odontología General
 */

import { useState, useEffect } from 'react';
import { useTreatments } from '../../hooks/useTreatment';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import TreatmentCard from '../../components/treatments/TreatmentCard';
import TreatmentFormModal from '../../components/treatments/TreatmentFormModal';
import TreatmentFilters from '../../components/treatments/TreatmentFilters';

const TreatmentsManager = () => {
  const {
    treatments,
    loading,
    error,
    loadAllTreatments,
    createTreatment,
    modifyTreatment,
    deleteTreatment,
    uploadImage,
    searchTreatments,
    clearError,
  } = useTreatments();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTreatments();
  }, [treatments, searchTerm]);

  const loadData = async () => {
    try {
      await loadAllTreatments();
    } catch (err) {
      console.error('Error loading treatments:', err);
    }
  };

  const filterTreatments = () => {
    if (!searchTerm.trim()) {
      setFilteredTreatments(treatments);
      return;
    }

    const filtered = searchTreatments(searchTerm);
    setFilteredTreatments(filtered);
  };

  const handleCreateTreatment = () => {
    setModalMode('create');
    setSelectedTreatment(null);
    setShowModal(true);
  };

  const handleEditTreatment = (treatment) => {
    setModalMode('edit');
    setSelectedTreatment(treatment);
    setShowModal(true);
  };

  const handleDeleteTreatment = async (treatment) => {
    if (!window.confirm(`¿Está seguro de eliminar el tratamiento "${treatment.name}"?`)) {
      return;
    }

    try {
      await deleteTreatment(treatment.id);
      setSuccessMessage('Tratamiento eliminado exitosamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error deleting treatment:', err);
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createTreatment(formData);
        setSuccessMessage('Tratamiento creado exitosamente');
      } else {
        await modifyTreatment(selectedTreatment.id, formData);
        setSuccessMessage('Tratamiento actualizado exitosamente');
      }
      
      setShowModal(false);
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadData();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTreatment(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDismissError = () => {
    clearError();
  };

  const handleDismissSuccess = () => {
    setSuccessMessage(null);
  };

  if (loading && treatments.length === 0) {
    return (
      <div className="container-fluid py-5">
        <Loading message="Cargando tratamientos..." size="lg" />
      </div>
    );
  }

  return (
    <div className="workspace-container">
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h1 className="h2 mb-2 fw-bold" style={{ color: 'var(--dark-blue)' }}>
                  <i className="bi bi-heart-pulse me-2"></i>
                  Gestión de Tratamientos
                </h1>
                <p className="mb-0" style={{ color: 'var(--burgundy)', opacity: 0.8 }}>
                  Administrar servicios odontológicos ({filteredTreatments.length} {filteredTreatments.length === 1 ? 'tratamiento' : 'tratamientos'})
                </p>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={loadData}
                  className="btn-custom btn-secondary-custom"
                  title="Actualizar tratamientos"
                  disabled={loading}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Actualizar
                </button>
                <button
                  onClick={handleCreateTreatment}
                  className="btn-custom btn-primary-custom"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <i className="bi bi-plus-lg me-2"></i>
                  Nuevo Tratamiento
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="row mb-4">
            <div className="col-12">
              <ErrorMessage
                message={error}
                type="error"
                onDismiss={handleDismissError}
              />
            </div>
          </div>
        )}

        {successMessage && (
          <div className="row mb-4">
            <div className="col-12">
              <ErrorMessage
                message={successMessage}
                type="success"
                onDismiss={handleDismissSuccess}
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <TreatmentFilters
              searchTerm={searchTerm}
              onSearch={handleSearch}
              totalCount={treatments.length}
              filteredCount={filteredTreatments.length}
            />
          </div>
        </div>

        {/* Treatments Grid */}
        {filteredTreatments.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="workspace-empty-state">
                <i className="bi bi-heart-pulse workspace-empty-icon"></i>
                <h3 className="workspace-empty-title">
                  {searchTerm ? 'No se encontraron tratamientos' : 'No hay tratamientos registrados'}
                </h3>
                <p className="workspace-empty-description">
                  {searchTerm 
                    ? 'Intenta con otro término de búsqueda' 
                    : 'Comienza creando tu primer tratamiento odontológico'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateTreatment}
                    className="btn-custom btn-primary-custom mt-3"
                  >
                    <i className="bi bi-plus me-2"></i>
                    Crear Primer Tratamiento
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <TreatmentCard
                  treatment={treatment}
                  onEdit={handleEditTreatment}
                  onDelete={handleDeleteTreatment}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <TreatmentFormModal
          isOpen={showModal}
          mode={modalMode}
          treatment={selectedTreatment}
          onClose={handleCloseModal}
          onSubmit={handleSubmitForm}
          onUploadImage={uploadImage}
        />
      )}
    </div>
  );
};

export default TreatmentsManager;