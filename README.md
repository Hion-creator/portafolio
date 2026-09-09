# Andres Salazar · Desarrollo Web & IA Aplicada

Portafolio en React y Vite, orientado a presentar experiencia profesional y proyectos con evidencia. Incluye Lia, una propuesta de onboarding con IA, y Sunthers, un sitio para una comunidad gaming.

## Desarrollo

Requiere Node.js 22 y npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

La base `/portafolio/` se conserva para GitHub Pages. `npm run deploy` compila y publica en la rama `gh-pages`; ejecutarlo solo cuando se decida actualizar la web pública. Este rediseño se entrega como propuesta en una rama separada.

## Contenido

- `src/App.jsx`: portada, perfil, tecnologías, trayectoria y pie.
- `src/components/Projects.jsx`: proyectos, filtros y detalles.
- `src/components/Contact.jsx`: correo, teléfono y formulario para preparar un mensaje.
- `src/components/Navbar.jsx`: navegación accesible y menú móvil.
- `src/index.css`: diseño y adaptación responsive.
- `docs/AUDITORIA.md`: hallazgos, límites y propuestas de nuevos proyectos.

El contacto abre la aplicación de correo del visitante y **no envía mensajes automáticamente**. La dirección se puede copiar como alternativa. No se recopilan ni registran datos del formulario en un servidor.

No hay descarga de CV hasta disponer de un archivo o enlace real. La presentación pública de Lia no se etiqueta como demo. El código de Lia permanece privado. EMCALI figura como experiencia anterior; queda pendiente completar su fecha de finalización.

La ilustración de la portada es CSS: no necesita WebGL ni una espera de carga. Se conservan las dependencias existentes para evitar cambios ajenos a la auditoría; los componentes antiguos sin uso quedan recuperables en el historial Git.

## Validación en este entorno

Compilación y lint correctos; auditoría npm sin alertas el 9 de septiembre de 2026. La compilación requirió `vite build --configLoader native` para evitar una limitación de lectura del entorno Windows aislado. La configuración y los comandos estándar del proyecto siguen disponibles para instalaciones normales.

La comprobación HTTP de los enlaces públicos no sustituye pruebas de interacción o una revisión visual en varios dispositivos. Consulta los límites y datos pendientes en la auditoría.
