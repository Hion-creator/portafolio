import { useState } from "react";
import { ArrowUpRight, Github, FileText, Monitor } from "lucide-react";

const projects = [
  {
    id: "decision-lab",
    categories: ["ia"],
    meta: "IA LOCAL / EXPERIMENTO REPRODUCIBLE",
    title: "Decision Lab. IA con evidencia.",
    summary: "Comparación de Nimble y Qwen al clasificar requerimientos, con y sin documentos recuperados. Explora respuestas reales, fuentes, errores, tiempos locales y escenarios de costos.",
    image: "/images/journey/recorrido-04-lab-960.webp",
    imageAlt: "Arquitectura de cristal con dos estructuras de comparación y un núcleo de luz ámbar",
    imageWidth: 960,
    imageHeight: 540,
    previewLabel: "Explorar las pruebas reales de Decision Lab",
    demo: "/proyectos/decision-lab/",
    tags: ["Python", "Ollama", "System One", "RAG", "Evaluación"],
    footnote: "Resultados de inferencias locales guardadas. El navegador no ejecuta un modelo.",
    detailsTitle: "Qué demuestra este proyecto",
    details: [
      ["Mi rol", "diseño del experimento, construcción del flujo y revisión de resultados con asistencia de IA."],
      ["Prueba", "24 casos ficticios, dos repeticiones y tres condiciones por modelo: sin contexto, RAG y fuente correcta como diagnóstico. Permisos, vigencia y contrato de salida se validan en el backend."],
      ["Publicación", "resultados guardados de inferencias locales; no ejecuta un modelo en el navegador. El código permite reproducir las pruebas con Ollama. Los costos humanos y eléctricos son supuestos ajustables."],
    ],
    links: [
      { label: "Explorar evidencia", href: "/proyectos/decision-lab/" },
      { label: "Código", href: "https://github.com/Hion-creator/portafolio/tree/main/projects/decision-lab", icon: Github, external: true },
    ],
  },
  {
    id: "lia",
    categories: ["ia"],
    meta: "INTELIGENCIA ARTIFICIAL / PROYECTO DE TESIS",
    title: "Lia. Un inicio con respuestas.",
    summary: "Un chatbot que explora cómo facilitar la incorporación de nuevos empleados a través de los conocimientos de la empresa y modelos de lenguaje.",
    image: "/images/journey/recorrido-02-lia-960.webp",
    imageAlt: "Biblioteca de conocimiento de cristal conectada a un núcleo de luz ámbar",
    imageWidth: 960,
    imageHeight: 540,
    previewLabel: "Abrir la demo de Lia",
    demo: "/proyectos/lia/",
    tags: ["Python", "Ollama", "FastAPI", "React", "RAG"],
    footnote: "Demo pública con datos ficticios y respuestas simuladas. Sistema con modelos locales en repositorio privado.",
    detailsTitle: "Enfoque del proyecto",
    details: [
      ["Problema", "acceder a la información necesaria al incorporarse a una organización."],
      ["Propuesta", "una interfaz conversacional con IA generativa y modelos locales, orientada al onboarding empresarial."],
      ["Mi rol", "liderazgo del desarrollo. La demo pública permite explorar preguntas, fuentes y el recorrido de bienvenida con datos ficticios y respuestas simuladas. El sistema con modelos locales permanece en el repositorio privado."],
    ],
    links: [
      { label: "Probar demo", href: "/proyectos/lia/" },
      { label: "Ver presentación", href: "https://hion-creator.github.io/presentacion-chatbot/", icon: FileText, external: true },
    ],
    privateCode: true,
  },
  {
    id: "pulso",
    categories: ["ia", "frontend"],
    meta: "ANGULAR / TAILWIND / ASISTENCIA CON IA",
    title: "Pulso. Soporte con intención.",
    summary: "Un panel de atención al cliente para organizar tickets, priorizar solicitudes y preparar respuestas con ayuda de un copiloto. Cada sugerencia queda en manos de la persona.",
    image: "/images/pulso-desktop.png",
    imageAlt: "Pulso: bandeja de soporte con tickets y copiloto",
    imageWidth: 1440,
    imageHeight: 1220,
    previewLabel: "Abrir la demo de Pulso",
    demo: "/proyectos/pulso/",
    tags: ["Angular", "Tailwind CSS", "TypeScript", "Python", "Ollama"],
    footnote: "La demo pública utiliza reglas y plantillas. La integración con Ollama se ejecuta de forma local.",
    detailsTitle: "Qué demuestra este proyecto",
    details: [
      ["Frontend", "Signals, rutas diferidas, formularios reactivos y una interfaz adaptable. Tickets, filtros, métricas y borradores persistidos en el navegador."],
      ["IA", "integración local con Ollama a través de FastAPI, con respuestas estructuradas y revisión humana. La demo pública utiliza reglas y plantillas; no ejecuta un modelo de IA."],
      ["Validación", "pruebas de API y recorridos en navegador. Los datos son ficticios y no se envían mensajes a clientes."],
    ],
    links: [
      { label: "Probar demo", href: "/proyectos/pulso/" },
      { label: "Código", href: "https://github.com/Hion-creator/portafolio/tree/main/projects/pulso", icon: Github, external: true },
    ],
  },
  {
    id: "espacioclip",
    categories: ["ia"],
    meta: "IA LOCAL / VIDEO / V1 EN DESARROLLO",
    title: "EspacioClip Studio. Del directo al clip.",
    summary: "Un editor local para convertir momentos de streams en clips verticales: juego y cámara separados, títulos configurables, subtítulos editables y revisión de intervalos con pitidos.",
    image: "/proyectos/espacioclip/portada.jpg",
    imageAlt: "EspacioClip Studio: del directo al clip",
    imageWidth: 1920,
    imageHeight: 1080,
    previewLabel: "Ver el video de EspacioClip Studio",
    demo: "/proyectos/espacioclip/",
    tags: ["Python", "FastAPI", "Whisper", "FFmpeg", "Ollama"],
    footnote: "Presentación de 32 segundos con capturas reales. Procesamiento local y código privado.",
    detailsTitle: "Enfoque y estado del proyecto",
    details: [
      ["Mi rol", "definición del producto, diseño del flujo y desarrollo iterativo con asistencia de IA."],
      ["Estado", "primera versión funcional para Windows. En evolución: precisión de subtítulos, instalación y pruebas con más creadores."],
      ["Presentación", "recorrido visual de 32 segundos con capturas reales. El procesamiento y el código del producto permanecen privados."],
    ],
    links: [{ label: "Ver video", href: "/proyectos/espacioclip/" }],
    privateCode: true,
  },
  {
    id: "sunthers",
    categories: ["frontend"],
    meta: "FRONTEND / SITIO WEB",
    title: "Sunthers. Una identidad compartida.",
    summary: "Sitio web para un gremio de videojuegos. Una experiencia responsive que reúne información de la comunidad, sus miembros y actividades.",
    tags: ["React", "JavaScript", "CSS", "Responsive"],
    footnote: "Desarrollo frontend adaptable. Código disponible en WebWarbone 0.1.",
    detailsTitle: "Enfoque del proyecto",
    details: [
      ["Objetivo", "dar a la comunidad un espacio propio en la web."],
      ["Implementación", "desarrollo frontend y adaptación de la interfaz a distintos tamaños de pantalla. El código está disponible en WebWarbone 0.1."],
    ],
    links: [
      { label: "Visitar sitio", href: "https://sunthers.games/", external: true },
      { label: "Código", href: "https://github.com/Hion-creator/webwarbone0.1", icon: Github, external: true },
    ],
  },
];

