/**
 * Punto de entrada principal de la aplicación
 * Ferreyra & Panozzo - Odontología General
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos personalizados en orden correcto
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/utilities.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);