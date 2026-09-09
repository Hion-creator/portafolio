import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  FileText,
  BrainCircuit,
  Monitor,
} from "lucide-react";
export default function Projects() {
  const [filter, setFilter] = useState("all");
  return (
    <section className="section wrap" id="projects">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">01 / PROYECTOS SELECCIONADOS</p>
          <h2>Ideas llevadas al código.</h2>
        </div>
        <div className="filters" role="group" aria-label="Filtrar proyectos">
          {[
            ["all", "Todos"],
            ["ia", "IA aplicada"],
            ["frontend", "Frontend"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        {filter === "all" ? "2 proyectos" : "1 proyecto"}
      </p>
      <div className="project-grid">
        {filter !== "frontend" && (
          <article className="project-card" id="lia">
            <div className="project-visual lia-visual">
              <div className="visual-caption">
                <BrainCircuit size={18} />
                <span>LIA / ASISTENTE DE ONBOARDING</span>
              </div>
              <div
                className="flow-diagram"
                aria-label="Concepto de Lia: conocimiento empresarial, contexto y asistente"
              >
                <span>
                  Conocimiento
                  <br />
                  empresarial
                </span>
                <b aria-hidden="true">→</b>
                <span>Contexto</span>
                <b aria-hidden="true">→</b>
                <strong>Lia</strong>
              </div>
              <small>IA GENERATIVA · MODELOS LOCALES</small>
            </div>
            <div className="project-content">
              <p className="eyebrow">
                INTELIGENCIA ARTIFICIAL / PROYECTO DE TESIS
              </p>
              <h3>Lia. Un inicio con respuestas.</h3>
              <p>
                Un chatbot que explora cómo facilitar la incorporación de nuevos
                empleados a través de los conocimientos de la empresa y modelos
                de lenguaje.
              </p>
              <div className="tags">
                {["Python", "Ollama", "LangChain", "React", "RAG"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <details>
                <summary>Enfoque del proyecto</summary>
                <p>
                  <strong>Problema:</strong> acceder a la información necesaria
                  al incorporarse a una organización.
                </p>
                <p>
                  <strong>Propuesta:</strong> una interfaz conversacional con IA
                  generativa y modelos locales, orientada al onboarding
                  empresarial.
                </p>
                <p>
                  <strong>Mi rol:</strong> liderazgo del desarrollo. La
                  presentación describe el proyecto; no es una demo interactiva.
                </p>
              </details>
              <div className="project-links">
                <a
                  href="https://hion-creator.github.io/presentacion-chatbot/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={17} /> Ver presentación{" "}
                  <ArrowUpRight size={17} />
                </a>
                <span className="muted">Código privado</span>
              </div>
            </div>
          </article>
        )}
        {filter !== "ia" && (
          <article className="project-card">
            <div className="project-visual sunthers-visual">
              <div className="visual-caption">
                <Monitor size={18} />
                <span>SUNTHERS / COMUNIDAD GAMING</span>
              </div>
              <div className="sunthers-mark" aria-hidden="true">
                S<span>/</span>
              </div>
              <small>COMUNIDAD · EXPERIENCIA WEB</small>
            </div>
            <div className="project-content">
              <p className="eyebrow">FRONTEND / SITIO WEB</p>
              <h3>Sunthers. Una identidad compartida.</h3>
              <p>
                Sitio web para un gremio de videojuegos. Una experiencia
                responsive que reúne información de la comunidad, sus miembros y
                actividades.
              </p>
              <div className="tags">
                {["React", "JavaScript", "CSS", "Responsive"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <details>
                <summary>Enfoque del proyecto</summary>
                <p>
                  <strong>Objetivo:</strong> dar a la comunidad un espacio
                  propio en la web.
                </p>
                <p>
                  <strong>Implementación:</strong> desarrollo frontend y
                  adaptación de la interfaz a distintos tamaños de pantalla. El
                  código está disponible en WebWarbone 0.1.
                </p>
              </details>
              <div className="project-links">
                <a
                  href="https://sunthers.games/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar sitio <ArrowUpRight size={17} />
                </a>
                <a
                  href="https://github.com/Hion-creator/webwarbone0.1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> Código
                </a>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
