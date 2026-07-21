# Guía de Integración PWA en Mentor Match

> [!NOTE]
> **Estado de la Integración**: Completada. La configuración del plugin `vite-plugin-pwa` ha sido instalada y configurada. Para verificar el funcionamiento completo, realizar un build de producción con `npm run build` y luego `npm run preview`.

Este documento describe el proceso de implementación de una capa **PWA (Progressive Web App)** en el proyecto **Mentor Match**, utilizando el plugin oficial [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/).

---

## 1. ¿Qué es una PWA y por qué la usamos?

Una PWA (Progressive Web App) es una aplicación web que se comporta como una app nativa. Permite:

- **Instalarla** en el celular o PC directamente desde el navegador
- **Cachear assets** para que cargue más rápido en visitas posteriores
- **Funcionar offline** (al menos los assets estáticos)

En Mentor Match la aplicamos para mejorar la experiencia del usuario, especialmente en dispositivos móviles donde los estudiantes y mentores pueden querer acceder rápidamente desde la pantalla de inicio.

---

## 2. Compatibilidad del Proyecto

El proyecto cumple con todos los requisitos para implementar PWA:

| Requisito | Estado |
| :--- | :--- |
| **Vite** como herramienta de build | ✅ Vite 6 |
| **Vue 3** como framework | ✅ Vue 3.5 |
| **HTTPS o localhost** para Service Workers | ✅ En desarrollo usa localhost |
| **Íconos PNG** en carpeta `public/` | ✅ Agregados en `public/icons/` |

---

## 3. Pros y Contras

| Pros (Ventajas) | Contras (Desventajas) |
| :--- | :--- |
| **Instalabilidad**: Los usuarios pueden instalar Mentor Match como app nativa en su celular o PC | **Sin offline real**: Las llamadas a la API (`/api/...`) no funcionan sin conexión ya que requieren el backend |
| **Carga más rápida**: Los assets estáticos (HTML, JS, CSS, imágenes) se cachean con Service Workers | **Caché desactualizado**: Si no se maneja bien, el usuario puede ver una versión vieja de la app |
| **Experiencia nativa**: Se abre sin barra de navegación del browser, con ícono propio en pantalla de inicio | **Solo se activa en producción**: El Service Worker no corre en `npm run dev`, solo en `npm run preview` o deploy |
| **Sin cambios en la lógica**: No requiere modificar componentes ni stores existentes | **Íconos obligatorios**: Sin íconos válidos el browser no habilita la instalación |

---

## 4. Paso a Paso de la Implementación

### Paso 1: Instalar el plugin

```bash
npm install -D vite-plugin-pwa
```

### Paso 2: Agregar los íconos

Se creó la carpeta `public/icons/` con los siguientes archivos:

- `icon-192x192.png` — Para pantallas pequeñas y Android
- `icon-512x512.png` — Para pantallas grandes y splash screens

Los íconos fueron generados en [favicon.io](https://favicon.io/favicon-generator/) con las iniciales **MM** sobre fondo indigo (`#4338ca`).

### Paso 3: Configurar `vite.config.js`

```javascript
import { VitePWA } from 'vite-plugin-pwa'

VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Mentor Match',
    short_name: 'MentorMatch',
    description: 'Plataforma de mentoría personalizada',
    theme_color: '#4338ca',
    background_color: '#f9fafb',
    display: 'standalone',
    start_url: '/',
    icons: [
      { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
})
```

- `registerType: 'autoUpdate'` — El Service Worker se actualiza automáticamente en segundo plano sin que el usuario tenga que hacer nada
- `display: 'standalone'` — La app se abre sin la barra de navegación del browser
- `start_url: '/'` — Al abrir la app instalada siempre arranca desde la home

### Paso 4: Probar la PWA

Los Service Workers **no funcionan en modo desarrollo** (`npm run dev`). Para probar:

```bash
npm run build
npm run preview
```

Accedé a `http://localhost:4173` y en las DevTools (F12):
- **Application → Manifest**: verificar que aparezcan los datos y los íconos
- **Application → Service Workers**: verificar que esté registrado y activo
- En la barra de direcciones aparecerá el botón de instalación ✅

---

## 5. Estructura de archivos relacionados

```
mentorMatch/
├── public/
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── vite.config.js        ← configuración del plugin
└── src/
    └── main.js           ← no requiere cambios (autoUpdate lo maneja solo).
```
