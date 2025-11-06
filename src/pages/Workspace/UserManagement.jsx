// src/pages/Workspace/UserManagement.jsx
import { useState, useEffect, useRef } from 'react';
import { userAPI } from '../../services/userAPI';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Referencias para polling y visibilidad
    const pollIntervalRef = useRef(null);
    const isComponentMountedRef = useRef(true);
    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        loadUsers();
        startPolling();
        
        // Listener para cuando la página vuelve a ser visible
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                loadUsers();
            }
        };
        
        // Listener para cuando la ventana recupera el foco
        const handleWindowFocus = () => {
            loadUsers();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleWindowFocus);

        // Cleanup
        return () => {
            isComponentMountedRef.current = false;
            stopPolling();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleWindowFocus);
        };
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, filter, searchTerm]);

    // Función para iniciar polling
    const startPolling = () => {
        // Polling cada 30 segundos
        pollIntervalRef.current = setInterval(() => {
            if (isComponentMountedRef.current && !document.hidden) {
                loadUsers(true); // true indica que es una actualización silenciosa
            }
        }, 30000);
    };

    // Función para detener polling
    const stopPolling = () => {
        if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
        }
    };

    const loadUsers = async (silentUpdate = false) => {
        try {
            if (!silentUpdate) {
                setLoading(true);
                setError(null);
            }
            
            const response = await userAPI.getAllUsers();
            const newUsers = response.data || [];
            
            // Solo actualizar si hay cambios reales
            if (hasDataChanged(users, newUsers)) {
                setUsers(newUsers);
                lastUpdateRef.current = Date.now();
                
                // Si es una actualización silenciosa, mostrar notificación sutil
                if (silentUpdate) {
                    showUpdateNotification();
                }
            }
        } catch (err) {
            if (!silentUpdate) {
                setError(err.message);
                console.error('Error loading users:', err);
            }
        } finally {
            if (!silentUpdate) {
                setLoading(false);
            }
        }
    };

    // Función para detectar cambios en los datos
    const hasDataChanged = (oldData, newData) => {
        if (oldData.length !== newData.length) return true;
        
        for (let i = 0; i < oldData.length; i++) {
            const oldUser = oldData[i];
            const newUser = newData.find(u => u.id === oldUser.id);
            
            if (!newUser) return true;
            
            // Comparar campos importantes
            if (
                oldUser.name !== newUser.name ||
                oldUser.lastname !== newUser.lastname ||
                oldUser.mail !== newUser.mail ||
                oldUser.phone !== newUser.phone ||
                oldUser.role !== newUser.role ||
                oldUser.state !== newUser.state ||
                oldUser.birthdate !== newUser.birthdate
            ) {
                return true;
            }
        }
        
        return false;
    };

    // Función para mostrar notificación de actualización
    const showUpdateNotification = () => {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="alert alert-info alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; max-width: 300px;">
                <i class="bi bi-info-circle me-2"></i>
                <strong>Datos actualizados</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    };

    const filterUsers = () => {
        let filtered = users;

        // Filtrar por rol
        if (filter !== 'all') {
            filtered = filtered.filter(user => user.role === filter);
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.mail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(filtered);
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleSelectAll = () => {
        const userIds = filteredUsers
            .filter(user => user.role === 'user')
            .map(user => user.id);
        
        if (selectedUsers.length === userIds.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(userIds);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedUsers.length === 0) return;

        if (!window.confirm(`¿Estás seguro de que deseas eliminar ${selectedUsers.length} usuario(s)?`)) {
            return;
        }

        try {
            const deletePromises = selectedUsers.map(userId => 
                userAPI.deleteUser(userId)
            );
            
            await Promise.all(deletePromises);
            
            alert(`Se eliminaron ${selectedUsers.length} usuarios exitosamente`);
            setSelectedUsers([]);
            
            // Recargar inmediatamente después de eliminar
            await loadUsers();
            
            // Broadcast del cambio para otros clientes (si usas WebSockets)
            broadcastDataChange('users_deleted', selectedUsers);
            
        } catch (error) {
            alert('Error al eliminar usuarios: ' + error.message);
        }
    };

    // Función para broadcast de cambios (implementar según tu backend)
    const broadcastDataChange = (action, data) => {
        // Implementar según tu solución de tiempo real:
        
        // Opción 1: WebSockets
        // if (window.socket) {
        //     window.socket.emit('dataChange', { action, data, timestamp: Date.now() });
        // }
        
        // Opción 2: Server-Sent Events
        // fetch('/api/broadcast-change', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ action, data })
        // });
        
        // Opción 3: Storage Events (solo funciona entre pestañas del mismo origen)
        localStorage.setItem('userDataChange', JSON.stringify({
            action,
            data,
            timestamp: Date.now()
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    };

    const getRoleLabel = (role) => {
        return role === 'professional' ? 'Profesional' : 'Usuario';
    };

    const getStateLabel = (state) => {
        return (state === 'activeSession' || state === 'sessionStarted') ? 'Activo' : 'Inactivo';
    };

    const isUserActive = (state) => {
        return state === 'activeSession' || state === 'sessionStarted';
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
                    <p style={{ color: '#15325c' }}>Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="h2 mb-2" style={{ color: '#15325c', fontWeight: 'bold' }}>
                                Gestión de Usuarios
                            </h1>
                            <p className="text-muted mb-0">
                                Administrar usuarios del sistema ({filteredUsers.length} usuarios)
                                <small className="ms-2" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                                    Última actualización: {new Date(lastUpdateRef.current).toLocaleTimeString()}
                                </small>
                            </p>
                        </div>
                        <div className="d-flex gap-2">
                            {/* Botón de actualización manual */}
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => loadUsers()}
                                title="Actualizar datos manualmente"
                            >
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            {selectedUsers.length > 0 && (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteSelected}
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Eliminar Seleccionados ({selectedUsers.length})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="alert alert-danger mb-4" role="alert">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            <strong>Error:</strong> {error}
                            <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={loadUsers}
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {/* Filtros y búsqueda */}
                    <div
                        className="card mb-4"
                        style={{
                            backgroundColor: 'white',
                            border: '2px solid #15325c',
                            borderRadius: '15px'
                        }}
                    >
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <label className="form-label" style={{ color: '#15325c', fontWeight: '500' }}>
                                        Filtrar por rol:
                                    </label>
                                    <select
                                        className="form-select"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        style={{
                                            borderColor: '#15325c',
                                            borderWidth: '2px'
                                        }}
                                    >
                                        <option value="all">Todos los usuarios</option>
                                        <option value="user">Usuarios</option>
                                        <option value="professional">Profesionales</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <label className="form-label" style={{ color: '#15325c', fontWeight: '500' }}>
                                        Buscar usuario:
                                    </label>
                                    <div className="input-group">
                                        <span
                                            className="input-group-text"
                                            style={{
                                                backgroundColor: '#15325c',
                                                borderColor: '#15325c',
                                                color: '#D0E4F7'
                                            }}
                                        >
                                            <i className="bi bi-search"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre, apellido o email..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{
                                                borderColor: '#15325c',
                                                borderWidth: '2px'
                                            }}
                                        />
                                        {searchTerm && (
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setSearchTerm('')}
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de usuarios */}
                    {filteredUsers.length === 0 ? (
                        <div
                            className="card text-center"
                            style={{
                                backgroundColor: 'white',
                                border: '2px solid #15325c',
                                borderRadius: '15px'
                            }}
                        >
                            <div className="card-body py-5">
                                <i
                                    className="bi bi-people mb-3"
                                    style={{ fontSize: '3rem', color: '#15325c' }}
                                ></i>
                                <h5 style={{ color: '#15325c' }}>No se encontraron usuarios</h5>
                                <p className="text-muted">
                                    {searchTerm || filter !== 'all' 
                                        ? 'Intenta ajustar los filtros de búsqueda'
                                        : 'No hay usuarios registrados en el sistema'
                                    }
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="card"
                            style={{
                                backgroundColor: 'white',
                                border: '2px solid #15325c',
                                borderRadius: '15px'
                            }}
                        >
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                style={{ backgroundColor: '#15325c', borderRadius: '13px 13px 0 0' }}
                            >
                                <h5 className="card-title mb-0" style={{ color: '#D0E4F7' }}>
                                    Lista de Usuarios
                                </h5>
                                {filteredUsers.some(user => user.role === 'user') && (
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="selectAll"
                                            checked={selectedUsers.length === filteredUsers.filter(u => u.role === 'user').length && selectedUsers.length > 0}
                                            onChange={handleSelectAll}
                                        />
                                        <label className="form-check-label" htmlFor="selectAll" style={{ color: '#D0E4F7' }}>
                                            Seleccionar todos
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Tabla responsive */}
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                                        <tr>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Selección</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Nombre</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Email</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Teléfono</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Fecha Nacimiento</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Rol</th>
                                            <th style={{ color: '#15325c', fontWeight: '600' }}>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    {user.role === 'user' ? (
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={selectedUsers.includes(user.id)}
                                                                onChange={() => handleSelectUser(user.id)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted">
                                                            <i className="bi bi-lock"></i>
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                backgroundColor: user.role === 'professional' ? '#650015' : '#15325c',
                                                                color: '#D0E4F7',
                                                                fontSize: '0.9rem',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            {user.name.charAt(0)}{user.lastname.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div style={{ color: '#15325c', fontWeight: '500' }}>
                                                                {user.name} {user.lastname}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ color: '#15325c' }}>{user.mail}</td>
                                                <td style={{ color: '#15325c' }}>{user.phone || 'No especificado'}</td>
                                                <td style={{ color: '#15325c' }}>{formatDate(user.birthdate)}</td>
                                                <td>
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            backgroundColor: user.role === 'professional' ? '#650015' : '#15325c',
                                                            color: '#D0E4F7',
                                                            padding: '0.5rem 0.75rem',
                                                            borderRadius: '20px'
                                                        }}
                                                    >
                                                        {getRoleLabel(user.role)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            backgroundColor: isUserActive(user.state) ? '#28a745' : '#6c757d',
                                                            color: 'white',
                                                            padding: '0.5rem 0.75rem',
                                                            borderRadius: '20px'
                                                        }}
                                                    >
                                                        {getStateLabel(user.state)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;