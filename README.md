# 🦷 Frontend - Sistema Ferreyra & Panozzo Odontología

Sistema de gestión odontológica desarrollado con React + Vite, Bootstrap y Zustand para manejo de estado global.

---

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Capa de comunicación con el backend
│   ├── axiosConfig.js     # Configuración de Axios con interceptores
│   ├── authApi.js         # API de autenticación
│   ├── userApi.js         # API de usuarios
│   ├── appointmentApi.js  # API de turnos
│   └── treatmentApi.js    # API de tratamientos
│
├── store/                  # Estado global con Zustand
│   ├── useAuthStore.js    # Store de autenticación
│   ├── useUserStore.js    # Store de usuarios
│   ├── useAppointmentStore.js  # Store de turnos
│   └── useTreatmentStore.js    # Store de tratamientos
│
├── hooks/                  # Custom hooks que conectan stores con APIs
│   ├── useAuth.js         # Hook de autenticación
│   ├── useUsers.js        # Hook de usuarios
│   ├── useAppointments.js # Hook de turnos
│   └── useTreatments.js   # Hook de tratamientos
│
├── utils/                  # Utilidades y helpers
│   ├── constants.js       # Constantes globales del sistema
│   └── formatters.js      # Funciones de formateo de datos
│
├── components/             # Componentes reutilizables
│   ├── common/            # Componentes comunes
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Modal.jsx
│   │   └── Form.jsx
│   ├── users/             # Componentes de usuarios
│   │   ├── UserList.jsx
│   │   ├── UserCard.jsx
│   │   └── UserProfile.jsx
│   ├── appointments/      # Componentes de turnos
│   │   ├── AppointmentList.jsx
│   │   ├── AppointmentCard.jsx
│   │   ├── AppointmentForm.jsx
│   │   └── AppointmentCalendar.jsx
│   └── treatments/        # Componentes de tratamientos
│       ├── TreatmentList.jsx
│       ├── TreatmentCard.jsx
│       └── TreatmentForm.jsx
│
├── pages/                  # Páginas principales
│   ├── Landing/           # Página de inicio (pública)
│   │   ├── Landing.jsx
│   │   └── sections/
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── TreatmentList.jsx  # Lista pública de tratamientos
│   │       └── Location.jsx        # Mapa con ubicación
│   ├── Login/
│   │   └── Login.jsx
│   ├── Register/
│   │   └── Register.jsx
│   └── Workspace/         # Área privada (autenticada)
│       ├── Workspace.jsx
│       ├── Dashboard.jsx          # Panel principal
│       ├── AppointmentsManager.jsx # Gestión de turnos
│       ├── TreatmentsManager.jsx   # Gestión de tratamientos
│       ├── UsersManager.jsx        # Gestión de usuarios
│       └── UserProfile.jsx         # Perfil del usuario
│
└── styles/                 # Estilos CSS
    ├── App.css
    ├── components.css
    └── pages.css
