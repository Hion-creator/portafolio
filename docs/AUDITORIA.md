# Auditoría del portafolio

## Actualización del 14 de septiembre de 2026

Se incorpora una esfera de partículas conectadas que representa una red neuronal. Incluye pulsos de información, respuesta suave al cursor, pausa/reanudación, variante estática para movimiento reducido y suspensión cuando la escena o pestaña no son visibles. Es una representación conceptual, no una visualización de inferencias reales.

Se comprueba la portada en navegador de escritorio y móvil (390 px), el botón de pausa, el menú y el filtro de IA; no hay desbordamiento horizontal a ese ancho. Compilación y lint correctos. La revisión histórica siguiente corresponde al 9 de septiembre.

La rama publicada contiene un `CNAME` para `andressalazar.tech`. Se ajusta Vite a la base `/` y se incorpora `public/CNAME` para preservar ese dominio en posteriores publicaciones.

Fecha: 9 de septiembre de 2026. Base revisada: `636c8ebaaff6f9dcd14e8712407e69412b55bf2d`.

## Hallazgos y correcciones

| Prioridad | Hallazgo | Cambio |
| --- | --- | --- |
| Alta | El formulario registraba los datos en consola y mostraba «Mensaje enviado» sin enviar nada. | Preparación explícita de un correo mediante `mailto:`, sin confirmación falsa, con copia de dirección y alternativa manual. Los campos se conservan. |
| Alta | Enlaces `#` en proyectos y código de Lia inaccesible para visitantes porque el repositorio es privado. | Se eliminaron los proyectos sin evidencia del listado público. Lia indica código privado y enlaza a su presentación pública. |
| Alta | EMCALI figuraba como empleo actual y la universidad aparecía como «Universidad». | Se actualizó según el titular: EMCALI es experiencia anterior; graduado de la Institución Universitaria Antonio José Camacho. |
| Media | Espera artificial de dos segundos, WebGL y animaciones permanentes para acceder al contenido principal. | Contenido inmediato y una composición gráfica en CSS que no necesita WebGL ni bucles de animación. |
| Media | Sunthers y WebWarbone enlazaban al mismo repositorio como proyectos distintos. | Un único caso Sunthers, con enlace a WebWarbone como código. |
| Media | Porcentajes subjetivos de dominio y afirmaciones amplias sin evidencia. | Tecnologías agrupadas por uso, sin porcentajes ni métricas inventadas. |
| Media | Navegación móvil sin nombre accesible ni estado del menú. | Etiqueta, `aria-expanded`, `aria-controls`, cierre con Escape y retorno del foco. |
| Media | Favicon Vite ausente, título genérico y lint sin configuración para ESLint 9. | Favicon propio, metadatos personales y configuración de lint. |
| Media | Dependencias con 18 alertas de auditoría npm. | Actualización compatible del lockfile y Vite 6.4.3 o posterior dentro de la serie 6; auditoría final sin alertas. |

La ficha de [seguridad de Vite](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) identifica 6.4.3 como versión corregida. Los avisos del servidor de desarrollo no equivalen por sí solos a una vulnerabilidad explotable del sitio estático publicado.

## Dirección de diseño

Fondo grafito, acento verde claro, jerarquía tipográfica y espacio para leer. La portada conecta desarrollo web con IA aplicada; los proyectos aparecen antes del perfil y las tecnologías. Los gráficos de Lia y Sunthers son composiciones conceptuales, no capturas ni demostraciones de productos.

## Comprobaciones

- Compilación de producción y lint.
- Renderizado de servidor: IDs únicos, enlaces internos con destino, un único H1, educación actualizada y referencias a archivos de producción existentes.
- Respuesta HTTP 200 del portafolio existente, la presentación de Lia y Sunthers el día de la auditoría. Esto comprueba accesibilidad HTTP, no todas sus funciones.
- Consulta de permisos y visibilidad de los repositorios mediante GitHub: Lia privado, WebWarbone público.
- Auditoría de dependencias npm: 0 vulnerabilidades tras las actualizaciones, según la base consultada.
- Vista previa local de la compilación de producción.

No se realizó una auditoría visual automatizada en navegador, pruebas Lighthouse ni un envío real de correo. El envío requiere que el visitante tenga una aplicación de correo configurada. Un envío directo desde la web requiere un proveedor o backend, sus credenciales y comprobación de entrega.

## Información pendiente del titular

- Mes y año de finalización en EMCALI y año de graduación.
- Cargo objetivo y CV público actualizado para añadir una descarga real.
- Resultados verificables de Lia: evaluación, usuarios, latencia, limitaciones y contribución concreta.
- Capturas reales autorizadas o una demo pública de Lia; el repositorio privado no debe hacerse público sin revisar su contenido.

## Proyectos para la siguiente etapa

Son propuestas, no trabajos ya realizados. No se muestran como proyectos terminados en la web.

1. **Lia: demo RAG evaluada.** Prioridad alta. Usar documentación ficticia o pública, respuestas con fuentes y una negativa clara cuando no hay evidencia. Entregable: demo, diagrama, conjunto de 30–50 preguntas y resultados medidos de fidelidad, latencia y coste. Es la continuación más coherente del perfil actual.
2. **Banco de evaluación de modelos locales.** Comparar dos modelos sobre el mismo conjunto de preguntas de onboarding, con hardware, configuración y resultados reproducibles. Entregable: tabla de precisión, latencia y consumo de memoria. Demuestra criterio técnico además de integración.
3. **Clasificación de solicitudes con revisión humana.** Clasificar solicitudes sintéticas, proponer categoría y resumen, y permitir que una persona corrija o apruebe. Entregable: aplicación con estado de error, incertidumbre y trazabilidad. Demuestra automatización con control humano.

Primero conviene consolidar un caso de Lia con evidencia antes de sumar proyectos genéricos. Cada caso debería explicar problema, rol, decisiones, límites y resultados medidos.
