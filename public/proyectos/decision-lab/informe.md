# Informe: Nimble y Qwen con recuperación de documentos

Ejecución local: `20261002T184911Z`. Protocolo SHA-256: `0d8098722d093c0235011c13ca0ff5cb424e3f65e8d8d3002d879b66a957c60e`.

## Resultado principal

| Flujo | Ficha completa | Ruta correcta | Media total | P95 | COP/solicitud estimados |
|---|---:|---:|---:|---:|---:|
| Nimble sin RAG | 20/48 (41.7%) | 45.8% | 2.263 s | 2.580 s | 604.22 |
| Nimble + RAG | 24/48 (50.0%) | 87.5% | 2.318 s | 2.775 s | 541.72 |
| Qwen sin RAG | 6/48 (12.5%) | 20.8% | 0.196 s | 0.211 s | 822.92 |
| Qwen + RAG | 16/48 (33.3%) | 54.2% | 0.265 s | 0.321 s | 666.67 |

Nimble cambia de 41.7% a 50.0% de fichas completas correctas al añadir RAG: +8.3 puntos porcentuales en este conjunto. El tiempo medio cambia de 2.263 a 2.318 segundos.

Una ficha correcta exige ruta, preparación e impacto correctos a la vez. La métrica mide coincidencia con una referencia humana ficticia, no la capacidad de implementar o entregar software. Sin catálogo, abstenerse ante códigos desconocidos es razonable aunque no coincida con el destino empresarial esperado.

## Búsqueda e interpretación

Recall@2: 100.0%; MRR: 1.000. Se calcula sobre 34 llamadas Nimble + RAG con fuente de referencia (17 casos × 2), no sobre controles sin fuente.

El resultado no es una mejora uniforme: ruta pasa de 22/48 a 42/48; preparación de 44/48 a 40/48 e impacto de 44/48 a 34/48. El contexto introduce interferencias aun cuando la búsqueda encuentra la fuente correcta. Próxima prueba propuesta: usar el catálogo únicamente en la pregunta de ruta y evaluar preparación e impacto solo con el mensaje. Ese flujo todavía no se implementó ni midió; no se presenta como un resultado obtenido.

Nimble con documento correcto de diagnóstico: 30/48 fichas (62.5%). RAG frente a sin contexto mejora 12 respuestas y empeora 8; 28 sin cambio de corrección. Las unidades son caso-repetición, no observaciones independientes.

Qwen con documento correcto de diagnóstico: 20/48 fichas (41.7%). RAG frente a sin contexto mejora 12 respuestas y empeora 2; 34 sin cambio de corrección. Las unidades son caso-repetición, no observaciones independientes.

## Casos que todavía fallan con Nimble + RAG

