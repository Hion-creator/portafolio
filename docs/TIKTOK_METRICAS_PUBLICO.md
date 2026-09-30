# Páginas públicas para el registro de EspacioClip en TikTok

Rutas elegidas por el propietario dentro del dominio existente, sin un subdominio:

- Sitio de la aplicación: `https://andressalazar.tech/tiktokmetricas/`
- Términos: `https://andressalazar.tech/tiktokmetricas/terminos/`
- Privacidad: `https://andressalazar.tech/tiktokmetricas/privacidad/`

Las páginas son estáticas, sin dependencias ni scripts. El editor, las credenciales, la API local, los datos y el código de EspacioClip no se publican. Se reutiliza la demo visual ya pública, identificada como la primera versión y sin presentarla como prueba de OAuth.

## Ubicación y publicación

El código público de estas páginas está en `public/tiktokmetricas/`. Vite copia esos archivos a `dist/tiktokmetricas/` al compilar. GitHub Pages sirve el directorio con `index.html` para cada ruta y conserva los recursos ya existentes.

Para publicar únicamente estos cambios, añadir los archivos con el prefijo `tiktokmetricas/` a la rama `gh-pages`, conservando su árbol actual. Esto evita recompilar o sobrescribir otras actualizaciones del portafolio. Mantener a la vez los archivos fuente bajo `public/tiktokmetricas/` en `main` para futuros `npm run deploy`. No sustituir CNAME ni cambiar DNS.

Estas páginas deben responder por HTTPS antes de copiar las URL al portal. TikTok puede solicitar verificar el dominio o un prefijo de URL con un archivo de firma. El archivo de firma real se obtiene del portal del propietario; no se inventa. Las páginas no equivalen a la aprobación de TikTok.

**El Redirect URI es diferente del sitio público.** Para Login Kit Desktop, seguir usando el retorno loopback que muestra el editor: por ejemplo, `http://127.0.0.1:8766/api/tiktok/callback/` o el puerto actual. No cambiar el retorno OAuth por la página pública.

## Contenido y mantenimiento

Se usa el nombre EspacioClip Studio y el contacto que ya figuraba públicamente en el portafolio: `andres.gaviria.salazar@gmail.com`. Los textos describen la implementación local existente a fecha 30 de septiembre de 2026: lectura, almacenamiento de métricas en SQLite, tokens DPAPI, desconexión que conserva historial y eliminación manual local. GitHub Pages registra IP de visitas por seguridad según su documentación; estas páginas no añaden analítica propia.

Antes de distribuir una versión comercial o cambiar la arquitectura, actualizar los textos y revisar su adecuación legal y la arquitectura de tratamiento de datos. No afirmar ausencia total de registros del proveedor, cifrado de todos los videos, acceso remoto a los datos, aprobación de TikTok o resultados garantizados.

## Comprobación

- Validar cada HTML y los enlaces internos de archivos, títulos, rutas canonical y navegación.
- Abrir el producto, términos y privacidad; comprobar legibilidad y contacto.
- Comprobar las tres URL públicas después de la publicación y el estado de despliegue de GitHub Pages.
- Verificar que no se publica ningún archivo del editor, datos, Client Secret ni token.

Referencias: [registro TikTok](https://developers.tiktok.com/docs/en/getting-started-create-an-app), [Login Kit Desktop](https://developers.tiktok.com/docs/en/login-kit-desktop), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
