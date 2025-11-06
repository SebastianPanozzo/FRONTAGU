// src/pages/Workspace/WorkspaceSidebar.jsx
import { useState } from 'react';

const WorkspaceSidebar = ({ currentView, onNavigate, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Panel Administrativo',
            icon: 'bi-speedometer2'
        },
        {
            id: 'users',
            label: 'Gestión de Usuarios',
            icon: 'bi-people'
        },
        {
            id: 'services',
            label: 'Gestión de Servicios',
            icon: 'bi-gear'
        },
        {
            id: 'home',
            label: 'Volver al Inicio',
            icon: 'bi-house'
        }
    ];

    const handleItemClick = (itemId) => {
        onNavigate(itemId);
    };

    return (
        <>
            {/* Sidebar para desktop */}
            <div
                className={`d-none d-lg-block position-fixed h-100 ${isCollapsed ? 'collapsed-sidebar' : ''}`}
                style={{
                    width: isCollapsed ? '80px' : '280px',
                    backgroundColor: '#15325c',
                    borderRight: '2px solid #650015',
                    zIndex: 1000,
                    top: 0,
                    left: 0,
                    transition: 'width 0.3s ease',
                    overflowY: 'auto'
                }}
            >
                {/* Header del sidebar */}
                <div
                    className="d-flex align-items-center justify-content-between p-3"
                    style={{
                        borderBottom: '1px solid #650015',
                        minHeight: '70px'
                    }}
                >
                    {!isCollapsed && (
                        <div className="d-flex align-items-center">
                            <img
                                src="/img/Icono.jpg"
                                alt="Logo"
                                style={{ width: '35px', height: '35px' }}
                                className="me-2"
                            />
                            <span
                                style={{
                                    color: '#D0E4F7',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Workspace
                            </span>
                        </div>
                    )}
                    <button
                        className="btn btn-sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            color: '#D0E4F7',
                            border: 'none',
                            backgroundColor: 'transparent'
                        }}
                    >
                        <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                    </button>
                </div>

                {/* Menú de navegación */}
                <nav className="mt-3">
                    <ul className="list-unstyled">
                        {menuItems.map((item) => (
                            <li key={item.id} className="mb-1">
                                <button
                                    className={`btn w-100 text-start d-flex align-items-center ${
                                        currentView === item.id ? 'active-menu-item' : ''
                                    }`}
                                    style={{
                                        backgroundColor: currentView === item.id ? '#650015' : 'transparent',
                                        color: '#D0E4F7',
                                        border: 'none',
                                        padding: '12px 20px',
                                        borderRadius: '0',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onClick={() => handleItemClick(item.id)}
                                    onMouseEnter={(e) => {
                                        if (currentView !== item.id) {
                                            e.target.style.backgroundColor = 'rgba(101, 0, 21, 0.3)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentView !== item.id) {
                                            e.target.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <i
                                        className={`${item.icon} me-3`}
                                        style={{ fontSize: '1.1rem', minWidth: '20px' }}
                                    ></i>
                                    {!isCollapsed && (
                                        <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Botón de cerrar sesión */}
                <div
                    className="position-absolute bottom-0 w-100 p-3"
                    style={{ borderTop: '1px solid #650015' }}
                >
                    <button
                        className="btn w-100 d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: '#650015',
                            color: '#D0E4F7',
                            border: 'none',
                            padding: '10px'
                        }}
                        onClick={onLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        {!isCollapsed && 'Cerrar Sesión'}
                    </button>
                </div>
            </div>

            {/* Navbar para mobile */}
            <nav
                className="navbar navbar-expand-lg d-lg-none fixed-top"
                style={{
                    backgroundColor: '#15325c',
                    borderBottom: '2px solid #650015'
                }}
            >
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <img
                            src="/img/Icono.jpg"
                            alt="Logo"
                            style={{ width: '35px', height: '35px' }}
                            className="me-2"
                        />
                        <span
                            className="navbar-brand mb-0"
                            style={{ color: '#D0E4F7', fontWeight: 'bold' }}
                        >
                            Workspace
                        </span>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#workspaceNavbar"
                        style={{ border: 'none' }}
                    >
                        <i className="bi bi-list" style={{ color: '#D0E4F7', fontSize: '1.5rem' }}></i>
                    </button>

                    <div className="collapse navbar-collapse" id="workspaceNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
                            {menuItems.map((item) => (
                                <li key={item.id} className="nav-item mb-2">
                                    <button
                                        className={`btn w-100 text-start d-flex align-items-center ${
                                            currentView === item.id ? 'active-menu-item' : ''
                                        }`}
                                        style={{
                                            backgroundColor: currentView === item.id ? '#650015' : 'transparent',
                                            color: '#D0E4F7',
                                            border: 'none',
                                            padding: '10px 15px'
                                        }}
                                        onClick={() => handleItemClick(item.id)}
                                    >
                                        <i className={`${item.icon} me-3`}></i>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                            <li className="nav-item mt-3">
                                <button
                                    className="btn w-100 d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: '#650015',
                                        color: '#D0E4F7',
                                        border: 'none',
                                        padding: '10px'
                                    }}
                                    onClick={onLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .collapsed-sidebar .nav-item span {
                        display: none;
                    }
                    
                    @media (max-width: 991.98px) {
                        .navbar-collapse {
                            background-color: #15325c;
                            margin-top: 1rem;
                            padding: 1rem;
                            border-radius: 0.5rem;
                            border: 1px solid #650015;
                        }
                    }
                `
            }} />
        </>
    );
};

export default WorkspaceSidebar;