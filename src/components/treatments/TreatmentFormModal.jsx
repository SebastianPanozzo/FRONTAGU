/**
 * TreatmentFormModal.jsx
 * Modal para crear/editar tratamientos con subida de imágenes
 * Ferreyra & Panozzo - Odontología General
 */

import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { VALIDATION } from '../../utils/constants';

const TreatmentFormModal = ({
  isOpen,
  mode,
  treatment,
  onClose,
  onSubmit,
  onUploadImage
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' | 'url'
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && treatment) {
      setFormData({
        name: treatment.name || '',
        description: treatment.description || '',
        price: treatment.price || '',
        duration: treatment.duration || '',
        image: treatment.image || ''
      });
      setImagePreview(treatment.image || '');
      setUploadMethod('url');
    } else {
      resetForm();
    }
  }, [mode, treatment]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      image: ''
    });
    setErrors({});
    setSelectedFile(null);
    setImagePreview('');
    setUploadMethod('file');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update preview for URL method
    if (name === 'image' && uploadMethod === 'url') {
      setImagePreview(value);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validate size (max 32MB)
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
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona una imagen primero');
      return;
    }

    setIsUploadingImage(true);
    try {
      const imageUrl = await onUploadImage(selectedFile);
      
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del tratamiento es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `La descripción no puede exceder ${VALIDATION.MAX_DESCRIPTION_LENGTH} caracteres`;
    }

    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum < VALIDATION.MIN_PRICE) {
        newErrors.price = 'El precio debe ser un número válido mayor a 0';
      } else if (priceNum > VALIDATION.MAX_PRICE) {
        newErrors.price = `El precio no puede exceder ${VALIDATION.MAX_PRICE}`;
      }
    }

    if (uploadMethod === 'url' && formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'La URL de la imagen no es válida';
    }

    setErrors(newErrors);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalFooter = (
    <>
      <Button
        variant="outline"
        onClick={onClose}
        disabled={isSubmitting || isUploadingImage}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={isSubmitting || isUploadingImage}
        form="treatmentForm"
      >
        {mode === 'create' ? 'Crear Tratamiento' : 'Guardar Cambios'}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Crear Nuevo Tratamiento' : 'Editar Tratamiento'}
      titleStyle={{ color: 'var(--glacier)' }}
      footer={modalFooter}
      size="lg"
      closeOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} id="treatmentForm">
        {/* Name */}
        <div className="form-group-custom">
          <label htmlFor="name" className="form-label-custom">
            Nombre del Tratamiento <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input-custom ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Limpieza Dental"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="form-error-custom">{errors.name}</span>
          )}
        </div>

        {/* Description */}
        <div className="form-group-custom">
          <label htmlFor="description" className="form-label-custom">
            Descripción <span className="text-danger">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            className={`form-input-custom form-textarea-custom ${errors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe el tratamiento..."
            rows="4"
            disabled={isSubmitting}
          />
          {errors.description && (
            <span className="form-error-custom">{errors.description}</span>
          )}
          <small className="form-text text-muted d-block mt-1">
            {formData.description.length}/{VALIDATION.MAX_DESCRIPTION_LENGTH} caracteres
          </small>
        </div>

        {/* Price */}
        <div className="form-group-custom">
          <label htmlFor="price" className="form-label-custom">
            Precio <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`form-input-custom ${errors.price ? 'is-invalid' : ''}`}
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={isSubmitting}
          />
          {errors.price && (
            <span className="form-error-custom">{errors.price}</span>
          )}
        </div>

        {/* Duration (optional) */}
        <div className="form-group-custom">
          <label htmlFor="duration" className="form-label-custom">
            Duración (minutos)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="form-input-custom"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="60"
            min="1"
            disabled={isSubmitting}
          />
          <small className="form-text text-muted d-block mt-1">
            Opcional: Duración estimada del tratamiento
          </small>
        </div>

        {/* Image Upload */}
        <div className="form-group-custom">
          <label className="form-label-custom">
            Imagen del Tratamiento
          </label>

          {/* Upload Method Selector */}
          <div className="btn-group w-100 mb-3" role="group">
            <input
              type="radio"
              className="btn-check"
              name="uploadMethod"
              id="methodFile"
              checked={uploadMethod === 'file'}
              onChange={() => setUploadMethod('file')}
              disabled={isSubmitting}
            />
            <label
              className="btn"
              htmlFor="methodFile"
              style={{
                borderColor: 'var(--burgundy)',
                color: uploadMethod === 'file' ? 'var(--glacier)' : 'var(--burgundy)',
                backgroundColor: uploadMethod === 'file' ? 'var(--burgundy)' : 'transparent'
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
              disabled={isSubmitting}
            />
            <label
              className="btn"
              htmlFor="methodUrl"
              style={{
                borderColor: 'var(--burgundy)',
                color: uploadMethod === 'url' ? 'var(--glacier)' : 'var(--burgundy)',
                backgroundColor: uploadMethod === 'url' ? 'var(--burgundy)' : 'transparent'
              }}
            >
              <i className="bi bi-link-45deg me-2"></i>
              URL Directa
            </label>
          </div>

          {/* File Upload */}
          {uploadMethod === 'file' && (
            <>
              <input
                type="file"
                className="form-input-custom mb-3"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isSubmitting || isUploadingImage}
              />
              <small className="form-text text-muted d-block mb-2">
                Formatos soportados: JPG, PNG, GIF (máximo 32MB)
              </small>

              {selectedFile && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleUploadImage}
                  loading={isUploadingImage}
                  disabled={isUploadingImage || isSubmitting}
                  fullWidth
                  icon="bi-cloud-upload"
                >
                  {isUploadingImage ? 'Subiendo imagen...' : 'Subir a ImgBB'}
                </Button>
              )}
            </>
          )}

          {/* URL Input */}
          {uploadMethod === 'url' && (
            <input
              type="url"
              name="image"
              className={`form-input-custom ${errors.image ? 'is-invalid' : ''}`}
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              disabled={isSubmitting}
            />
          )}

          {errors.image && (
            <span className="form-error-custom">{errors.image}</span>
          )}

          {/* Image Preview */}
          {(imagePreview || formData.image) && (
            <div className="mt-3">
              <p className="mb-2 fw-semibold" style={{ color: 'var(--burgundy)' }}>
                Vista previa:
              </p>
              <div
                className="border rounded"
                style={{
                  height: '300px', // Cambiado de 200px a 300px para hacerlo más amplio verticalmente
                  overflow: 'hidden',
                  border: '2px solid var(--burgundy) !important'
                }}
              >
                <img
                  src={imagePreview || formData.image}
                  alt="Vista previa"
                  className="w-100 h-100"
                  style={{ objectFit: 'contain' }} // Cambiado de 'cover' a 'contain' para mostrar la imagen completa
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
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

          <small className="form-text text-muted d-block mt-2">
            Opcional: Imagen del tratamiento
          </small>
        </div>
      </form>
    </Modal>
  );
};

export default TreatmentFormModal;