import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import NeuralScene from "./components/NeuralScene";
import {
  ArrowUpRight,
  Github,
  Linkedin,
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
        <section className="hero wrap" id="hero">
          <div>
            <p className="eyebrow">ANDRES SALAZAR / DESARROLLO WEB & IA</p>
            <h1>
              Software con propósito.
              <br />
              <span>IA aplicada.</span>
            </h1>
            <p className="hero-description">
              Soy Andres, ingeniero de sistemas. Desarrollo experiencias web y
              exploro cómo los modelos de lenguaje pueden resolver problemas
              reales, desde el onboarding empresarial hasta la automatización.
            </p>
            <div className="actions">
              <a className="button primary" href="#projects">
                Explorar proyectos <ArrowUpRight size={19} />
              </a>
              <a className="button secondary" href="#contact">
                Hablemos
              </a>
            </div>
            <div className="socials">
              <a
                href="https://github.com/Hion-creator"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/andres-salazar-1588b71aa/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} /> LinkedIn
              </a>
            </div>
          </div>
          <NeuralScene />
        </section>
        <div className="expertise-strip">
          <div className="wrap">
            <span>Frontend con intención</span>
            <span>Modelos de lenguaje</span>
            <span>Automatización</span>
            <span>Experiencia de usuario</span>
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
              Mi punto de partida es el desarrollo web. Mi siguiente desafío:
              integrar IA de forma útil en las herramientas que usamos cada día.
            </p>
            <div className="body-copy">
              <p>
                Soy graduado en Ingeniería de Sistemas de la Institución
                Universitaria Antonio José Camacho. He trabajado con React,
                Angular y JavaScript, colaborando en equipos ágiles y en la
                mejora de experiencias digitales.
              </p>
              <p>
                Con Lia, mi proyecto de chatbot para onboarding empresarial,
                exploro el uso de LLMs, Ollama y LangChain para acercar el
                conocimiento de una organización a sus nuevos integrantes.
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
                text: "Exploración de asistentes con modelos de lenguaje.",
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
