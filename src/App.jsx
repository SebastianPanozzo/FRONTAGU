/**
 * Componente principal de la aplicación
 * Ferreyra & Panozzo - Odontología General
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Index';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
        {/* TODO: Agregar rutas futuras */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/workspace/*" element={<Workspace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;