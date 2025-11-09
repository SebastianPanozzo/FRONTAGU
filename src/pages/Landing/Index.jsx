/**
 * Landing Page Container
 * Ferreyra & Panozzo - Odontología General
 */

import { useRef } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Home from './Sections/home';
import About from './Sections/About';
import TreatmentList from './Sections/TreatmentList';
import Location from './Sections/Location';

const Landing = () => {
  // Referencias para scroll suave
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const treatmentsRef = useRef(null);
  const locationRef = useRef(null);

  /**
   * Función para scroll a secciones específicas
   * @param {string} sectionId - ID de la sección
   */
  const scrollToSection = (sectionId) => {
    const sectionRefs = {
      home: homeRef,
      about: aboutRef,
      treatments: treatmentsRef,
      location: locationRef,
    };

    const targetRef = sectionRefs[sectionId];
    
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="app-container">
      {/* Header con navegación */}
      <Header scrollToSection={scrollToSection} />

      {/* Contenido principal */}
      <main className="main-content">
        <section ref={homeRef} id="home">
          <Home />
        </section>

        <section ref={aboutRef} id="about">
          <About />
        </section>

        <section ref={treatmentsRef} id="treatments">
          <TreatmentList />
        </section>

        <section ref={locationRef} id="location">
          <Location />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;