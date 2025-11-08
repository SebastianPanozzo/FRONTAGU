/**
 * WorkspaceHome.jsx
 * Panel principal del área de trabajo para profesionales
 * Muestra estadísticas y acciones rápidas
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUser';
import { useAppointments } from '../../hooks/useAppointment';
import { useTreatments } from '../../hooks/useTreatment';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import StatCard from './components/StatCard';
import QuickActionCard from './components/QuickActionCard';

const WorkspaceHome = () => {
  const { currentUser } = useAuth();
  const { users, loadAllUsers, loading: usersLoading } = useUsers();
  const { appointments, loadAllAppointments, loading: appointmentsLoading } = useAppointments();
  const { treatments, loadAllTreatments, loading: treatmentsLoading } = useTreatments();

  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalTreatments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [users, appointments, treatments]);

  const loadDashboardData = async () => {
    try {
      setError(null);
      await Promise.all([
        loadAllUsers().catch(() => []),
        loadAllAppointments().catch(() => []),
        loadAllTreatments().catch(() => [])
      ]);
    } catch (err) {
      setError('Error al cargar los datos del panel');
      console.error('Error loading dashboard:', err);
    }
  };

  const calculateStats = () => {
    setStats({
      totalUsers: users.length,
      totalAppointments: appointments.length,
      totalTreatments: treatments.length,
      pendingAppointments: appointments.filter(a => a.state === 'pending').length,
      confirmedAppointments: appointments.filter(a => a.state === 'confirmed').length,
      completedAppointments: appointments.filter(a => a.state === 'completed').length,
    });
  };

  const isLoading = usersLoading || appointmentsLoading || treatmentsLoading;

  if (isLoading) {
    return (
      <div className="container-fluid py-5">
        <Loading message="Cargando panel administrativo..." size="lg" />
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-2 fw-bold" style={{ color: 'var(--dark-blue)' }}>
                Panel Administrativo
              </h1>
              <p className="mb-0" style={{ color: 'var(--burgundy)', opacity: 0.8 }}>
                Bienvenido/a, {currentUser?.name || 'Profesional'}
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="btn-custom btn-secondary-custom"
              title="Actualizar datos"
              style={{ width: 'auto', whiteSpace: 'nowrap' }}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="row mb-4">
          <div className="col-12">
            <ErrorMessage
              message={error}
              type="error"
              onDismiss={() => setError(null)}
            />
          </div>
        </div>
      )}

      {/* Estadísticas - Cards */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon="bi-people"
            value={stats.totalUsers}
            label="Total de Usuarios"
            subtitle="Registrados en el sistema"
            color="burgundy"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon="bi-calendar-check"
            value={stats.totalAppointments}
            label="Total de Turnos"
            subtitle={`${stats.pendingAppointments} pendientes`}
            color="dark-blue"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon="bi-check-circle"
            value={stats.confirmedAppointments}
            label="Turnos Confirmados"
            subtitle="Listos para atención"
            color="burgundy"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon="bi-heart-pulse"
            value={stats.totalTreatments}
            label="Tratamientos"
            subtitle="Disponibles"
            color="dark-blue"
          />
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-4 fw-bold" style={{ color: 'var(--dark-blue)' }}>
            <i className="bi bi-lightning-fill me-2"></i>
            Acciones Rápidas
          </h4>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6 col-lg-4">
          <QuickActionCard
            to="/workspace/appointments"
            icon="bi-calendar-plus"
            title="Gestionar Turnos"
            description="Ver, crear y administrar turnos de pacientes"
            color="burgundy"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <QuickActionCard
            to="/workspace/treatments"
            icon="bi-heart-pulse"
            title="Gestionar Tratamientos"
            description="Administrar tratamientos y servicios"
            color="dark-blue"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <QuickActionCard
            to="/workspace/users"
            icon="bi-people"
            title="Gestionar Usuarios"
            description="Ver y administrar usuarios del sistema"
            color="burgundy"
          />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card-custom">
            <div className="card-header-custom">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Información del Sistema
              </h5>
            </div>
            <div className="card-body-custom">
              <p className="mb-2 fw-semibold">
                Sistema de Gestión Odontológica v1.0
              </p>
              <p className="mb-0" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Sistema integral para la administración de consultorios odontológicos,
                que permite gestionar turnos, tratamientos y pacientes de forma eficiente.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card-custom">
            <div className="card-header-custom">
              <h5 className="mb-0">
                <i className="bi bi-list-check me-2"></i>
                Funcionalidades
              </h5>
            </div>
            <div className="card-body-custom">
              <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
                <li className="mb-2">✓ Gestión completa de turnos con calendario</li>
                <li className="mb-2">✓ Administración de tratamientos y precios</li>
                <li className="mb-2">✓ Control de pacientes y usuarios</li>
                <li className="mb-2">✓ Estadísticas y reportes en tiempo real</li>
                <li className="mb-0">✓ Sistema de notificaciones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHome;