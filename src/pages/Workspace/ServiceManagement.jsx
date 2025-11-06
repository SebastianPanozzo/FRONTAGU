// src/pages/Workspace/ServiceManagement.jsx - ENHANCED VERSION
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { serviceAPI } from '../../services/api';

// Global state management for services
let globalServices = [];
let serviceListeners = new Set();

const notifyServiceUpdate = () => {
    serviceListeners.forEach(listener => listener());
};

// ImgBB API Configuration
const IMGBB_API_KEY = '; // Replace with your ImgBB API key
const IMGBB_UPLOAD_URL = 'https:

// Function to upload image to ImgBB
const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', file);
    
    const response = await fetch(IMGBB_UPLOAD_URL, {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Error al subir la imagen');
    }
    
    const data = await response.json();
    
    if (!data.success) {
        throw new Error(data.error?.message || 'Error al procesar la imagen');
    }
    
    return data.data;
};

const ServiceManagement = () => {
    const [services, setServices] = useState(globalServices);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
    const [currentService, setCurrentService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Image upload states
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('file'); // 'file' | 'url'

    useEffect(() => {
        // Register listener for global updates
        const updateListener = () => {
            setServices([...globalServices]);
        };
        
        serviceListeners.add(updateListener);
        
        // Load services if not loaded globally
        if (globalServices.length === 0) {
            loadServices();
        } else {
            setServices([...globalServices]);
            setLoading(false);
        }

        return () => {
            serviceListeners.delete(updateListener);
        };
    }, []);

    // Effect for periodic reload (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            loadServices();
        }, 300000); // Reload every 5 minutes

        return () => clearInterval(interval);
    }, []);

    // Listen for updates from other tabs/views
    useEffect(() => {
        const handleServicesUpdated = () => {
            loadServices();
        };

        window.addEventListener('servicesUpdated', handleServicesUpdated);
        
        return () => {
            window.removeEventListener('servicesUpdated', handleServicesUpdated);
        };
    }, []);

    const loadServices = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await serviceAPI.getAllServices();
            const servicesData = response.data || [];
            
            // Update local and global state
            setServices(servicesData);
            globalServices = servicesData;
            
            // Notify all components
            notifyServiceUpdate();
        } catch (err) {
            setError(err.message);
            console.error('Error loading services:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetModalState = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            image: ''
        });
        setFormErrors({});
        setSelectedFile(null);
        setImagePreview('');
        setUploadMethod('file');
    };

    const handleCreateService = () => {
        setModalMode('create');
        setCurrentService(null);
        resetModalState();
        setShowModal(true);
    };

    const handleEditService = (service) => {
        setModalMode('edit');
        setCurrentService(service);
        setFormData({
            name: service.name || '',
            description: service.description || '',
            price: service.price || '',
            image: service.image || ''
        });
        setFormErrors({});
        setSelectedFile(null);
        setImagePreview(service.image || '');
        setUploadMethod('url');
        setShowModal(true);
    };

    const handleDeleteService = async (service) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar el servicio "${service.name}"?`)) {
            return;
        }

        try {
            await serviceAPI.deleteService(service.id);
            alert('Servicio eliminado exitosamente');
            
            // Force complete reload and global update
            await loadServices();
            
            // Dispatch custom event to notify other tabs/views
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('servicesUpdated'));
            }
        } catch (error) {
            alert('Error al eliminar servicio: ' + error.message);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre del servicio es requerido';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }
        
        if (!formData.price.trim()) {
            newErrors.price = 'El precio es requerido';
        }
        
        if (uploadMethod === 'url' && formData.image && !isValidUrl(formData.image)) {
            newErrors.image = 'La URL de la imagen no es válida';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                return;
            }

            // Validate size (maximum 32MB according to ImgBB)
            if (file.size > 32 * 1024 * 1024) {
                alert('El archivo es demasiado grande. El tamaño máximo es 32MB');
                return;
            }

            setSelectedFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Upload image to ImgBB
    const handleUploadImage = async () => {
        if (!selectedFile) {
            alert('Por favor selecciona una imagen primero');
            return;
        }

        setIsUploadingImage(true);
        try {
            const imageData = await uploadImageToImgBB(selectedFile);
            
            // Use direct image URL
            const imageUrl = imageData.url || imageData.display_url;
            
            setFormData(prev => ({
                ...prev,
                image: imageUrl
            }));
            
            setImagePreview(imageUrl);
            
            alert('Imagen subida exitosamente');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error al subir la imagen: ' + error.message);
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            if (modalMode === 'create') {
                await serviceAPI.createService(formData);
                alert('Servicio creado exitosamente');
            } else {
                await serviceAPI.updateService(currentService.id, formData);
                alert('Servicio actualizado exitosamente');
            }
            
            setShowModal(false);
            
            // Reload services and update globally
            await loadServices();
            
            // Notify other tabs/views
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('servicesUpdated'));
            }
            
        } catch (error) {
            alert(`Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} servicio: ` + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // If it's the image field and method is URL, update preview
        if (name === 'image' && uploadMethod === 'url') {
            setImagePreview(value);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const ServiceCard = ({ service }) => (
        <div className="card h-100 shadow-sm border-2" style={{ borderColor: '#15325c', borderRadius: '15px' }}>
            <div style={{ height: '250px', overflow: 'hidden', borderRadius: '13px 13px 0 0' }}>
                {service.image ? (
                    <img
                        src={service.image}
                        alt={service.name}
                        className="card-img-top w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className="d-flex align-items-center justify-content-center h-100 text-center"
                    style={{
                        backgroundColor: '#15325c',
                        color: '#D0E4F7',
                        display: service.image ? 'none' : 'flex'
                    }}
                >
                    <div>
                        <i className="bi bi-image mb-2" style={{ fontSize: '2rem' }}></i>
                        <p className="mb-0">Sin imagen</p>
                    </div>
                </div>
            </div>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{ color: '#15325c' }}>
                    {service.name}
                </h5>
                <p className="card-text flex-grow-1" style={{ color: '#666' }}>
                    {service.description}
                </p>
                <div className="mb-3">
                    <span
                        className="badge fs-6 px-3 py-2"
                        style={{ backgroundColor: '#650015', color: '#D0E4F7' }}
                    >
                        {service.price}
                    </span>
                </div>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm flex-fill border-0"
                        style={{ backgroundColor: '#15325c', color: '#D0E4F7' }}
                        onClick={() => handleEditService(service)}
                    >
                        <i className="bi bi-pencil me-1"></i>
                        Editar
                    </button>
                    <button
                        className="btn btn-sm flex-fill border-0"
                        style={{ backgroundColor: '#650015', color: '#D0E4F7' }}
                        onClick={() => handleDeleteService(service)}
                    >
                        <i className="bi bi-trash me-1"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="spinner-border mb-3" style={{ color: '#650015' }} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p style={{ color: '#15325c' }}>Cargando servicios...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h1 className="h2 mb-2 fw-bold" style={{ color: '#15325c' }}>
                                    Gestión de Servicios
                                </h1>
                                <p className="text-muted mb-0">
                                    Administrar servicios odontológicos ({services.length} servicios)
                                </p>
                                <button
                                    className="btn btn-sm btn-outline-primary mt-2"
                                    onClick={loadServices}
                                    title="Recargar servicios"
                                    style={{ borderColor: '#15325c', color: '#15325c' }}
                                >
                                    <i className="bi bi-arrow-clockwise me-1"></i>
                                    Actualizar
                                </button>
                            </div>
                            <button
                                className="btn btn-lg border-0 rounded-3"
                                style={{ backgroundColor: '#650015', color: '#D0E4F7' }}
                                onClick={handleCreateService}
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                Nuevo Servicio
                            </button>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="alert alert-danger mb-4" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                <strong>Error:</strong> {error}
                                <button
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={loadServices}
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        {/* Services Grid */}
                        {services.length === 0 ? (
                            <div className="card text-center border-2" style={{ borderColor: '#15325c', borderRadius: '15px' }}>
                                <div className="card-body py-5">
                                    <i className="bi bi-gear mb-3" style={{ fontSize: '3rem', color: '#15325c' }}></i>
                                    <h5 style={{ color: '#15325c' }}>No hay servicios registrados</h5>
                                    <p className="text-muted">
                                        Comienza creando tu primer servicio odontológico
                                    </p>
                                    <button
                                        className="btn border-0"
                                        style={{ backgroundColor: '#650015', color: '#D0E4F7' }}
                                        onClick={handleCreateService}
                                    >
                                        <i className="bi bi-plus me-2"></i>
                                        Crear Primer Servicio
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {services.map((service) => (
                                    <div key={service.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                                        <ServiceCard service={service} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Modal with Image Upload using React Portal */}
            {showModal && createPortal(
                <div 
                    className="modal fade show d-block"
                    style={{
                        backgroundColor: 'rgba(208, 228, 247, 0.8)',
                        backdropFilter: 'blur(5px)'
                    }}
                    tabIndex="-1"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleCloseModal();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleCloseModal();
                        }
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div 
                            className="modal-content border-0 shadow-lg"
                            style={{
                                backgroundColor: '#D0E4F7',
                                border: '2px solid #650015',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            {/* Modal Header */}
                            <div 
                                className="modal-header border-0"
                                style={{
                                    backgroundColor: '#650015',
                                    color: '#D0E4F7'
                                }}
                            >
                                <h5 className="modal-title fw-bold">
                                    {modalMode === 'create' ? 'Crear Nuevo Servicio' : 'Editar Servicio'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                    style={{ filter: 'invert(1)' }}
                                    disabled={isSubmitting}
                                ></button>
                            </div>
                            
                            {/* Modal Body */}
                            <div className="modal-body p-4">
                                <form onSubmit={handleSubmit} id="serviceForm">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" style={{ color: '#650015' }}>
                                            Nombre del Servicio <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            style={{ 
                                                backgroundColor: 'white',
                                                border: '2px solid #650015',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                color: '#650015'
                                            }}
                                        />
                                        {formErrors.name && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" style={{ color: '#650015' }}>
                                            Descripción <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            required
                                            disabled={isSubmitting}
                                            style={{ 
                                                backgroundColor: 'white',
                                                border: '2px solid #650015',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                resize: 'vertical',
                                                color: '#650015'
                                            }}
                                        ></textarea>
                                        {formErrors.description && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.description}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" style={{ color: '#650015' }}>
                                            Precio <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="Ej: $95.500"
                                            required
                                            disabled={isSubmitting}
                                            style={{ 
                                                backgroundColor: 'white',
                                                border: '2px solid #650015',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                color: '#650015'
                                            }}
                                        />
                                        {formErrors.price && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.price}
                                            </div>
                                        )}
                                    </div>

                                    {/* Enhanced Image Section */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold" style={{ color: '#650015' }}>
                                            Imagen del Servicio
                                        </label>
                                        
                                        {/* Upload method selector */}
                                        <div className="mb-3">
                                            <div className="btn-group w-100" role="group">
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="uploadMethod"
                                                    id="methodFile"
                                                    checked={uploadMethod === 'file'}
                                                    onChange={() => setUploadMethod('file')}
                                                />
                                                <label
                                                    className="btn btn-outline-primary"
                                                    htmlFor="methodFile"
                                                    style={{
                                                        borderColor: '#650015',
                                                        color: uploadMethod === 'file' ? '#D0E4F7' : '#650015',
                                                        backgroundColor: uploadMethod === 'file' ? '#650015' : 'transparent'
                                                    }}
                                                >
                                                    <i className="bi bi-upload me-2"></i>
                                                    Subir Archivo
                                                </label>
                                                
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="uploadMethod"
                                                    id="methodUrl"
                                                    checked={uploadMethod === 'url'}
                                                    onChange={() => setUploadMethod('url')}
                                                />
                                                <label
                                                    className="btn btn-outline-primary"
                                                    htmlFor="methodUrl"
                                                    style={{
                                                        borderColor: '#650015',
                                                        color: uploadMethod === 'url' ? '#D0E4F7' : '#650015',
                                                        backgroundColor: uploadMethod === 'url' ? '#650015' : 'transparent'
                                                    }}
                                                >
                                                    <i className="bi bi-link-45deg me-2"></i>
                                                    URL Directa
                                                </label>
                                            </div>
                                        </div>

                                        {/* File upload method */}
                                        {uploadMethod === 'file' && (
                                            <div>
                                                <div className="mb-3">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        onChange={handleFileSelect}
                                                        disabled={isSubmitting || isUploadingImage}
                                                        style={{
                                                            backgroundColor: 'white',
                                                            border: '2px solid #650015',
                                                            borderRadius: '8px',
                                                            color: '#650015'
                                                        }}
                                                    />
                                                    <small style={{ color: '#650015', opacity: 0.7 }}>
                                                        Formatos soportados: JPG, PNG, GIF (máximo 32MB)
                                                    </small>
                                                </div>

                                                {selectedFile && (
                                                    <div className="mb-3">
                                                        <button
                                                            type="button"
                                                            className="btn w-100"
                                                            onClick={handleUploadImage}
                                                            disabled={isUploadingImage || isSubmitting}
                                                            style={{
                                                                backgroundColor: '#15325c',
                                                                color: '#D0E4F7',
                                                                border: 'none'
                                                            }}
                                                        >
                                                            {isUploadingImage ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                    Subiendo imagen...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="bi bi-cloud-upload me-2"></i>
                                                                    Subir a ImgBB
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* URL method */}
                                        {uploadMethod === 'url' && (
                                            <input
                                                type="url"
                                                className={`form-control ${formErrors.image ? 'is-invalid' : ''}`}
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="https://ejemplo.com/imagen.jpg"
                                                disabled={isSubmitting}
                                                style={{
                                                    backgroundColor: 'white',
                                                    border: '2px solid #650015',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    color: '#650015'
                                                }}
                                            />
                                        )}

                                        {formErrors.image && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.image}
                                            </div>
                                        )}

                                        {/* Image preview */}
                                        {(imagePreview || formData.image) && (
                                            <div className="mt-3">
                                                <p className="mb-2" style={{ color: '#650015', fontWeight: 'bold' }}>
                                                    Vista previa:
                                                </p>
                                                <div
                                                    className="border rounded"
                                                    style={{
                                                        height: '1000px',
                                                        overflow: 'hidden',
                                                        border: '2px solid #650015 !important'
                                                    }}
                                                >
                                                    <img
                                                        src={imagePreview || formData.image}
                                                        alt="Vista previa"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.src = '';
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div
                                                        className="d-none align-items-center justify-content-center h-100"
                                                        style={{ backgroundColor: '#f8f9fa' }}
                                                    >
                                                        <div className="text-center text-muted">
                                                            <i className="bi bi-image-fill mb-2" style={{ fontSize: '2rem' }}></i>
                                                            <p className="mb-0">Error al cargar la imagen</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <small className="text-muted">
                                            Opcional: Ingresa la URL completa de la imagen del servicio o sube un archivo
                                        </small>
                                    </div>
                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div 
                                className="modal-footer border-0 d-flex justify-content-between"
                                style={{
                                    backgroundColor: '#D0E4F7',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleCloseModal}
                                    disabled={isSubmitting || isUploadingImage}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#650015',
                                        border: '2px solid #650015',
                                        padding: '10px 20px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    form="serviceForm"
                                    className="btn"
                                    disabled={isSubmitting || isUploadingImage}
                                    style={{ 
                                        backgroundColor: '#650015',
                                        color: '#D0E4F7',
                                        border: '2px solid #650015',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        minWidth: '120px'
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Guardando...
                                        </>
                                    ) : (
                                        modalMode === 'create' ? 'Crear Servicio' : 'Guardar Cambios'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default ServiceManagement;