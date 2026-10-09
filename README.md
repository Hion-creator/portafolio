# Andres Salazar · Desarrollo web e IA aplicada

Portafolio en React y Vite: un recorrido visual por Entrada, Lia, Pulso y Decision Lab, seguido de proyectos, perfil, tecnologías, trayectoria y contacto. Sitio público: https://andressalazar.tech.

## Desarrollo

Requiere Node.js 22 o posterior y npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run deploy` compila y publica en `gh-pages`. La base `/`, `public/CNAME` y `.nojekyll` conservan el dominio de GitHub Pages. La herramienta de lint existente sigue disponible con `npm run lint`.

## Recorrido

- `src/components/Journey.jsx`: cuatro capítulos, scroll nativo y controles accesibles.
- `src/lib/frame-player.js`: carga progresiva de WebP, tres solicitudes simultáneas y doce imágenes decodificadas como máximo. Libera imágenes y cancela solicitudes obsoletas.
- `src/journey.css`: recorrido y presentación de proyectos.
- `public/media/journey/manifest.json`: duración, resolución y rutas.
- `tests/frame-player.test.mjs`: memoria acotada, recuperación visual ante fallos y cierre de imágenes que terminan de decodificarse después de desmontar el componente.

El movimiento depende del scroll, sin reproducción automática ni bucle de animación en reposo. Se activa una vista estática con `prefers-reduced-motion`, ahorro de datos, pantallas de hasta 620 px de alto o el control del visitante. Si fallan los fotogramas, permanecen las imágenes de cada capítulo. El navegador carga imágenes cercanas al punto actual, no los videos originales.

Transiciones generadas con Seedance 2.5 en Higgsfield: tres clips de cuatro segundos, 720p, sin audio y con imagen inicial/final. Costo cotizado total: 84 créditos; límite autorizado: 100. Las imágenes son una dirección artística del portafolio, no capturas de los productos.

Para reconstruir los fotogramas con los clips originales y FFmpeg:

```powershell
./scripts/prepare-journey.ps1 -InputDirectory 'ruta/a/los/clips' -Ffmpeg 'ruta/a/ffmpeg.exe'
```

Se esperan `transicion-01.mp4`, `transicion-02.mp4` y `transicion-03.mp4`. Se extraen 144 imágenes por variante: 1280 × 720 para escritorio y 960 × 540 para móvil.

## Contenido y límites

`Projects.jsx` conserva cinco proyectos y filtros. Lia muestra datos ficticios y respuestas simuladas; su sistema local permanece privado. Pulso utiliza reglas y plantillas en la demo pública. Decision Lab presenta resultados guardados de inferencias locales y 24 casos ficticios. EspacioClip Studio presenta una captura real de 32 segundos y mantiene su código privado. Sunthers conserva sus enlaces públicos.

El contacto prepara un correo en la aplicación del visitante; no envía mensajes automáticamente ni registra datos en un servidor. Se conserva la información profesional existente. EMCALI figura como experiencia anterior con fecha pendiente. No se ofrece descarga de CV sin un archivo real.

No se agregaron dependencias. Los componentes históricos quedan disponibles para referencia. `docs/AUDITORIA.md` conserva la auditoría anterior y sus datos pendientes.
