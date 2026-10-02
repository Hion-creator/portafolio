# Decision Lab: decisiones con contexto y evidencia

Laboratorio local para comparar Nimble 9B Q4 y Qwen3 1.7B Q4 al clasificar requerimientos. Incluye recuperación de documentos, evaluación pareada y una publicación que muestra las respuestas reales guardadas. Todos los requerimientos y documentos son ficticios.

## Inicio

Requiere Python 3.10+ y Ollama 0.35+ con los modelos instalados. No utiliza paquetes Python externos ni claves API.

```powershell
ollama pull nimble:9b-q4_K_M
ollama pull qwen3:1.7b
python -m unittest discover -s tests -v
python server.py
```

Abrir http://127.0.0.1:8092/. Para repetir el experimento completo, cerrar otras inferencias y ejecutar `python evaluate.py`. Son 288 llamadas más 4 calentamientos. El evaluador escribe un archivo parcial después de cada llamada y conserva los fallos. No ejecutar inferencias de la interfaz mientras se mide; el bloqueo del servidor no se comparte con el proceso de evaluación.

## Qué problema representa

Una mesa de servicio recibe solicitudes con códigos del catálogo interno. Por ejemplo, “tramiten MQ-27 de Atlas” no explica qué hace ese trámite. Un modelo preentrenado no conoce este catálogo inventado. La referencia empresarial espera acceso porque el documento vigente define MQ-27 como permiso de lectura. Sin definición, enviar a revisión es prudente; la evaluación cuenta coincidencia con el destino esperado, no prueba que abstenerse sea una conducta insegura.

La salida tiene tres campos: `route` (incidente, mejora, acceso, facturacion o revision), `ready` (hay información para iniciar triage) y `urgency_level` (rutina 0, parcial 1, bloqueante 2). Preparado no significa resuelto ni autorizado para actuar. Una persona confirma destino, alcance e impacto antes de asignar.

## Componentes y conceptos

| Archivo | Función | Concepto |
|---|---|---|
| `data/corpus.json` y `data/documents/` | Catálogo ficticio con versión, ubicación, permisos y vigencia | Fuente de verdad: información externa al modelo |
| `retrieval.py` | Filtra documentos y recupera hasta dos | BM25 puntúa palabras; un código exacto agrega un bono de búsqueda |
| `rag.py` | Construye contexto autorizado y llama a cada modelo | RAG agrega información en cada petición; no reentrena los pesos |
| `core.py` | Transporte HTTP, validadores, métricas y costos | Un JSON válido no garantiza un resultado correcto |
| `evaluate.py` | Congela protocolo y realiza comparación pareada | Cada modelo recibe el mismo texto bajo tres condiciones |
| `server.py` | API y página locales en loopback | Inferencia real accesible solo desde el equipo |
| `static/` | Comparación, casos, fuentes y simulador de costos | La publicación consulta un archivo de evidencia, no un modelo remoto |
| `tests/` | Controles deterministas del backend | Separados de la medición de calidad de los modelos |

## Flujo explicable

1. Validar texto, longitud y motor solicitado.
2. Filtrar documentos por rol `mesa`, estado activo y fecha. La búsqueda no ve documentos restringidos.
3. Buscar por palabras normalizadas y códigos. Conservar hasta dos fragmentos dentro de un presupuesto de 1600 caracteres de texto. No se usa un modelo de embeddings ni una base vectorial.
4. Preparar un estado con `mensaje` y fragmentos (`id`, título, fuente, versión, sección y texto). No incluir etiquetas humanas, grupo o división del dataset.
5. Qwen recibe `/api/chat` con esquema JSON, `think:false`, temperatura 0 y contexto 4096. Nimble recibe `/v1/systemone`: pregunta `choice` para ruta, `noul` para preparación y `score` para impacto. Ese endpoint no expone los mismos controles de generación que chat.
6. Validar tipos y distribuciones. `noul >= 0.5` se transforma en booleano para comparar, no para autorizar acciones. Para impacto se elige la categoría más probable; la esperanza se conserva como diagnóstico.
7. Preparar una ficha para revisión. No modificar un CRM, enviar correos o ejecutar órdenes del mensaje/documento.
8. Registrar respuesta cruda, fuentes y tiempos. Separar recuperación y llamada HTTP; la medición total incluye ambos.

