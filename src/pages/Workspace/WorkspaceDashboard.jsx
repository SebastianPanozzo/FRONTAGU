// src/pages/Workspace/WorkspaceDashboard.jsx
import { useState, useEffect } from 'react';
import { userAPI } from '../../services/userAPI';
import { serviceAPI } from '../../services/api';

const WorkspaceDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalServices: 0,
        activeUsers: 0,
        professionalUsers: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Cargar usuarios y servicios en paralelo
            const [usersResponse, servicesResponse] = await Promise.all([
                userAPI.getAllUsers().catch(() => ({ data: [] })),
                serviceAPI.getAllServices().catch(() => ({ data: [] }))
            ]);

            const users = usersResponse.data || [];
            const services = servicesResponse.data || [];

            // Calcular estadísticas - actualizado para incluir sessionStarted como activo
            const activeUsers = users.filter(user => 
                user.state === 'activeSession' || user.state === 'sessionStarted'
            ).length;
            const professionalUsers = users.filter(user => user.role === 'professional').length;

            setStats({
                totalUsers: users.length,
                totalServices: services.length,
                activeUsers,
                professionalUsers
            });
        } catch (err) {
            setError(err.message);
            console.error('Error loading dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div
                        className="spinner-border mb-3"
                        style={{ color: '#650015' }}
                        role="status"
                    >
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p style={{ color: '#15325c' }}>Cargando panel administrativo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="h2 mb-2" style={{ color: '#15325c', fontWeight: 'bold' }}>
                            Panel Administrativo
                        </h1>
                        <p className="text-muted mb-0">
                            Bienvenido al panel de administración de Ferreyra y Panozzo
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="alert alert-danger mb-4" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            <strong>Error:</strong> {error}
                            <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={loadDashboardData}
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="row g-4 mb-5">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="card h-100 shadow-sm"
                                style={{
                                    backgroundColor: '#15325c',
                                    border: '2px solid #650015',
                                    borderRadius: '15px'
                                }}
                            >
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: '#650015'
                                        }}
                                    >
                                        <i className="bi bi-people" style={{ color: '#D0E4F7', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h3 className="card-title h2 mb-2" style={{ color: '#D0E4F7' }}>
                                        {stats.totalUsers}
                                    </h3>
                                    <p className="card-text" style={{ color: '#D0E4F7', fontSize: '0.9rem' }}>
                                        Total de Usuarios
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="card h-100 shadow-sm"
                                style={{
                                    backgroundColor: '#15325c',
                                    border: '2px solid #650015',
                                    borderRadius: '15px'
                                }}
                            >
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: '#650015'
                                        }}
                                    >
                                        <i className="bi bi-gear" style={{ color: '#D0E4F7', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h3 className="card-title h2 mb-2" style={{ color: '#D0E4F7' }}>
                                        {stats.totalServices}
                                    </h3>
                                    <p className="card-text" style={{ color: '#D0E4F7', fontSize: '0.9rem' }}>
                                        Servicios Activos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="card h-100 shadow-sm"
                                style={{
                                    backgroundColor: '#15325c',
                                    border: '2px solid #650015',
                                    borderRadius: '15px'
                                }}
                            >
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: '#650015'
                                        }}
                                    >
                                        <i className="bi bi-person-check" style={{ color: '#D0E4F7', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h3 className="card-title h2 mb-2" style={{ color: '#D0E4F7' }}>
                                        {stats.activeUsers}
                                    </h3>
                                    <p className="card-text" style={{ color: '#D0E4F7', fontSize: '0.9rem' }}>
                                        Usuarios Activos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="card h-100 shadow-sm"
                                style={{
                                    backgroundColor: '#15325c',
                                    border: '2px solid #650015',
                                    borderRadius: '15px'
                                }}
                            >
                                <div className="card-body text-center">
                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: '#650015'
                                        }}
                                    >
                                        <i className="bi bi-person-badge" style={{ color: '#D0E4F7', fontSize: '1.5rem' }}></i>
                                    </div>
                                    <h3 className="card-title h2 mb-2" style={{ color: '#D0E4F7' }}>
                                        {stats.professionalUsers}
                                    </h3>
                                    <p className="card-text" style={{ color: '#D0E4F7', fontSize: '0.9rem' }}>
                                        Profesionales
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="row g-4">
                        <div className="col-12">
                            <div
                                className="card shadow-sm"
                                style={{
                                    backgroundColor: 'white',
                                    border: '2px solid #15325c',
                                    borderRadius: '15px'
                                }}
                            >
                                <div className="card-header" style={{ backgroundColor: '#15325c', borderRadius: '13px 13px 0 0' }}>
                                    <h5 className="card-title mb-0" style={{ color: '#D0E4F7' }}>
                                        <i className="bi bi-lightning me-2"></i>
                                        Acciones Rápidas
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: '#650015',
                                                        color: '#D0E4F7',
                                                        border: 'none',
                                                        padding: '15px',
                                                        borderRadius: '10px'
                                                    }}
                                                >
                                                    <i className="bi bi-people me-2" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Gestionar Usuarios</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: '#650015',
                                                        color: '#D0E4F7',
                                                        border: 'none',
                                                        padding: '15px',
                                                        borderRadius: '10px'
                                                    }}
                                                >
                                                    <i className="bi bi-gear me-2" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Gestionar Servicios</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="d-grid">
                                                <button
                                                    className="btn btn-lg d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: '#15325c',
                                                        color: '#D0E4F7',
                                                        border: 'none',
                                                        padding: '15px',
                                                        borderRadius: '10px'
                                                    }}
                                                    onClick={loadDashboardData}
                                                >
                                                    <i className="bi bi-arrow-clockwise me-2" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Actualizar Datos</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceDashboard;