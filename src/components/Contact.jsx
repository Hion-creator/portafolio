import { useState } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
const email = "andres.gaviria.salazar@gmail.com";
export default function Contact() {
  const [status, setStatus] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Se solicitó abrir tu aplicación de correo. Revisa y envía el mensaje allí. Si no se abre, copia mi dirección y escríbeme directamente.",
    );
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Dirección de correo copiada.");
    } catch {
      setStatus(`No se pudo copiar. Selecciona la dirección: ${email}`);
    }
  };
  return (
    <section className="contact-section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">05 / CONECTEMOS</p>
          <h2>
            El siguiente proyecto
            <br />
            empieza con una
            <br />
            <span>conversación.</span>
          </h2>
          <p>
            ¿Buscas un perfil que conecte desarrollo web e inteligencia
            artificial? Hablemos de tu equipo o de una idea para construir
            juntos.
          </p>
          <a className="email-link" href={`mailto:${email}`}>
            <Mail size={18} />
            {email}
          </a>
          <button className="copy-button" onClick={copy}>
            <Copy size={16} /> Copiar correo
          </button>
          <a className="phone-link" href="tel:+573168811908">
            +57 316 881 1908
          </a>
          <p className="contact-status" role="status">
            {status}
          </p>
        </div>
        <form onSubmit={submit}>
          <h3>Cuéntame qué tienes en mente.</h3>
          <div className="form-row">
            <label>
              Nombre
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Tu nombre"
              />
            </label>
            <label>
              Correo
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                placeholder="nombre@empresa.com"
              />
            </label>
          </div>
          <label>
            Asunto
            <input
              name="subject"
              required
              maxLength={160}
              placeholder="Una oportunidad, una idea…"
            />
          </label>
          <label>
            Mensaje
            <textarea
              name="message"
              required
              rows={4}
              maxLength={2000}
              placeholder="Me gustaría conversar sobre…"
            />
          </label>
          <button className="button primary" type="submit">
            Preparar correo <ArrowUpRight size={18} />
          </button>
          <p className="form-note">
            Se abrirá tu aplicación de correo para revisar y enviar el mensaje.
            Este formulario no realiza envíos automáticos.
          </p>
        </form>
      </div>
    </section>
  );
}