## Cómo leer la evaluación

El corpus tiene 17 documentos, incluidos distractores, versiones retiradas y permisos restringidos. Los 6 casos de desarrollo tienen códigos distintos de los 24 evaluados. Se ajustaron las instrucciones únicamente con desarrollo: formato más legible para chat y aclaración de que varios documentos no constituyen varias solicitudes. Los intentos se conservan en `reports/development*.json`.

Se compara **sin contexto**, **RAG** y **oracle** (documentos correctos escogidos por el evaluador, sin etiquetas de salida). Oracle permite diagnosticar interpretación; no es una alternativa de despliegue. Hay dos repeticiones de cada caso, semilla 42 y bloques de modelos contrabalanceados: Nimble→Qwen, después Qwen→Nimble. Cuatro calentamientos quedan fuera de las métricas. El modelo y los digests instalados se registran junto al entorno.

La ficha completa debe acertar los tres campos. Los fallos técnicos permanecen en el denominador. También se mide ruta, F1 macro, latencia media/P95, recuperación y mejora/regresión pareada. Recall@2 se calcula solo cuando existe una fuente de referencia; no se premian casos sin fuente. La confianza del modelo no sustituye estas métricas.

El conjunto incluye 16 solicitudes de catálogo, 5 controles, 1 prueba de permisos, 1 de vigencia y 1 mensaje adversarial. Hay 17 casos con fuente de referencia. La muestra es pequeña y sintética; las repeticiones no son independientes. No se puede generalizar a producción o atribuir causalmente la diferencia Nimble–Qwen solo al tipo de API: también cambian tamaño, entrenamiento y cuantización.

## Costos y entrega de requerimientos

La comparación mide clasificación y ficha inicial, no desarrollo ni entrega de una funcionalidad de software. No hay cobro por tokens del proveedor cuando se usa la API local. La energía se estima como W / 1000 × segundos / 3600 × COP/kWh. El trabajo humano supuesto es revisión por salida válida + retrabajo por ficha incorrecta + trámite manual por fallo técnico. Los costos fijos mensuales se prorratean entre solicitudes.

Supuestos iniciales: 1000 solicitudes/mes, 80 W, 1000 COP/kWh, 30000 COP/hora, 120 s manuales, 20 s de revisión y 90 s adicionales por error. Costos fijos iniciales 0; ajustarlos para equipo, instalación, indexación, mantenimiento y energía inactiva. No se midió potencia ni tiempo humano; los ahorros son escenarios, no ROI demostrado.

## Resultados anteriores

`reports/historical/` conserva las comparaciones anteriores con Tev1 y Nimble. Utilizan otro conjunto y otro contrato; no deben mezclarse con esta prueba como si fueran la misma línea base. El informe nuevo se genera desde `reports/latest.json` y se incluye en `informe.md`.

## Límites y siguiente incremento

Un catálogo pequeño con códigos exactos favorece BM25. Con documentos extensos, sinónimos y consultas sin código, evaluar embeddings, búsqueda híbrida y reranking con otro conjunto congelado. Agregar una política de abstención validada, detectar instrucciones maliciosas en documentos y probar la fuente de cada decisión. Las fuentes actuales son las recuperadas por el programa, no citas del modelo ni prueba de que cada decisión esté sustentada.

Aplicar después a una empresa requiere reglas y documentos reales autorizados, permisos por identidad y una prueba con usuarios. Este demo no representa reglas internas confirmadas de Saufer.

Referencias oficiales: [System One](https://docs.ollama.com/api/systemone), [Chat](https://docs.ollama.com/api/chat), [Nimble Q4](https://ollama.com/library/nimble:9b-q4_K_M).
