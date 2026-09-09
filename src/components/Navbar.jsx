import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="wrap navigation" aria-label="Navegación principal">
        <a
          className="brand"
          href="#hero"
          aria-label="Andres Salazar, inicio"
          onClick={() => setOpen(false)}
        >
          as<span>.</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="navigation-links"
        >
          {open ? <X /> : <Menu />}
        </button>
        <div
          id="navigation-links"
          className={`nav-links ${open ? "is-open" : ""}`}
        >
          {[
            ["Proyectos", "projects"],
            ["Sobre mí", "about"],
            ["Tecnologías", "tech"],
            ["Experiencia", "experience"],
            ["Contacto", "contact"],
          ].map(([title, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {title}
              {id === "contact" && <ArrowUpRight size={16} />}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