| Caso | Repetición | Esperado | Observado |
|---|---:|---|---|
| R17 | 1 | `{"route": "mejora", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R03 | 1 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R18 | 1 | `{"route": "incidente", "ready": true, "urgency_level": 2}` | `{"route": "incidente", "ready": false, "urgency_level": 2}` |
| R02 | 1 | `{"route": "acceso", "ready": true, "urgency_level": 1}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R24 | 1 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R19 | 1 | `{"route": "revision", "ready": false, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R22 | 1 | `{"route": "revision", "ready": true, "urgency_level": 0}` | `{"route": "revision", "ready": false, "urgency_level": 0}` |
| R13 | 1 | `{"route": "mejora", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R23 | 1 | `{"route": "revision", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 0}` |
| R21 | 1 | `{"route": "revision", "ready": true, "urgency_level": 1}` | `{"route": "acceso", "ready": true, "urgency_level": 1}` |
| R01 | 1 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R11 | 1 | `{"route": "incidente", "ready": true, "urgency_level": 0}` | `{"route": "incidente", "ready": false, "urgency_level": 0}` |
| R22 | 2 | `{"route": "revision", "ready": true, "urgency_level": 0}` | `{"route": "revision", "ready": false, "urgency_level": 0}` |
| R01 | 2 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R13 | 2 | `{"route": "mejora", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R18 | 2 | `{"route": "incidente", "ready": true, "urgency_level": 2}` | `{"route": "incidente", "ready": false, "urgency_level": 2}` |
| R17 | 2 | `{"route": "mejora", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R21 | 2 | `{"route": "revision", "ready": true, "urgency_level": 1}` | `{"route": "acceso", "ready": true, "urgency_level": 1}` |
| R19 | 2 | `{"route": "revision", "ready": false, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 1}` |
| R23 | 2 | `{"route": "revision", "ready": true, "urgency_level": 0}` | `{"route": "mejora", "ready": true, "urgency_level": 0}` |
| R11 | 2 | `{"route": "incidente", "ready": true, "urgency_level": 0}` | `{"route": "incidente", "ready": false, "urgency_level": 0}` |
| R24 | 2 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R02 | 2 | `{"route": "acceso", "ready": true, "urgency_level": 1}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |
| R03 | 2 | `{"route": "acceso", "ready": true, "urgency_level": 0}` | `{"route": "acceso", "ready": true, "urgency_level": 2}` |

## Desglose por grupo

| Flujo | Grupo | Fichas correctas |
|---|---|---:|
| Nimble sin RAG | adversarial | 0/2 |
| Nimble sin RAG | conocimiento | 12/32 |
| Nimble sin RAG | control | 6/10 |
| Nimble sin RAG | permiso | 0/2 |
| Nimble sin RAG | vigencia | 2/2 |
| Nimble + RAG | adversarial | 0/2 |
| Nimble + RAG | conocimiento | 22/32 |
| Nimble + RAG | control | 2/10 |
| Nimble + RAG | permiso | 0/2 |
| Nimble + RAG | vigencia | 0/2 |
| Qwen sin RAG | adversarial | 0/2 |
| Qwen sin RAG | conocimiento | 0/32 |
| Qwen sin RAG | control | 2/10 |
| Qwen sin RAG | permiso | 2/2 |
| Qwen sin RAG | vigencia | 2/2 |
| Qwen + RAG | adversarial | 0/2 |
| Qwen + RAG | conocimiento | 12/32 |
| Qwen + RAG | control | 2/10 |
| Qwen + RAG | permiso | 0/2 |
| Qwen + RAG | vigencia | 2/2 |

## Método y reproducibilidad

24 casos sintéticos × 2 repeticiones × 2 modelos × 3 condiciones = 288 llamadas evaluadas. Se excluyen 4 calentamientos. Desarrollo separado: 6 casos con códigos distintos. Orden por bloques contrabalanceado Nimble→Qwen y Qwen→Nimble, casos y condiciones barajados con semilla 42. Las instrucciones se ajustaron con desarrollo y se congelaron antes de evaluación; no se modificaron al observar los resultados evaluados.

Tres condiciones: `none` sin documentos, `rag` con BM25 + bono de código y `oracle` con documentos seleccionados por el evaluador. Oracle es diagnóstico, no productivo. En ninguna condición se envían las etiquetas esperadas al modelo. Corpus de 17 documentos ficticios; solo documentos activos, vigentes y autorizados al rol mesa participan en recuperación. Se incluyen 16 solicitudes de catálogo, controles sin catálogo, códigos restringidos/retirados y un ataque en el mensaje.

El contexto aporta hasta dos fragmentos con id, archivo, versión y sección. No se utiliza embedding, base vectorial ni fine-tuning. La búsqueda léxica está favorecida por códigos exactos en una colección pequeña. Las fuentes presentadas son las recuperadas, no citas generadas ni prueba automática de sustento de cada decisión.

Nimble 9B Q4 usa `/v1/systemone`; Qwen3 1.7B Q4 usa `/api/chat` con JSON schema, temperatura 0, `think:false`, contexto 4096 y máximo 100 tokens de salida. Son modelos de tamaños y entrenamiento diferentes; esto compara configuraciones, no aísla causalmente el efecto de la arquitectura de decisión. System One no informa tiempo de carga separado; el calentamiento reduce ese efecto, pero la latencia HTTP conserva ruido de caché, planificación del equipo y otras tareas.

Los tiempos totales incluyen recuperación y llamada HTTP; no incluyen revisión humana. No se midió potencia. Los fallos técnicos se conservan en el denominador. La categoría de impacto es el modo de la distribución; `noul >= 0.5` produce el booleano comparado, no autoriza acciones.

## Entorno y modelos

- Sistema: Windows-11-10.0.26300-SP0
- Python: 3.12.14
- Ollama: 0.35.0
- `nimble:9b-q4_K_M`: 5.629 GB de archivo; cuantización Q4_K_M; digest `572f1f4c801d37171344b0520d14853a88887c249d11db3acfa6c81a34cdcfa3`.
- `qwen3:1.7b`: 1.359 GB de archivo; cuantización Q4_K_M; digest `8f68893c685c3ddff2aa3fffce2aa60a30bb2da65ca488b61fff134a4d1730e7`.

Equipo: AMD Ryzen 7 3800X 8-Core Processor; 31.9 GiB RAM; NVIDIA GeForce RTX 3050. La memoria del adaptador informada por WMI puede ser limitada: el JSON de ejecución conserva la memoria cargada y VRAM que informa Ollama. Los tiempos describen este equipo y sesión; no son un benchmark universal.

## Costos y eficiencia

Supuestos: 1000 solicitudes/mes; 80 W; 1000 COP/kWh; trabajo humano 30000 COP/h; trámite manual 120 s; revisión 20 s por salida válida; retrabajo adicional 90 s por ficha incorrecta; costos fijos iniciales 0. Una salida válida incorrecta se revisa y corrige; un fallo técnico vuelve al trámite manual. Estos tiempos humanos no están medidos.

`energía COP = W / 1000 × segundos / 3600 × COP/kWh`.

`trabajo humano s = (1 − tasa de fallo) × revisión + tasa de error válido × retrabajo + tasa de fallo × manual`.

`COP/solicitud = trabajo humano s × COP/h / 3600 + energía + costos fijos / volumen`.

No hay cobro de tokens por proveedor local. Esto no equivale a costo cero: añadir equipo, soporte, instalación, indexación y consumo inactivo en costos fijos. La interfaz permite modificar supuestos. Los escenarios no acreditan ROI ni productividad real.

## Decisión de implementación

Usar los resultados para un piloto supervisado de clasificación con Nimble y catálogo autorizado. RAG aporta definiciones nuevas, pero no reemplaza la revisión de ambigüedad, permisos, mensajes adversariales ni el criterio de aceptación del requerimiento. Ninguna salida se asigna automáticamente a un sistema externo. Antes de Saufer, probar documentos y reglas reales autorizadas, con usuarios y medición de correcciones.

La publicación muestra evidencia archivada. Para inferencia real: descargar el ZIP, tener Python y Ollama con ambos modelos, y ejecutar `python server.py`. Para repetir: `python evaluate.py` sin otras inferencias simultáneas. La explicación completa por componente está en `README.md`.

## Comparaciones anteriores

Se conservan las pruebas anteriores Tev1–Qwen y Nimble–Qwen en `reports/historical/`. Cambian dataset y rúbrica; no se combinan con esta prueba como una línea base causal.

## Fuentes oficiales

- [System One](https://docs.ollama.com/api/systemone)
- [Chat](https://docs.ollama.com/api/chat)
- [Nimble 9B Q4](https://ollama.com/library/nimble:9b-q4_K_M)
