import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, MoveDown, Pause, Play } from 'lucide-react';
import { FramePlayer } from '../lib/frame-player';
import SceneSurfaces from './SceneSurfaces';

const compactQuery = '(max-height: 620px), (max-width: 760px) and (max-height: 680px)';

const chapters = [
  {
    name: 'Entrada', file: 'recorrido-01-entrada', label: 'ANDRES SALAZAR / IA APLICADA',
    title: <>De los datos<br />a una <em>decisión.</em></>,
    text: 'Construyo asistentes, experiencias web y flujos de IA que conectan información con acciones útiles.',
    tags: ['Asistentes', 'RAG', 'Automatización'], href: '#projects', action: 'Explorar proyectos',
    note: 'Ingeniero de sistemas · Desarrollo web e inteligencia artificial',
  },
  {
    name: 'Lia', preview: 'lia', file: 'recorrido-02-lia', label: '01 / CONOCIMIENTO · LIA',
    title: <>Conocimiento<br />que <em>responde.</em></>,
    text: 'Un asistente de onboarding para acercar el conocimiento de una organización a las personas que empiezan.',
    tags: ['Ollama', 'Python', 'RAG'], href: '/proyectos/lia/', action: 'Explorar Lia',
    note: 'Proyecto de tesis · Demo pública con respuestas simuladas',
  },
  {
    name: 'Pulso', preview: 'pulso', file: 'recorrido-03-pulso', label: '02 / AUTOMATIZACIÓN · PULSO',
    title: <>Automatizar<br />con <em>criterio.</em></>,
    text: 'Organizar solicitudes, preparar respuestas y mantener a la persona a cargo de cada decisión.',
    tags: ['Angular', 'FastAPI', 'Ollama'], href: '/proyectos/pulso/', action: 'Probar Pulso',
    note: 'Copiloto local con IA · Demo pública con reglas y plantillas',
  },
  {
    name: 'Decision Lab', preview: 'decision-lab', file: 'recorrido-04-lab', label: '03 / EVALUACIÓN · DECISION LAB',
    title: <>Decisiones<br />con <em>evidencia.</em></>,
    text: 'Comparar modelos, revisar sus fuentes y entender qué mejora cuando una decisión tiene contexto.',
    tags: ['Nimble vs. Qwen', 'RAG', 'Evaluación local'], href: '/proyectos/decision-lab/', action: 'Explorar los resultados',
    note: '24 casos ficticios · Resultados guardados de pruebas locales',
  },
];

function readMotionPreference() {
  const system = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  try {
    const saved = localStorage.getItem('as-journey-static');
    return { system, manual: saved === 'true' };
  } catch {
    return { system, manual: false };
  }
}

