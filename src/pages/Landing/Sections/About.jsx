/**
 * Sección About de la Landing Page
 * Ferreyra & Panozzo - Odontología General
 */

import aboutImg from '/img/About3.png';

const About = () => {
  // Configuración de características
  const features = [
    {
      icon: 'bi-eye-fill',
      title: 'Visión',
      description: 'Ser referentes en odontología general y ortodoncia por la calidad humana, técnica y estética de cada tratamiento.',
    },
    {
      icon: 'bi-bullseye',
      title: 'Misión',
      description: 'Brindar atención odontológica integral, con un enfoque estético y funcional, cuidando tanto la salud bucal como el bienestar económico de cada paciente.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Compromiso Profesional',
      description: 'Atención basada en la ética, el conocimiento actualizado y la dedicación al bienestar bucal de cada paciente.',
    },
    {
      icon: 'bi-emoji-smile-fill',
      title: 'Empatía y Cercanía',
      description: 'Un trato humano y amable que genera confianza y seguridad desde la primera consulta.',
    },
    {
      icon: 'bi-wallet2',
      title: 'Accesibilidad',
      description: 'Opciones económicas pensadas para que la salud bucal esté al alcance de todos, sin comprometer la calidad.',
    },
    {
      icon: 'bi-brush-fill',
      title: 'Estética Responsable',
      description: 'Soluciones que combinan salud, función y armonía, respetando las necesidades y posibilidades reales del paciente.',
    },
    {
      icon: 'bi-info-circle-fill',
      title: 'Transparencia',
      description: 'Información clara sobre tratamientos, costos y alternativas, fomentando decisiones informadas y honestas.',
    },
    {
      icon: 'bi-people-fill',
      title: 'Trabajo en Equipo',
      description: 'La colaboración entre profesionales fortalece la atención integral y garantiza un enfoque completo y eficiente.',
    },
  ];

  return (
    <div className="about-section">
      <div className="container">
        {/* Encabezado */}
        <div className="row text-center mb-4">
          <div className="col-12">
            <h2 className="about-title">Quiénes Somos</h2>
            <p className="about-text fs-5">
              Ferreyra & Panozzo – Odontología General es un consultorio fundado por una pareja de profesionales
              que combinan vocación, conocimiento y un enfoque humano en la atención odontológica.
              Nuestra identidad se basa en la excelencia profesional, el trato cercano y una fuerte conciencia social
              que se refleja en políticas accesibles y flexibles para nuestros pacientes.
            </p>
          </div>
        </div>

        {/* Imagen y características */}
        <div className="row mt-4">
          {/* Imagen */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
            <img
              src={aboutImg}
              alt="Consultorio odontológico Ferreyra & Panozzo"
              className="about-image"
            />
          </div>

          {/* Características */}
          <div className="col-12 col-lg-6">
            {features.map((feature, index) => (
              <div key={index} className="about-feature">
                <p className="about-feature-title">
                  <i className={`bi ${feature.icon} about-feature-icon`}></i>
                  {feature.title}
                </p>
                <p className="about-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;