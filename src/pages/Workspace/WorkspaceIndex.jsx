/**
 * WorkspaceIndex.jsx
 * Componente principal del área de trabajo privada
 * Maneja el enrutamiento interno del workspace
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/common/Navbar';
import WorkspaceHome from './WorkspaceHome';
import UsersManager from './UsersManager';
// import AppointmentsManager from './AppointmentsManager'; // TODO: Descomentar cuando esté listo
// import TreatmentsManager from './TreatmentsManager'; // TODO: Descomentar cuando esté listo

const WorkspaceIndex = () => {
  const { currentUser, isProfessional } = useAuth();

  // Verificar que el usuario sea profesional
  if (!isProfessional()) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: 'var(--glacier)' }}>
        <div className="text-center">
          <i className="bi bi-shield-lock" 
             style={{ fontSize: '4rem', color: 'var(--burgundy)' }}></i>
          <h2 className="mt-4" style={{ color: 'var(--burgundy)' }}>
            Acceso Denegado
          </h2>
          <p style={{ color: 'var(--dark-blue)' }}>
            Solo los profesionales pueden acceder al área de trabajo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar isWorkspace={true} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/workspace/home" replace />} />
          <Route path="/home" element={<WorkspaceHome />} />
          <Route path="/users" element={<UsersManager />} />
          {/* TODO: Descomentar cuando los managers estén listos */}
          {/* <Route path="/appointments" element={<AppointmentsManager />} /> */}
          {/* <Route path="/treatments" element={<TreatmentsManager />} /> */}
          <Route path="*" element={<Navigate to="/workspace/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default WorkspaceIndex;