export default function Journey() {
  const root = useRef(null);
  const canvas = useRef(null);
  const player = useRef(null);
  const scene = useRef(null);
  const activeRef = useRef(0);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(readMotionPreference);
  const [saveData, setSaveData] = useState(() => Boolean(navigator.connection?.saveData));
  const [compact, setCompact] = useState(() => window.matchMedia(compactQuery).matches);
  const isStatic = motion.system || motion.manual || saveData || compact;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shortScreen = window.matchMedia(compactQuery);
    const onChange = () => setMotion(previous => ({ ...previous, system: media.matches }));
    const onConnection = () => setSaveData(Boolean(navigator.connection?.saveData));
    const onSize = () => setCompact(shortScreen.matches);
    media.addEventListener('change', onChange);
    shortScreen.addEventListener('change', onSize);
    navigator.connection?.addEventListener('change', onConnection);
    return () => {
      media.removeEventListener('change', onChange);
      shortScreen.removeEventListener('change', onSize);
      navigator.connection?.removeEventListener('change', onConnection);
    };
  }, []);

  useEffect(() => {
    if (isStatic) return;
    const controller = new AbortController();
    let disposed = false;
    fetch('/media/journey/manifest.json', { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Manifest unavailable')))
      .then(manifest => {
        if (disposed || !manifest.frameCount) return;
        player.current = new FramePlayer(canvas.current, manifest, {
          onFrame: index => scene.current?.frame(index),
          onFallback: () => scene.current?.poster(activeRef.current),
        });
        player.current.seek(progress.current);
      })
      .catch(() => { /* The responsive keyframes remain visible if media cannot load. */ });
    return () => {
      disposed = true;
      controller.abort();
      player.current?.destroy();
      player.current = null;
    };
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      const rect = root.current.getBoundingClientRect();
      const range = Math.max(1, root.current.offsetHeight - window.innerHeight);
      const value = Math.max(0, Math.min(1, -rect.top / range));
      progress.current = value;
      root.current.style.setProperty('--journey-progress', value);
      const next = Math.min(3, Math.round(value * 3));
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
      player.current?.seek(value);
      if (!player.current) scene.current?.poster(next);
    };
    const schedule = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(scheduled);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [isStatic]);

  const goTo = (index) => {
    if (isStatic) {
      document.getElementById(`journey-${index}`)?.scrollIntoView({ behavior: 'auto' });
      return;
    }
    const start = root.current.getBoundingClientRect().top + window.scrollY;
    const range = root.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + range * index / 3, behavior: 'smooth' });
  };

  const toggleMotion = () => {
    const manual = !motion.manual;
    setMotion(previous => ({ ...previous, manual }));
    try { localStorage.setItem('as-journey-static', String(manual)); } catch { /* Private sessions still support the control. */ }
  };

  return (
    <section className="journey" id="hero" ref={root} data-static={isStatic} aria-label="Recorrido por mis proyectos de IA">
      <h1 className="sr-only">Andres Salazar · Desarrollo web e inteligencia artificial</h1>
      <div className="journey-stage">
        {!isStatic && <div className="journey-world" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <picture className={`journey-keyframe ${active === index ? 'is-active' : ''}`} key={chapter.file}>
              <source srcSet={`/images/journey/${chapter.file}-480.webp 480w, /images/journey/${chapter.file}-960.webp 960w, /images/journey/${chapter.file}-1440.webp 1440w`} sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" />
              <img src={`/images/journey/${chapter.file}-1440.webp`} alt="" width="1672" height="941" loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'auto'} />
            </picture>
          ))}
          {!isStatic && <canvas ref={canvas} className="journey-canvas" />}
          <SceneSurfaces ref={scene} />
        </div>}
        <div className="journey-shade" aria-hidden="true" />
        <div className="journey-topline wrap" aria-hidden="true"><span>INFORMACIÓN → CONTEXTO → ACCIÓN</span><span>PORTAFOLIO / 2026</span></div>
        <div className="journey-copy wrap">
          {chapters.map((chapter, index) => (
            <article className="journey-chapter" id={`journey-${index}`} key={chapter.file} hidden={!isStatic && active !== index} data-preview={Boolean(chapter.preview)}>
              {isStatic && <div className="journey-static-world" aria-hidden="true">
                <img className="journey-static-art" src={`/images/journey/${chapter.file}-960.webp`} alt="" width="960" height="540" loading={index === 0 ? 'eager' : 'lazy'} />
                <SceneSurfaces poster={index} />
              </div>}
              <div className="journey-chapter-body">
                <p className="eyebrow journey-eyebrow"><span className="signal-dot" aria-hidden="true" />{chapter.label}</p>
                <h2>{chapter.title}</h2>
                <p className="journey-description">{chapter.text}</p>
                <ul className="journey-tags" aria-label="Enfoque y herramientas">{chapter.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                <div className="actions">
                  <a className="button primary" href={chapter.href}>{chapter.action}<ArrowUpRight size={18} /></a>
                  {index === 0 && <a className="journey-github" href="https://github.com/Hion-creator" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub</a>}
                </div>
                <p className="journey-note">{chapter.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="journey-bottom wrap">
          <div className="journey-chapters" role="group" aria-label="Elegir tramo del recorrido">
            {chapters.map((chapter, index) => <button key={chapter.name} onClick={() => goTo(index)} aria-label={`Ir al tramo: ${chapter.name}`} aria-current={!isStatic && active === index ? 'step' : undefined}><span className="chapter-number">0{index + 1}</span><span>{chapter.name}</span><span className="chapter-line" aria-hidden="true" /></button>)}
          </div>
          <div className="journey-controls">
            <span className="scroll-cue"><MoveDown size={15} />Desliza para explorar</span>
            <button className="motion-toggle" onClick={toggleMotion} aria-pressed={isStatic} disabled={motion.system || saveData || compact} aria-label="Vista sin movimiento">{isStatic ? <Play size={14} /> : <Pause size={14} />}<span>{isStatic ? 'Vista estática' : 'Reducir movimiento'}</span></button>
            <a href="#projects" className="journey-skip">Ver todos los proyectos <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="journey-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
