import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import ProjectPreview from './ProjectPreview';
import { surfaces, trackedQuad, surfaceOpacity, coverQuad, projectiveMatrix, mobileFocus } from '../lib/scene-geometry';

const SceneSurfaces = forwardRef(function SceneSurfaces({ poster = 0 }, ref) {
  const root = useRef(null);
  const state = useRef({ poster, frame: null });
  const viewport = useRef([0, 0]);

  const render = () => {
    if (!root.current) return;
    const current = state.current;
    const isPoster = current.frame === null;
    const frame = isPoster ? [0,48,95,143][current.poster] : current.frame;
    const focus = viewport.current[0] <= 760 ? mobileFocus(frame) : .6;
    root.current.parentElement.style.setProperty('--scene-focus', `${focus * 100}%`);
    for (let i=0;i<surfaces.length;i++) {
      const surface = surfaces[i];
      const node = root.current.children[i];
      const alpha = isPoster ? Number(current.poster === surface.chapter) : surfaceOpacity(surface, frame);
      node.style.opacity = String(alpha * .85);
      if (!alpha) continue;
      const quad = isPoster ? surface.poster : trackedQuad(surface, frame);
      const points = coverQuad(quad, isPoster ? [1672,941] : [1280,720], viewport.current, focus);
      node.style.transform = `matrix3d(${projectiveMatrix(points, ...surface.size).join(',')})`;
    }
  };

  useImperativeHandle(ref, () => ({
    frame(index) { state.current = { poster: null, frame: index }; render(); },
    poster(index) { state.current = { poster: index, frame: null }; render(); },
  }));

  useEffect(() => {
    const parent = root.current.parentElement;
    const resize = () => { viewport.current = [parent.clientWidth, parent.clientHeight]; render(); };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    return () => observer.disconnect();
  }, []);

  return <div className="scene-surfaces" ref={root} aria-hidden="true">
    {surfaces.map(surface => <div key={surface.id} className={`scene-surface scene-surface--${surface.id}`} style={{ width:surface.size[0], height:surface.size[1] }}>
      {surface.id === 'pulso' && <div className="scene-pulso-header">✦ pulso.<small>SOPORTE CON INTENCIÓN</small></div>}
      <ProjectPreview id={surface.id} />
      {surface.id === 'pulso' && <div className="scene-pulso-footer">ORGANIZAR<br />PRIORIZAR<br />REVISAR</div>}
    </div>)}
  </div>;
});

export default SceneSurfaces;