const filters = [
  { id: "ia", label: "IA aplicada" },
  { id: "all", label: "Todos" },
  { id: "frontend", label: "Frontend" },
];

function belongsToFilter(project, filter) {
  return filter === "all" || project.categories.includes(filter);
}

export default function Projects() {
  const [filter, setFilter] = useState("ia");
  const visibleProjects = projects.filter((project) => belongsToFilter(project, filter));

  return (
    <section className="section wrap" id="projects">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">01 / IA APLICADA EN PROYECTOS</p>
          <h2>De la idea a la evidencia.</h2>
        </div>
        <div className="filters" role="group" aria-label="Filtrar proyectos">
          {filters.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {label} <span className="filter-count">{projects.filter((project) => belongsToFilter(project, id)).length}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {visibleProjects.length} proyectos: {filters.find(({ id }) => id === filter).label}.
      </p>
      <div className="project-work-list">
        {visibleProjects.map((project) => (
          <article className="project-work-card" id={project.id} key={project.id} aria-labelledby={project.id + "-title"}>
            {project.image ? (
              <a className="project-work-cover" href={project.demo} aria-label={project.previewLabel}>
                <img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
              </a>
            ) : (
              <div className="project-work-cover sunthers-visual">
                <div className="visual-caption"><Monitor size={18} aria-hidden="true" /><span>SUNTHERS / COMUNIDAD GAMING</span></div>
                <div className="sunthers-mark" aria-hidden="true">S<span>/</span></div>
                <small>COMUNIDAD · EXPERIENCIA WEB</small>
              </div>
            )}
            <div className="project-work-content">
              <p className="project-work-meta eyebrow">{project.meta}</p>
              <h3 className="project-work-title" id={project.id + "-title"}>{project.title}</h3>
              <p className="project-work-summary">{project.summary}</p>
              <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <p className="project-work-footnote">{project.footnote}</p>
              <details>
                <summary>{project.detailsTitle}</summary>
                {project.details.map(([label, text]) => <p key={label}><strong>{label}:</strong> {text}</p>)}
              </details>
              <div className="project-links">
                {project.links.map(({ label, href, icon: Icon, external }) => (
                  <a key={href} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {Icon ? <Icon size={17} aria-hidden="true" /> : null}{label}{Icon === Github ? null : <ArrowUpRight size={17} aria-hidden="true" />}
                  </a>
                ))}
                {project.privateCode ? <span className="muted">Código privado</span> : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
