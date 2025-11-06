import { useState, useEffect } from 'react';
import { serviceAPI } from '../../../services/api';
import Slider from '../../../components/Slider'; // Ajusta la ruta según tu estructura

// Modal para mostrar detalles del servicio
const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#15325c', // --dark-blue
          borderRadius: '15px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            color: '#D0E4F7', // --glacier
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(208, 228, 247, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>

        {/* Título del servicio */}
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#D0E4F7', // --glacier
          marginBottom: '20px',
          textAlign: 'center',
          paddingRight: '40px' // Para evitar que se solape con el botón de cerrar
        }}>
          {service.name}
        </h2>

        {/* Descripción del servicio */}
        <div style={{
          color: '#D0E4F7', // --glacier
          lineHeight: '1.6',
          marginBottom: '25px',
          fontSize: '1rem'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#D0E4F7' // --glacier
          }}>
            Descripción:
          </h3>
          <p>{service.description}</p>
        </div>

        {/* Información adicional si existe */}
        {service.duration && (
          <div style={{
            color: '#D0E4F7', // --glacier
            marginBottom: '15px'
          }}>
            <strong>Duración:</strong> {service.duration}
          </div>
        )}

        {service.benefits && (
          <div style={{
            color: '#D0E4F7', // --glacier
            marginBottom: '15px'
          }}>
            <strong>Beneficios:</strong> {service.benefits}
          </div>
        )}

        {service.requirements && (
          <div style={{
            color: '#D0E4F7', // --glacier
            marginBottom: '15px'
          }}>
            <strong>Requisitos:</strong> {service.requirements}
          </div>
        )}

        {/* Botón de acción */}
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <button
            style={{
              background: '#650015', // --burgundy
              color: '#D0E4F7', // --glacier
              border: 'none',
              borderRadius: '20px',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(101, 0, 21, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(101, 0, 21, 0.4)';
              e.target.style.background = '#7a001a';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(101, 0, 21, 0.3)';
              e.target.style.background = '#650015';
            }}
            onClick={() => {
              console.log('Solicitar cita para:', service.name);
              onClose();
              // Aquí puedes agregar la lógica para solicitar cita
            }}
          >
            Solicitar Cita
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Card para cada servicio (simplificado)
const ServiceCard = ({ context }) => {
  const { item: service, button } = context;

  return (
    <div 
      className="service-card"
      style={{
        backgroundColor: '#15325c', // --dark-blue
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        height: '405px', // Altura reducida al eliminar descripción
        width: '330px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Imagen del servicio */}
      <div 
        style={{
          height: '300px', // Aumentada la altura de la imagen
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #15325c 0%, #650015 100%)'
        }}
      >
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #D0E4F7; font-size: 16px;">
                  <i class="fas fa-tooth" style="margin-right: 8px;"></i>
                  ${service.name}
                </div>
              `;
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#D0E4F7', // --glacier
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            <i className="fas fa-tooth" style={{ marginRight: '8px' }}></i>
            {service.name}
          </div>
        )}
      </div>

      {/* Contenido de la card */}
      <div style={{ 
        padding: '20px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#D0E4F7', // --glacier
          textAlign: 'center',
          marginBottom: '15px',
          lineHeight: '1.3'
        }}>
          {service.name}
        </h3>

        {/* Botón de acción */}
        {button && (
          <div style={{ textAlign: 'center' }}>
            <button
              style={{
                background: '#650015', // --burgundy
                color: '#D0E4F7', // --glacier
                border: 'none',
                borderRadius: '20px',
                padding: '10px 25px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(101, 0, 21, 0.3)',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(101, 0, 21, 0.4)';
                e.target.style.background = '#7a001a';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(101, 0, 21, 0.3)';
                e.target.style.background = '#650015';
              }}
              onClick={() => button.onClick?.(service)}
            >
              {button.text || 'Ver detalles'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar servicios
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await serviceAPI.getAllServices();
      setServices(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar clic en el botón de las cards
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
        color: '#650015', // --burgundy
        backgroundImage: 'url(../../../../public/img/Services.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '30px',
          borderRadius: '15px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #650015',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Cargando servicios...</p>
        </div>
        
        {/* Estilos CSS para la animación */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(../../../../public/img/Services.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      {/* Overlay para mejorar la legibilidad */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* Contenido principal */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          flexShrink: 0
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#650015', // --burgundy
            marginBottom: '8px'
          }}>
            Ferreyra y Panozzo
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#650015', // --burgundy
            marginBottom: '10px'
          }}>
            Servicios Odontológicos de Excelencia
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(254, 215, 215, 0.95)',
            border: '1px solid #f56565',
            borderRadius: '10px',
            padding: '15px',
            margin: '0 auto 20px',
            maxWidth: '600px',
            color: '#742a2a',
            textAlign: 'center',
            flexShrink: 0
          }}>
            <strong>⚠️ Error:</strong> {error}
            <br />
            <button
              onClick={loadServices}
              style={{
                marginTop: '10px',
                background: '#650015', // --burgundy
                color: '#D0E4F7', // --glacier
                border: 'none',
                borderRadius: '5px',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Servicios con Slider */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {services.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#650015', // --burgundy
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              margin: '0 auto',
              maxWidth: '500px',
              alignSelf: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🦷</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                No hay servicios disponibles
              </h3>
              <p>Por favor, vuelve a intentar más tarde.</p>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                color: '#650015', // --burgundy
                marginBottom: '15px',
                flexShrink: 0
              }}>
                Nuestros Servicios
              </h2>
              
              <div style={{ flex: 1, minHeight: 0 }}>
                <Slider
                  context={{
                    items: services,
                    Component: ServiceCard,
                    button: {
                      text: 'Ver detalles',
                      onClick: handleServiceClick
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      <ServiceModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Estilos CSS para la animación */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .service-card:hover {
            transform: translateY(-5px) !important;
          }
        `
      }} />
    </div>
  );
};

export default ServicesList;