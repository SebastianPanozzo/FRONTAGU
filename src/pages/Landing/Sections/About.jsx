import aboutImg from "../../../../public/img/About3.png";
import './Sections.css';

function About() {
  return (
    <div className="about-section" id="about">
      <div className="container d-flex flex-column align-items-center justify-content-center px-3 py-4" style={{ minHeight: "65dvh" }}>
        
        {/* Encabezado */}
        <div className="row text-center py-3">
          <h2
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '3rem', fontWeight: "1000", marginBottom: "0.5rem" }}
            className="about-title"
          >
            Quiénes Somos
          </h2>
          <p className="fs-5 about-text mb-3">
            Ferreyra & Panozzo – Odontología General es un consultorio fundado por una pareja de profesionales
            que combinan vocación, conocimiento y un enfoque humano en la atención odontológica.
            Nuestra identidad se basa en la excelencia profesional, el trato cercano y una fuerte conciencia social
            que se refleja en políticas accesibles y flexibles para nuestros pacientes.
          </p>
        </div>

        {/* Imagen y detalles */}
        <div className="row mt-3 mb-3">
          <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center mb-3 mb-lg-0">
            <img
              className="img-fluid rounded rounded-4 shadow-sm"
              src={aboutImg}
              alt="consultorio odontológico Ferreyra & Panozzo"
            />
          </div>

          <div className="col-12 col-lg-6 d-flex flex-column gap-2 text-center text-lg-start">

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-eye-fill"></i> Visión
              </p>
              <p className="mb-2 about-text">
                Ser referentes en odontología general y ortodoncia por la calidad humana, técnica y estética de cada tratamiento.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-bullseye"></i> Misión
              </p>
              <p className="mb-2 about-text">
                Brindar atención odontológica integral, con un enfoque estético y funcional,
                cuidando tanto la salud bucal como el bienestar económico de cada paciente.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-shield-check"></i> Compromiso Profesional
              </p>
              <p className="mb-2 about-text">
                Atención basada en la ética, el conocimiento actualizado y la dedicación al bienestar bucal de cada paciente.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-emoji-smile-fill"></i> Empatía y Cercanía
              </p>
              <p className="mb-2 about-text">
                Un trato humano y amable que genera confianza y seguridad desde la primera consulta.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-wallet2"></i> Accesibilidad
              </p>
              <p className="mb-2 about-text">
                Opciones económicas pensadas para que la salud bucal esté al alcance de todos, sin comprometer la calidad.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-brush-fill"></i> Estética Responsable
              </p>
              <p className="mb-2 about-text">
                Soluciones que combinan salud, función y armonía, respetando las necesidades y posibilidades reales del paciente.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-info-circle-fill"></i> Transparencia
              </p>
              <p className="mb-2 about-text">
                Información clara sobre tratamientos, costos y alternativas, fomentando decisiones informadas y honestas.
              </p>
            </div>

            <div>
              <p className="fs-4 fw-bolder about-title mb-1">
                <i className="bi bi-people-fill"></i> Trabajo en Equipo
              </p>
              <p className="mb-0 about-text">
                La colaboración entre profesionales fortalece la atención integral y garantiza un enfoque completo y eficiente.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
