/**
 * Sección de Lista de Tratamientos de la Landing Page
 * Ferreyra & Panozzo - Odontología General
 */

import { useState, useEffect } from 'react';
import useTreatments from '../../../hooks/useTreatment';
import Slider from '../../../components/common/Slider';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Loading from '../../../components/common/Loading';
import ErrorMessage from '../../../components/common/ErrorMessage';

/**
 * Componente Card para cada tratamiento
 */
const TreatmentCard = ({ item: treatment, onViewDetails }) => {
  return (
    <Card
      image={treatment.image}
      imageAlt={treatment.name}
      imageHeight="250px"
      footer={
        <Button
          variant="primary"
          onClick={() => onViewDetails(treatment)}
          fullWidth
        >
          Ver detalles
        </Button>
      }
      style={{
        height: '400px',
        width: '100%',
        maxWidth: '350px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}
      bodyClassName="d-flex flex-column"
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3 
          className="service-card-title text-center" 
          style={{ 
            color: 'var(--glacier)',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            margin: 0,
            padding: '0 1rem'
          }}
        >
          {treatment.name}
        </h3>
      </div>
    </Card>
  );
};

/**
 * Modal para mostrar detalles del tratamiento
 */
const TreatmentDetailModal = ({ treatment, isOpen, onClose }) => {
  if (!treatment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={treatment.name}
      titleStyle={{ color: 'var(--glacier)' }}
      footer={
        <Button
          variant="primary"
          icon="bi-box-arrow-right"
          onClick={() => {
            onClose();
          }}
        >
          Cerrar
        </Button>
      }
    >
      <div 
        className="treatment-detail-content"
        style={{
          maxHeight: '60vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0.5rem',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}
      >
        {/* Descripción */}
        {treatment.description && (
          <div className="mb-3">
            <h5 
              className="fw-bold" 
              style={{ 
                color: 'var(--burgundy)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Descripción:
            </h5>
            <p 
              style={{ 
                color: 'var(--dark-blue)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}
            >
              {treatment.description}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

/**
 * Componente principal de la lista de tratamientos
 */
const TreatmentList = () => {
  const { treatments, loading, error, loadAllTreatments, clearError } = useTreatments();
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar tratamientos al montar
  useEffect(() => {
    loadAllTreatments();
  }, []);

  // Manejar apertura del modal
  const handleViewDetails = (treatment) => {
    setSelectedTreatment(treatment);
    setIsModalOpen(true);
  };

  // Manejar cierre del modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTreatment(null);
  };

  return (
    <div className="services-section">
      {/* Overlay decorativo */}
      <div className="services-overlay"></div>

      {/* Contenido */}
      <div className="services-content container">
        {/* Título */}
        <div className="text-center mb-4">
          <h2 className="services-title">Nuestros Tratamientos</h2>
          <p className="fs-5" style={{ color: 'var(--burgundy)' }}>
            Servicios Odontológicos de Excelencia
          </p>
        </div>

        {/* Estados de carga/error */}
        {loading && <Loading message="Cargando tratamientos..." />}

        {error && (
          <ErrorMessage
            message={error}
            type="error"
            onDismiss={clearError}
          />
        )}

        {/* Lista de tratamientos */}
        {!loading && !error && treatments.length === 0 && (
          <div className="text-center py-5">
            <div className="d-inline-block p-4 bg-white rounded-3 shadow-sm">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦷</div>
              <h3 style={{ color: 'var(--burgundy)', marginBottom: '0.5rem' }}>
                No hay tratamientos disponibles
              </h3>
              <p style={{ color: 'var(--dark-blue)' }}>
                Por favor, vuelve a intentar más tarde.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && treatments.length > 0 && (
          <Slider
            items={treatments}
            Component={TreatmentCard}
            componentProps={{ onViewDetails: handleViewDetails }}
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            pagination={true}
            autoplay={true}
            autoplayDelay={3000}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              800: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            slideHeight="450px"
          />
        )}
      </div>

      {/* Modal de detalles */}
      <TreatmentDetailModal
        treatment={selectedTreatment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TreatmentList;