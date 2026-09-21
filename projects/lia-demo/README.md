# Lia · Demo pública de onboarding

Experiencia pública independiente del repositorio privado de Lia. Utiliza exclusivamente documentos ficticios y respuestas predefinidas. No hay llamadas a Ollama, Firebase, correo ni servicios de RR. HH. No se han copiado documentos ni credenciales del proyecto privado.

## Ejecutar

```sh
npm install
npm run dev
npm run build
npm test
```

Vite utiliza `/proyectos/lia/` como ruta base para publicarse dentro del portafolio. Copiar `dist` a `public/proyectos/lia` y compilar el portafolio. El código usa React 18 y lucide-react.

## Recorrido

- Consulta una pregunta de ejemplo y abre su fuente.
- Lee la página de referencia o explora la biblioteca completa.
- Pregunta por un salario para ver una abstención.
- Marca los pasos de bienvenida; se guardan en localStorage.
- Inicia una nueva conversación para limpiar el chat.

La simulación reconoce solo las preguntas definidas en `src/knowledge.js`, con normalización de acentos y puntuación. No realiza búsqueda semántica ni evalúa modelos. Las fuentes son referencias de página del material ficticio incluido; no son archivos PDF cargados. El chat no se guarda ni se envía a un servidor. Solo el progreso de la lista se guarda en el navegador.

El proyecto privado integra Python y Ollama. Esta demo demuestra el recorrido de producto y la presentación de evidencia, no la calidad del modelo ni un despliegue del sistema privado.

## Validación de esta entrega

Tres pruebas unitarias aprobadas. Revisión en navegador de preguntas con fuentes, lectura de páginas, abstención, navegación de biblioteca y persistencia del progreso tras recarga. Vista móvil de 390 px sin desbordamiento horizontal.
