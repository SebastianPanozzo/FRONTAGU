/**
 * UsersManager.jsx
 * Página principal de gestión de usuarios del workspace
 * Solo profesionales pueden acceder
 * 
 * CORRECCIONES:
 * - Se eliminó UserDetailModal (función de detalles removida)
 * - Se corrigió el filtro de búsqueda para usar 'email' en lugar de 'mail'
 */

import { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUser';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import UserFilters from '../../components/users/UserFilters';
import UserTable from '../../components/users/UserTable';
import ConfirmDeleteModal from '../../components/users/ConfirmDeleteModal';
import UserStats from '../../components/users/UserStats';

const UsersManager = () => {
  const {
    users,
    loading,
    error,
    loadAllUsers,
    deleteUser,
    clearError,
  } = useUsers();

  // Estados locales
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // all, user, professional
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Cargar usuarios al montar componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Filtrar usuarios cuando cambian los filtros
  useEffect(() => {
    filterUsers();
  }, [users, filter, searchTerm]);

  const loadUsers = async () => {
    try {
      await loadAllUsers();
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filtrar por rol
    if (filter !== 'all') {
      filtered = filtered.filter(user => user.role === filter);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        (user.phone && user.phone.includes(searchTerm))
      );
    }

    setFilteredUsers(filtered);
  };

  const handleRefresh = () => {
    setSelectedUsers([]);
    loadUsers();
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleSelectAll = () => {
    const selectableUsers = filteredUsers
      .filter(user => user.role === 'user')
      .map(user => user.id);

    if (selectedUsers.length === selectableUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(selectableUsers);
    }
  };

  const handleDeleteClick = (user) => {
    if (user.role !== 'user') {
      alert('No se pueden eliminar usuarios con rol profesional');
      return;
    }
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    
    const usersToDelete = filteredUsers.filter(user => 
      selectedUsers.includes(user.id)
    );
    
    setUserToDelete({ multiple: true, users: usersToDelete });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (userToDelete.multiple) {
        // Eliminar múltiples usuarios
        const deletePromises = userToDelete.users.map(user => 
          deleteUser(user.id)
        );
        await Promise.all(deletePromises);
        setSelectedUsers([]);
      } else {
        // Eliminar un solo usuario
        await deleteUser(userToDelete.id);
      }
      
      setShowDeleteModal(false);
      setUserToDelete(null);
      await loadUsers();
    } catch (err) {
      console.error('Error deleting user(s):', err);
    }
  };

  const getStats = () => {
    const total = users.length;
    const professionals = users.filter(u => u.role === 'professional').length;
    const regularUsers = users.filter(u => u.role === 'user').length;
    const activeUsers = users.filter(u => 
      u.state === 'sessionStarted' || u.state === 'activeSession'
    ).length;

    return { total, professionals, regularUsers, activeUsers };
  };

  if (loading && users.length === 0) {
    return (
      <div className="container-fluid py-5">
        <Loading message="Cargando usuarios..." size="lg" />
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="h2 mb-2 fw-bold" style={{ color: 'var(--dark-blue)' }}>
                <i className="bi bi-people-fill me-2"></i>
                Gestión de Usuarios
              </h1>
              <p className="mb-0" style={{ color: 'var(--burgundy)', opacity: 0.8 }}>
                Administrar usuarios del sistema ({filteredUsers.length} usuarios)
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn-custom btn-secondary-custom"
                onClick={handleRefresh}
                disabled={loading}
                title="Actualizar lista"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Actualizar
              </button>
              {selectedUsers.length > 0 && (
                <button
                  className="btn-custom btn-primary-custom"
                  onClick={handleDeleteSelected}
                >
                  <i className="bi bi-trash me-2"></i>
                  Eliminar ({selectedUsers.length})
                </button>
              )}
            </div>
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
              onDismiss={clearError}
            />
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <UserStats stats={stats} />

      {/* Filtros */}
      <UserFilters
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Tabla de usuarios */}
      <UserTable
        users={filteredUsers}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onDeleteUser={handleDeleteClick}
        loading={loading}
      />

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          user={userToDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersManager;