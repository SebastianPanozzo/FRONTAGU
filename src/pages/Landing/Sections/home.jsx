/**
 * Sección Home de la Landing Page
 * Ferreyra & Panozzo - Odontología General
 */

import logoImg from '/img/Logo.png';
import fpImg from '/img/FP.png';

const Home = () => {
  return (
    <div className="home-section">
      <div className="home-logo-container">
        <img
          src={logoImg}
          alt="Logo Ferreyra & Panozzo"
          className="home-logo-image"
        />
        <img
          src={fpImg}
          alt="Ferreyra & Panozzo"
          className="home-logo-image"
        />
      </div>
    </div>
  );
};

export default Home;