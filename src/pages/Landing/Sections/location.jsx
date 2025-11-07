/**
 * Sección Location de la Landing Page
 * Ferreyra & Panozzo - Odontología General
 */

import { CLINIC_INFO } from '../../../utils/constants';

const Location = () => {
  // Información de ubicación desde constants
  const { ADDRESS, CITY, PHONE } = CLINIC_INFO;

  // URL del mapa embebido (Google Maps)
  const mapUrl = "https://www.google.com/maps/embed?pb=!4v1723741929486!6m8!1m7!1swFnJo3bi9AM2SxLAql6Luw!2m2!1d-27.4647397!2d-58.831668!3f188.31!4f0!5f0.7820865974627469";

  return (
    <div className="location-section">
      <div className="container">
        {/* Título */}
        <div className="row text-center mb-5">
          <div className="col-12">
            <h2 className="location-title">Nuestra Ubicación</h2>
          </div>
        </div>

        {/* Contenido */}
        <div className="row">
          {/* Información de contacto */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            {/* Dirección */}
            <div className="location-info-item">
              <p className="location-info-title">
                <i className="bi bi-geo-alt-fill"></i> Dirección
              </p>
              <p className="location-info-text">{ADDRESS}</p>
              <p className="location-info-text">{CITY}</p>
            </div>

            {/* Horario de atención */}
            <div className="location-info-item">
              <p className="location-info-title">
                <i className="bi bi-clock-fill"></i> Horario de Atención
              </p>
              <p className="location-info-text">Horario comercial</p>
              <p className="location-info-text">De lunes a viernes</p>
              <p className="location-info-text">Por la mañana y por la tarde</p>
              <p className="location-info-text">
                Turnos al <strong>{PHONE}</strong>
              </p>
            </div>

            {/* Turnos */}
            <div className="location-info-item">
              <p className="location-info-title">
                <i className="bi bi-calendar-check-fill"></i> Turnos
              </p>
              <p className="location-info-text">
                Se atiende siempre con turno previo
              </p>
            </div>
          </div>

          {/* Mapa */}
          <div className="col-12 col-lg-6">
            <div className="location-map-container">
              <iframe
                title="Ubicación del consultorio Ferreyra & Panozzo"
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;