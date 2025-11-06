// src/pages/Landing/Header.jsx
import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { userAPI } from '../../services/userAPI';

const Header = ({ currentUser, setCurrentUser, scrollToSection, onWorkspaceClick }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Verificar si hay un usuario logueado al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('currentUser');
        
        if (token && userData && !currentUser) {
            try {
                const user = JSON.parse(userData);
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
            }
        }
    }, [currentUser, setCurrentUser]);

    const handleNavClick = (sectionId) => {
        if (scrollToSection) {
            scrollToSection(sectionId);
        }
    };

    const handleLogin = () => {
        setShowLoginModal(true);
    };

    const handleRegister = () => {
        setShowRegisterModal(true);
    };

    const handleLogout = async () => {
        try {
            // Intentar hacer logout en el servidor
            if (currentUser?.id) {
                await userAPI.logout(currentUser.id);
            }
        } catch (error) {
            console.error('Error during server logout:', error);
            // Continuamos con el logout local incluso si falla el servidor
        } finally {
            // Limpiar datos locales independientemente del resultado de la API
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
            alert('Has cerrado sesión correctamente');
        }
    };

    const handleWorkspace = () => {
        // Verificar que el usuario sea profesional antes de navegar
        if (currentUser && currentUser.role === 'professional') {
            if (onWorkspaceClick) {
                onWorkspaceClick();
            }
        } else {
            alert('Acceso denegado. Solo los profesionales pueden acceder al workspace.');
        }
    };

    const handleLoginSuccess = (userData) => {
        setCurrentUser(userData);
        setShowLoginModal(false);
    };

    const handleRegisterSuccess = (userData) => {
        // Solo actualizar currentUser si tenemos datos de usuario válidos
        if (userData && userData.id) {
            setCurrentUser(userData);
        }
        setShowRegisterModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    return (
        <>
            <div
                className="fixed-top"
                style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)', // para Safari
                    backgroundColor: '#15325c', // Dark blue
                    borderBottom: '#650015',
                    color: '#D0E4F7' // Color glaciar para todo el header
                }}
            >
                <div className="container" style={{ color: '#D0E4F7' }}>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <button
                                className="navbar-brand fw-bolder fs-5 btn border-0"
                                style={{ color: '#D0E4F7', background: 'none' }}
                                onClick={() => handleNavClick('home')}
                            >
                                <img
                                    style={{ width: '45px' }}
                                    className="me-2"
                                    src="/img/Icono.jpg"
                                    alt="Logo"
                                />
                                Ferreyra y Panozzo
                            </button>
                            <button
                                className="navbar-toggler border-0 p-3"
                                style={{ backgroundColor: '#650015' }}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="bi bi-list-task" style={{ color: '#D0E4F7' }}></i>
                            </button>
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <button
                                            className="nav-link active btn border-0"
                                            style={{ color: '#D0E4F7', background: 'none' }}
                                            onClick={() => handleNavClick('about')}
                                        >
                                            Sobre Nosotros
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn border-0"
                                            style={{ color: '#D0E4F7', background: 'none' }}
                                            onClick={() => handleNavClick('services')}
                                        >
                                            Tipos de Servicios
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn border-0"
                                            style={{ color: '#D0E4F7', background: 'none' }}
                                            onClick={() => handleNavClick('location')}
                                        >
                                            Ubicación
                                        </button>
                                    </li>
                                </ul>
                                
                                {/* Botones de usuario */}
                                <div className="d-flex gap-2">
                                    {currentUser ? (
                                        <>
                                            {/* Botón Workspace solo para profesionales */}
                                            {currentUser.role === 'professional' && (
                                                <button
                                                    className="btn"
                                                    style={{
                                                        backgroundColor: '#650015',
                                                        color: '#D0E4F7',
                                                        border: '1px solid #650015'
                                                    }}
                                                    type="button"
                                                    onClick={handleWorkspace}
                                                >
                                                    Workspace
                                                </button>
                                            )}

                                            {/* Cerrar sesión */}
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#650015',
                                                    color: '#D0E4F7',
                                                    border: '1px solid #650015'
                                                }}
                                                type="button"
                                                onClick={handleLogout}
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {/* Botones para usuarios no logueados */}
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#650015',
                                                    color: '#D0E4F7',
                                                    border: '1px solid #650015'
                                                }}
                                                type="button"
                                                onClick={handleLogin}
                                            >
                                                Ingresar
                                            </button>
                                            <button
                                                className="btn"
                                                style={{
                                                    backgroundColor: '#650015',
                                                    color: '#D0E4F7',
                                                    border: '1px solid #650015'
                                                }}
                                                type="button"
                                                onClick={handleRegister}
                                            >
                                                Registrarse
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Modales */}
            {showLoginModal && (
                <Login 
                    onClose={closeLoginModal}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {showRegisterModal && (
                <Register 
                    onClose={closeRegisterModal}
                    onRegisterSuccess={handleRegisterSuccess}
                />
            )}
        </>
    );
};

export default Header;