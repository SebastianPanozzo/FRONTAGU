/**
 * Componente principal de la aplicación
 * Ferreyra & Panozzo - Odontología General
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Landing from './pages/Landing/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import WorkspaceIndex from './pages/Workspace/WorkspaceIndex';

/**
 * Componente para rutas protegidas (requieren autenticación)
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Componente para rutas que requieren rol profesional
 */
const ProfessionalRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser?.role !== 'professional') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública - Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas del Workspace (solo profesionales) */}
        <Route 
          path="/workspace/*" 
          element={
            <ProfessionalRoute>
              <WorkspaceIndex />
            </ProfessionalRoute>
          } 
        />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;