```

---

## 🗺️ Uso de Componentes por Página

### **Landing Page** (Pública - No requiere autenticación)

**Ruta:** `/`

**Componentes utilizados:**
- `Navbar.jsx` → Barra de navegación con enlaces a secciones
- `sections/Home.jsx` → Hero section con presentación del consultorio
- `sections/About.jsx` → Información sobre los profesionales
- `sections/TreatmentList.jsx` → Carrusel de tratamientos (sin precios)
  - Usa: `TreatmentCard.jsx` para mostrar cada tratamiento
  - Hook: `useTreatments()` para cargar datos
  - **Nota:** Los precios NO se muestran al público
- `sections/Location.jsx` → Mapa de Google Maps con ubicación
- `Footer.jsx` → Pie de página con contacto y redes sociales

---

### **Login** (Pública)

**Ruta:** `/login`

**Componentes utilizados:**
- `Navbar.jsx`
- `Form.jsx` → Formulario de inicio de sesión
- `ErrorMessage.jsx` → Muestra errores de validación
- `Loading.jsx` → Spinner durante autenticación
- Hook: `useAuth()` para manejar login

---

### **Register** (Pública)

**Ruta:** `/register`

**Componentes utilizados:**
- `Navbar.jsx`
- `Form.jsx` → Formulario de registro
- `ErrorMessage.jsx`
- `Loading.jsx`
- Hook: `useAuth()` para manejar registro

---

### **Workspace** (Privada - Requiere autenticación)

#### **Dashboard** (Todos los usuarios autenticados)

**Ruta:** `/workspace/dashboard`

**Componentes utilizados:**
- `Navbar.jsx`
- `Dashboard.jsx` → Vista principal con resumen de datos
- Hook: `useAuth()` para verificar rol del usuario

**Funcionalidad según rol:**
- **Profesionales:** Ven estadísticas generales, turnos pendientes, usuarios activos
- **Usuarios (pacientes):** Ven sus próximos turnos y perfil

---

#### **Appointments Manager** (Solo profesionales)

**Ruta:** `/workspace/appointments`

**Componentes utilizados:**
- `Navbar.jsx`
- `AppointmentsManager.jsx` → Vista principal
- `AppointmentList.jsx` → Lista de turnos
- `AppointmentCard.jsx` → Card individual de cada turno
- `AppointmentForm.jsx` → Formulario crear/editar turnos
- `AppointmentCalendar.jsx` → Vista de calendario
- `Modal.jsx` → Modal para confirmaciones
- Hook: `useAppointments()` para gestionar turnos
- Hook: `useUsers()` para seleccionar pacientes
- Hook: `useTreatments()` para seleccionar tratamientos

**Funcionalidades:**
- Crear nuevo turno
- Ver todos los turnos
- Editar turno existente
- Cambiar estado (pendiente, confirmado, completado, cancelado)
- Eliminar turno
- Filtrar por fecha, paciente, estado

---

#### **Treatments Manager** (Solo profesionales)

**Ruta:** `/workspace/treatments`

**Componentes utilizados:**
- `Navbar.jsx`
- `TreatmentsManager.jsx` → Vista principal
- `TreatmentList.jsx` → Lista de tratamientos
- `TreatmentCard.jsx` → Card individual (incluye precio)
- `TreatmentForm.jsx` → Formulario crear/editar tratamientos
- `Modal.jsx`
- Hook: `useTreatments()` para gestionar tratamientos

**Funcionalidades:**
- Crear nuevo tratamiento
- Ver todos los tratamientos (con precios)
- Editar tratamiento
- Eliminar tratamiento
- Subir imagen del tratamiento (imgBB)

---

#### **Users Manager** (Solo profesionales)

**Ruta:** `/workspace/users`

**Componentes utilizados:**
- `Navbar.jsx`
- `UsersManager.jsx` → Vista principal
- `UserList.jsx` → Lista de usuarios
- `UserCard.jsx` → Card individual
- `Modal.jsx`
- Hook: `useUsers()` para gestionar usuarios

**Funcionalidades:**
- Ver todos los usuarios
- Filtrar por rol (usuario/profesional)
- Ver usuarios activos
- **Eliminar usuarios con rol 'user'** (NO se pueden eliminar profesionales)
- Ver detalles de usuario

---

#### **User Profile** (Todos los usuarios autenticados)

**Ruta:** `/workspace/profile`

**Componentes utilizados:**
- `Navbar.jsx`
- `UserProfile.jsx` → Perfil del usuario
- Hook: `useAuth()` para obtener datos del usuario actual

**Funcionalidad según rol:**
- **Profesionales:** Ven su información personal
- **Usuarios (pacientes):** Ven su información personal y sus turnos
  - Usa: `AppointmentList.jsx` para mostrar turnos del paciente
  - Hook: `useAppointments()` para cargar turnos del usuario actual

---

## 🔐 Sistema de Autenticación

### Flujo de autenticación:

1. **Login/Register:**
   - Usuario ingresa credenciales
   - `useAuth()` llama a `authApi.login()` o `authApi.register()`
   - Backend devuelve `{ user, token }`
   - Token se guarda en `localStorage` y se agrega a headers de Axios
   - Usuario se redirige a `/workspace/dashboard`

2. **Verificación de token:**
   - Cada request incluye token en header `Authorization: Bearer <token>`
   - Si token expira (401), se limpia localStorage y redirige a `/login`

3. **Protección de rutas:**
   - Rutas de `/workspace/*` verifican `isAuthenticated` del store
   - Rutas administrativas verifican `isProfessional()`

---

## 🎯 Hooks Personalizados

### `useAuth()`
Gestiona autenticación y usuario actual.

**Métodos:**
- `register(userData)` → Registrar usuario
- `login(credentials)` → Iniciar sesión
- `logout()` → Cerrar sesión
- `getProfile()` → Obtener perfil actual
- `verifyToken()` → Verificar validez del token
- `isProfessional()` → Verificar si es profesional
- `isUser()` → Verificar si es paciente

---

### `useUsers()`
Gestiona usuarios del sistema (solo profesionales).

**Métodos:**
- `loadAllUsers()` → Cargar todos los usuarios
- `loadUserById(userId)` → Cargar usuario específico
- `loadUsersByRole(role)` → Filtrar por rol
- `loadActiveUsers()` → Usuarios con sesión activa
- `deleteUser(userId)` → Eliminar usuario (solo rol 'user')

---

### `useAppointments()`
Gestiona turnos del sistema.

**Métodos:**
- `loadAllAppointments()` → Cargar todos los turnos (profesionales)
- `loadAppointmentsByUser(userId)` → Turnos de un paciente
- `loadAppointmentsByDate(date)` → Turnos por fecha
- `createAppointment(data)` → Crear turno
- `modifyAppointment(id, data)` → Actualizar turno
- `changeAppointmentState(id, state)` → Cambiar estado
- `deleteAppointment(id)` → Eliminar turno

---

### `useTreatments()`
Gestiona tratamientos del sistema.

**Métodos:**
- `loadAllTreatments()` → Cargar todos los tratamientos (público)
- `loadTreatmentById(id)` → Cargar tratamiento específico
- `createTreatment(data)` → Crear tratamiento (profesionales)
- `modifyTreatment(id, data)` → Actualizar tratamiento (profesionales)
- `deleteTreatment(id)` → Eliminar tratamiento (profesionales)
- `uploadImage(file)` → Subir imagen a imgBB

---

## 🚀 Instalación y Uso

### 1. Instalar dependencias:
```bash
npm install
```

### 2. Configurar variables de entorno:
Crear archivo `.env` en la raíz con:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Ferreyra & Panozzo - Odontología General
VITE_NODE_ENV=development
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_TIMEOUT=10000
```

### 3. Ejecutar en desarrollo:
```bash
npm run dev
```

### 4. Compilar para producción:
```bash
npm run build
```

### 5. Servir build de producción:
```bash
npm run start
```

---

## 📝 Próximos Pasos para Continuar el Desarrollo

1. **Crear componentes visuales (.jsx):**
   - Implementar componentes en `/components/`
   - Implementar páginas en `/pages/`
   - Diseñar con Bootstrap y CSS personalizado

2. **Integrar react-router-dom:**
   - Configurar rutas en `App.jsx`
   - Implementar rutas protegidas con verificación de autenticación

3. **Implementar navegación:**
   - Navbar con enlaces dinámicos según rol
   - Redirecciones automáticas post-login

4. **Integrar Google Maps:**
   - Implementar mapa en `sections/Location.jsx`
   - Usar `@react-google-maps/api`

5. **Implementar carrusel de tratamientos:**
   - Usar Swiper en `sections/TreatmentList.jsx`
   - Ocultar precios para público general

6. **Formularios con validación:**
   - Usar `react-hook-form` en formularios
   - Implementar validaciones del lado cliente

7. **Gestión de imágenes:**
   - Implementar subida de imágenes en `TreatmentForm`
   - Integrar con imgBB API

8. **Testing:**
   - Escribir tests unitarios para hooks
   - Tests de integración para flujos principales

---

## 🔒 Seguridad

- **Tokens JWT:** Almacenados en localStorage, incluidos en cada request
- **Interceptores Axios:** Manejo automático de errores 401 y redirección
- **Validación:** Validaciones tanto en frontend como backend
- **Variables de entorno:** Claves sensibles en `.env` (no committed)

---

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Framework de UI
- **Vite 6.2.0** - Build tool
- **Zustand 5.0.3** - Estado global
- **Axios 1.7.0** - Cliente HTTP
- **React Router DOM 7.5.1** - Enrutamiento
- **React Hook Form 7.57.0** - Gestión de formularios
- **Bootstrap 5.3.3** - Estilos y componentes
- **Swiper 11.2.6** - Carruseles
- **React Calendar 5.1.0** - Calendario de turnos
- **@react-google-maps/api 2.20.6** - Integración Google Maps

---

## 📧 Contacto

**Ferreyra & Panozzo - Odontología General**  
25 de Mayo 1484 - 1er piso consultorio 8  
Corrientes Capital  

---

**Desarrollado con ❤️ siguiendo las mejores prácticas de desarrollo frontend**