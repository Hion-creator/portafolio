# Pulso — Soporte con intención

Proyecto de portafolio de Andrés Salazar: un panel de atención al cliente con Angular 21, Tailwind CSS 4 y un copiloto opcional con Python + Ollama.

## Qué demuestra

- Angular standalone, Signals/computed, inyección de dependencias, rutas diferidas y formularios reactivos.
- Diseño adaptable con Tailwind, estados de carga/error/vacío y navegación por teclado.
- Creación, búsqueda y filtrado de tickets; métricas derivadas y borradores persistidos en localStorage.
- Integración HTTP, respuestas estructuradas validadas en Python y revisión humana de sugerencias.
- Pruebas de API y recorridos completos en navegador.

La demo incluye datos ficticios. **Demo simulada** utiliza reglas y plantillas, no un modelo. **Ollama local** consulta un modelo a través de FastAPI. No se envían mensajes a personas ni se realizan acciones externas.

## Inicio rápido

Requisitos: Node 24 y npm. Desde esta carpeta:

```sh
npm ci
npm start
```

Abre http://127.0.0.1:4200. El modo Demo funciona sin Python ni Ollama.

```sh
npm run build
```

La compilación queda en `dist/pulso-desk`. Se usa el builder oficial de Angular basado en Webpack por compatibilidad con este entorno Windows. Tailwind se compila con su CLI en `prestart` y `prebuild`; `src/styles.generated.css` no debe editarse. Si cambias estilos con el servidor abierto, ejecuta `npm run styles`.

## Conectar Ollama

Instala Ollama y descarga un modelo:

```sh
ollama pull gemma3:4b
```

Con Ollama ejecutándose, abre otra terminal:

```sh
cd backend
python -m venv .venv
```

Activa el entorno (`.venv\Scripts\Activate.ps1` en PowerShell o `source .venv/bin/activate` en macOS/Linux):

```sh
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8001
```

Selecciona **Ollama local** en el copiloto. El servidor Angular redirige `/api` a `127.0.0.1:8001`. Variables opcionales del backend: `OLLAMA_HOST` y `OLLAMA_MODEL`; sus valores predeterminados son `http://127.0.0.1:11434` y `gemma3:4b`. Se configuran en el entorno de la terminal; no se carga `.env` automáticamente.

El modelo resume, propone categoría/prioridad y redacta una respuesta. **Aplicar clasificación** modifica el ticket; **Guardar borrador** conserva el texto en el navegador. Las sugerencias pueden equivocarse: revísalas antes de reutilizarlas.

## Pruebas

```sh
npm run styles
npm run test:e2e
```

En Windows las pruebas utilizan Edge. En macOS/Linux instala Chromium con `npx playwright install chromium`. El servidor de pruebas se inicia automáticamente.

Desde `backend`:

```sh
python -m pytest -q
```

Las pruebas de IA simulan Ollama para comprobar el contrato, validación y errores; no miden la calidad de un modelo real. Ollama real sigue pendiente de validación en un equipo con el modelo instalado.

## Estructura

- `src/app/store.ts`: estado y persistencia de tickets.
- `src/app/inbox.*`: bandeja, formulario y copiloto.
- `src/app/overview.ts`: métricas derivadas de los tickets.
- `src/app/ai.ts`: modos demo y HTTP.
- `backend/main.py`: API y validación de respuestas.
- `tests/workflow.spec.ts`: recorridos en navegador.

## Límites de esta versión

Es una demo local: no hay autenticación, usuarios múltiples, base de datos ni correo real. Usar datos ficticios. El almacenamiento pertenece al navegador y se puede borrar. Para una versión multiusuario hacen falta autenticación, persistencia por organización, límites de solicitudes y un proxy seguro hacia el backend. No exponer Ollama directamente. El hosting debe redirigir las rutas de la SPA a `index.html` y `/api` al backend.

Para presentarlo: crea un ticket ficticio, analízalo en Demo, revisa el borrador, aplica la clasificación, resuélvelo y muestra el cambio en Panorama. Explica qué parte es simulada y activa Ollama cuando tengas el modelo disponible.

Referencias: [Angular](https://angular.dev), [Tailwind](https://tailwindcss.com/docs/installation/framework-guides/angular), [Ollama](https://docs.ollama.com/api/chat).

## Demo en el portafolio
Compila con `ng build --base-href /proyectos/pulso/`. En esa ruta la aplicación utiliza navegación con hash para permitir recargas en GitHub Pages. La demo publicada solo ofrece el motor simulado; el selector de Ollama se habilita en localhost.

