import { FileText } from 'lucide-react';

// The same original cover appears in the project list and its journey stop.
export default function ProjectPreview({ id, className = '' }) {
  return <div className={`project-preview project-preview--${id} ${className}`}>
    {id === 'lia' && <>
      <div className="lia-mini-header"><span>✦ lia.</span><small>DEMO INTERACTIVA</small></div>
      <div className="lia-mini-question">¿Qué hago en mi primer día?</div>
      <div className="lia-mini-answer"><span>✦</span><div>Un nuevo comienzo, con contexto.<br /><small>Conoce al equipo y prepara tus accesos.</small></div></div>
      <div className="lia-mini-source"><FileText size={14} aria-hidden="true" /> Manual de bienvenida <span>Pág. 1 ↗</span></div>
    </>}
    {id === 'decision-lab' && <>
      <span>DECISION LAB / OLLAMA LOCAL</span>
      <strong>Decidir mejor.<br />Con contexto.</strong>
      <div><span>Nimble</span><span>↔</span><span>Qwen</span></div>
      <small>RAG · CALIDAD · TIEMPOS · COSTOS</small>
    </>}
    {id === 'pulso' && <img src="/images/pulso-desktop.png" alt="Pulso: bandeja de soporte con tickets y copiloto" width="1440" height="1220" loading="lazy" decoding="async" />}
  </div>;
}
