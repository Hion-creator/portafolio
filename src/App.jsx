import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Journey from "./components/Journey";
import {
  ArrowUpRight,
  Cpu,
  Code2,
  Workflow,
} from "lucide-react";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Journey />
        <div className="expertise-strip">
          <div className="wrap">
            <span><span className="signal-dot" aria-hidden="true" /> IA aplicada a problemas reales</span>
            <span>Asistentes con contexto</span>
            <span>Automatización con revisión</span>
            <span>Evaluación con evidencia</span>
          </div>
        </div>
        <Projects />
        <section className="section wrap" id="about">
          <div className="section-heading">
            <p className="eyebrow">02 / PERFIL</p>
            <h2>
              De la interfaz
              <br />a la inteligencia.
            </h2>
          </div>
          <div className="about-layout">
            <p className="large-copy">
              Una interfaz clara. Un modelo con contexto. Una decisión que se
              puede revisar. Así conecto desarrollo web e inteligencia artificial.
            </p>
            <div className="body-copy">
              <p>
                Soy graduado en Ingeniería de Sistemas de la Institución
                Universitaria Antonio José Camacho. He trabajado con React,
                Angular y JavaScript, colaborando en equipos ágiles y en la
                mejora de experiencias digitales.
              </p>
              <p>
                Con Lia exploro el onboarding empresarial; con Pulso, la
                asistencia a equipos de soporte; y con Decision Lab comparo
                modelos locales y recuperación de documentos. Muestro el código,
                los límites y la evidencia disponible de cada proyecto.
              </p>
              <a className="text-link" href="#experience">
                Ver trayectoria <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="section wrap" id="tech">
          <div className="section-heading">
            <p className="eyebrow">03 / TECNOLOGÍAS</p>
            <h2>Herramientas para construir.</h2>
          </div>
          <div className="skill-grid">
            {[
              {
                icon: Code2,
                title: "Experiencias web",
                text: "Interfaces y componentes para productos digitales.",
                tags: [
                  "React",
                  "Angular",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                ],
              },
              {
                icon: Cpu,
                title: "Inteligencia artificial",
                text: "Asistentes, recuperación de documentos y evaluación de modelos locales.",
                tags: ["Python", "Ollama", "LangChain", "RAG", "FastAPI"],
              },
              {
                icon: Workflow,
                title: "Desarrollo y colaboración",
                text: "Servicios, control de versiones y trabajo en equipo.",
                tags: ["Node.js", "Git", "Docker", "Scrum"],
              },
            ].map(({ icon: Icon, title, text, tags }) => (
              <article className="skill" key={title}>
                <Icon size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section wrap" id="experience">
          <div className="section-heading">
            <p className="eyebrow">04 / TRAYECTORIA</p>
            <h2>Experiencia que se construye.</h2>
          </div>
          <div className="timeline">
            <article>
              <p className="date">EXPERIENCIA ANTERIOR</p>
              <div>
                <h3>
                  Ingeniero de Sistemas · Prácticas <span>EMCALI EICE ESP</span>
                </h3>
                <p>
                  Desarrollo de software y sistemas empresariales. Colaboración
                  en soluciones con JavaScript y mejora de procesos digitales.
                </p>
              </div>
            </article>
            <article>
              <p className="date">JUN 2023 — MAY 2025</p>
              <div>
                <h3>
                  Desarrollador Web Jr <span>Rocketfy</span>
                </h3>
                <p>
                  Desarrollo frontend con React, Angular, HTML, CSS y
                  JavaScript. Trabajo remoto en equipos ágiles, con foco en
                  experiencia de usuario y calidad del código.
                </p>
              </div>
            </article>
            <article>
              <p className="date">DIC 2022 — JUN 2023</p>
              <div>
                <h3>
                  Desarrollador Web · Prácticas <span>Rocketfy</span>
                </h3>
                <p>
                  Desarrollo de interfaces y colaboración en proyectos web con
                  JavaScript y React.
                </p>
              </div>
            </article>
            <article>
              <p className="date">FORMACIÓN / GRADUADO</p>
              <div>
                <h3>
                  Ingeniería de Sistemas{" "}
                  <span>Institución Universitaria Antonio José Camacho</span>
                </h3>
                <p>
                  Proyecto de tesis: Lia, chatbot para onboarding empresarial
                  con modelos de lenguaje e IA generativa.
                </p>
              </div>
            </article>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="wrap">
        <a className="brand" href="#hero">
          as<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Andres Salazar</span>
        <a href="#hero">Volver al inicio ↑</a>
      </footer>
    </>
  );
}
