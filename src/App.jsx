// src/App.jsx
import { useState, useEffect } from 'react'
import Header from './pages/Landing/Header'
import Footer from './components/Footer'
import Home from './pages/Landing/Sections/home'
import About from './pages/Landing/Sections/About'
import Location from './pages/Landing/Sections/location'
import ServicesList from './pages/Landing/Sections/ServicesList'
import WorkspaceMain from './pages/Workspace/WorkspaceMain'

function App() {
  // Estados necesarios para la aplicación
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'workspace'
  const [ShopCart] = useState([]);

  // Verificar si hay un usuario logueado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWorkspaceClick = () => {
    if (currentUser && currentUser.role === 'professional') {
      setCurrentView('workspace');
    } else {
      alert('Acceso denegado. Solo los profesionales pueden acceder al workspace.');
    }
  };

  const handleNavigateToHome = () => {
    setCurrentView('landing');
  };

  // Renderizar vista según el estado actual
  const renderCurrentView = () => {
    switch (currentView) {
      case 'workspace':
        return (
          <WorkspaceMain 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onNavigateToHome={handleNavigateToHome}
          />
        );
      case 'landing':
      default:
        return (
          <>
            <Header 
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
              ShopCart={ShopCart}
              scrollToSection={scrollToSection}
              onWorkspaceClick={handleWorkspaceClick}
            />
            <div id="home">
              <Home />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="services">
              <ServicesList />
            </div>
            <div id="location">
              <Location />
            </div>
            <Footer />
          </>
        );
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {renderCurrentView()}
    </div>
  );
}

export default App;