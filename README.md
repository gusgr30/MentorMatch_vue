# MentorMatch — Frontend

Plataforma web para conectar estudiantes con mentores profesionales. Los alumnos pueden explorar perfiles, seleccionar horarios disponibles y reservar sesiones de mentoría. Los mentores gestionan sus solicitudes, confirman clases y comparten el link de la reunión.

🔗 **Deploy:** [mentormatch en Vercel](https://mentor-match-vue-q1ni.vercel.app/)  
🔗 **Backend:** [mentormatch en Render]

---

## Stack Tecnológico

| Herramienta | Uso |
|---|---|
| Vue 3 (Composition API) | Framework principal |
| Vite | Build tool |
| Pinia | Estado global |
| Vue Router | Enrutamiento y guards |
| Tailwind CSS v4 + DaisyUI | Estilos |
| Axios | Peticiones HTTP |
| Luxon | Manejo de fechas y zonas horarias |
| vite-plugin-pwa | Soporte PWA |

---

## Instalación y Setup Local

### 1. Clonar el repositorio

```bash
git clone <https://github.com/gusgr30/MentorMatch_vue.git>
cd mentorMatch
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

> En producción esta variable se configura desde el dashboard de Vercel.

### 4. Correr el proyecto

```bash
npm run dev
```

---

## Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build de producción
npm run preview   # Previsualiza el build (necesario para probar PWA)
```

---

## Estructura de Directorios

```
src/
├── api/            # Instancia de Axios con baseURL y JWT
├── components/     # Componentes UI reutilizables
├── composables/    # Lógica reactiva reutilizable (useToast)
├── constants/      # Variables globales (roles, estados de reserva)
├── router/         # Rutas y Navigation Guards
├── services/       # Llamadas a la API separadas por dominio
├── stores/         # Módulos de estado global (Pinia)
├── utils/          # Funciones utilitarias (fechas, fotos, iniciales)
└── views/          # Vistas completas organizadas por rol
    ├── auth/
    ├── mentor/
    └── student/
```

---

## Roles y Flujo de Usuario

### Alumno (student)
- Explora el catálogo de mentores con filtro por tecnología
- Visualiza el perfil detallado de cada mentor y su disponibilidad
- Reserva una sesión seleccionando un slot horario disponible
- Gestiona sus mentorías desde "Mis Mentorías" (ver estado, cancelar, ir a la reunión)

### Mentor
- Visualiza el dashboard con estadísticas (pendientes, confirmadas, ingresos estimados)
- Confirma solicitudes de alumnos agregando el link de Zoom
- Edita o cancela reservas existentes
- Gestiona su perfil profesional (título, experiencia, tarifa, skills, disponibilidad)

---

## Gestión de Estado (Pinia)

| Store | Responsabilidad |
|---|---|
| `auth.js` | Login, registro, logout, init (JWT en localStorage). Getters: `isLoggedIn`, `isStudent`, `isMentor` |
| `skills.js` | Catálogo de tecnologías, cargado una sola vez y cacheado |
| `usuario.js` | CRUD de perfil del usuario |
| `reserva.js` | Estado de reservas, confirmar, cancelar y actualizar |

---

## Enrutamiento y Seguridad

Las rutas protegidas usan `meta: { requiresAuth: true, rol: 'student' | 'mentor' }`.

El guard global (`router.beforeEach`) se encarga de:

1. Redirigir a `/login` si el usuario no está autenticado
2. Redirigir al panel correspondiente si intenta entrar a `/login` ya logueado
3. Bloquear el acceso entre roles (un student no puede entrar a rutas de mentor y viceversa)

> **Importante:** `authStore.init()` se ejecuta con `await` en `main.js` **antes** de registrar el router, para evitar race conditions entre la validación del JWT y los guards.

---

## Capa de Servicios

Todas las llamadas a la API están centralizadas en `src/services/`, separadas por dominio:

```
services/
├── authService.js      # login, me
├── usuarioService.js   # getMentores, getUsuarioById, crearUsuario, actualizarUsuario
├── reservaService.js   # getReservasByUsuario, crearReserva, confirmarReserva, cancelarReserva
└── configService.js    # getSkills
```

Esto permite que si mañana cambia un endpoint, el cambio se hace en un solo lugar sin tocar los componentes.

---

## Integración con el Backend

- **Instancia centralizada:** `src/api/axios.js` configura la `baseURL` desde `VITE_API_URL_BACK` y un timeout de 60 segundos para tolerar el cold start de Render en plan gratuito.
- **JWT automático:** El token se inyecta en el header `Authorization` de cada petición.
- **Fotos de perfil:** El backend usa Multer para guardar imágenes en `/uploads/`. El frontend envía las fotos como `multipart/form-data` y las muestra usando la utilidad `resolverFoto()` que construye la URL absoluta.
- **Fechas:** Se usa Luxon con zona horaria `America/Argentina/Buenos_Aires` para evitar diferencias horarias entre frontend y backend.

---

## PWA

El proyecto está configurado como Progressive Web App con `vite-plugin-pwa`.

- Se instala en el dispositivo como una app nativa
- Cachea los assets estáticos para cargas más rápidas
- **Solo funciona en producción.** Para probarlo localmente:

```bash
npm run build
npm run preview
```

Luego abrir `http://localhost:4173` y verificar en DevTools → Application → Manifest.

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL_BACK` | URL base de la API del backend

## Usuarios de prueba estudiante
email: julieta@gmail.com
password:123456
## Usuarios de prueba mentor
email:gusrag@gmail.com
password:123456
