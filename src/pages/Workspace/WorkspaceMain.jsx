// src/pages/Workspace/WorkspaceMain.jsx
import { useState, useEffect } from 'react';
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceDashboard from './WorkspaceDashboard';
import UserManagement from './UserManagement';
import ServiceManagement from './ServiceManagement';

const WorkspaceMain = ({ currentUser, setCurrentUser, onNavigateToHome }) => {
    const [currentView, setCurrentView] = useState('dashboard');

    // Verificar que el usuario sea profesional
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'professional') {
            alert('Acceso denegado. Solo los profesionales pueden acceder al workspace.');
            onNavigateToHome();
        }
    }, [currentUser, onNavigateToHome]);

    const handleNavigate = (viewId) => {
        if (viewId === 'home') {
            onNavigateToHome();
        } else {
            setCurrentView(viewId);
        }
    };

    const handleLogout = async () => {
        try {
            // Importar userAPI dinámicamente para evitar problemas de dependencias circulares
            const { userAPI } = await import('../../services/userAPI');
            
            if (currentUser?.id) {
                await userAPI.logout(currentUser.id);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Limpiar datos locales
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
            onNavigateToHome();
        }
    };

    // No renderizar nada si el usuario no es profesional
    if (!currentUser || currentUser.role !== 'professional') {
        return null;
    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'dashboard':
                return <WorkspaceDashboard />;
            case 'users':
                return <UserManagement />;
            case 'services':
                return <ServiceManagement />;
            default:
                return <WorkspaceDashboard />;
        }
    };

    return (
        <div style={{ backgroundColor: '#D0E4F7', minHeight: '100vh' }}>
            {/* Sidebar */}
            <WorkspaceSidebar
                currentView={currentView}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <div
                style={{
                    marginLeft: '280px', // Espacio para sidebar en desktop
                    paddingTop: '0'
                }}
                className="d-none d-lg-block"
            >
                {renderCurrentView()}
            </div>

            {/* Mobile Content */}
            <div
                style={{
                    paddingTop: '80px' // Espacio para navbar mobile
                }}
                className="d-lg-none"
            >
                {renderCurrentView()}
            </div>

            {/* Navbar Toggler Script para Bootstrap (solo en mobile) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 991.98px) {
                        .workspace-main {
                            margin-left: 0 !important;
                        }
                    }
                    
                    /* Asegurar que el sidebar no interfiera con el contenido en mobile */
                    @media (min-width: 992px) {
                        .workspace-main {
                            margin-left: 280px;
                        }
                    }
                `
            }} />
        </div>
    );
};

export default WorkspaceMain;