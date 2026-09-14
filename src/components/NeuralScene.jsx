import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";

// A deterministic sphere keeps the scene stable across resizes and devices.
function createNetwork(count) {
  const nodes = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });
  const links = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const a = nodes[i],
        b = nodes[j];
      if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.44)
        links.push([i, j]);
    }
  }
  return { nodes, links };
}

export default function NeuralScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const phaseRef = useRef(0.45);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !scene) {
      setAvailable(false);
      return;
    }
    // Read the media query synchronously so the first frame is also motion-safe.
    const motionAllowed =
      !paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0,
      height = 0,
      phase = phaseRef.current,
      frame = 0,
      last = 0;
    let visible = true,
      destroyed = false;
    let targetX = 0,
      targetY = 0,
      tiltX = 0,
      tiltY = 0;
    let network = createNetwork(140);

    function draw(delta = 0) {
      if (!width || !height) return;
      phase += delta * 0.00014;
      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width * 0.37, height * 0.4);
      const centerX = width / 2,
        centerY = height / 2;
      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 1.4,
      );
      glow.addColorStop(0, "rgba(130,195,90,0.11)");
      glow.addColorStop(1, "rgba(130,195,90,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      const yaw = phase + tiltX * 0.35,
        pitch = -0.18 + tiltY * 0.25;
      const projected = network.nodes.map((node) => {
        const x = node.x * Math.cos(yaw) + node.z * Math.sin(yaw);
        const z = -node.x * Math.sin(yaw) + node.z * Math.cos(yaw);
        const y = node.y * Math.cos(pitch) - z * Math.sin(pitch);
        const depth = node.y * Math.sin(pitch) + z * Math.cos(pitch);
        const perspective = 2.8 / (2.8 - depth * 0.35);
        return {
          x: centerX + x * radius * perspective,
          y: centerY + y * radius * perspective,
          depth,
        };
      });
      for (const [i, j] of network.links) {
        const a = projected[i],
          b = projected[j];
        const front = (a.depth + b.depth + 2) / 4;
        ctx.strokeStyle = `rgba(180,225,151,${0.06 + front * 0.27})`;
        ctx.lineWidth = front > 0.7 ? 0.85 : 0.55;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // Sparse travelling impulses illustrate information moving through a network.
        if ((i * 7 + j) % 13 === 0 && front > 0.4) {
          const t = (phase * 1.8 + i * 0.17) % 1;
          ctx.fillStyle = `rgba(197,253,219,${front * 0.9})`;
          ctx.beginPath();
          ctx.arc(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            1.8,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach((node) => {
          const front = (node.depth + 1) / 2;
          ctx.fillStyle = `rgba(206,247,171,${0.25 + front * 0.75})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1 + front * 1.8, 0, Math.PI * 2);
          ctx.fill();
          if (front > 0.88) {
            ctx.fillStyle = "rgba(204,243,129,0.09)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
            ctx.fill();
          }
        });
    }
    function animate(now) {
      frame = 0;
      if (destroyed || !visible || document.hidden || !motionAllowed) return;
      if (!last || now - last >= 1000 / 30) {
        draw(last ? Math.min(now - last, 70) : 0);
        last = now;
      }
      frame = requestAnimationFrame(animate);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (motionAllowed && visible && !document.hidden)
        frame = requestAnimationFrame(animate);
      else if (visible && !document.hidden) draw();
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      network = createNetwork(width < 380 ? 100 : 140);
      draw();
      sync();
    });
    resize.observe(scene);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(scene);
    const pointer = (event) => {
      if (!motionAllowed || event.pointerType === "touch") return;
      const rect = scene.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
    };
    scene.addEventListener("pointermove", pointer, { passive: true });
    scene.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    return () => {
      phaseRef.current = phase;
      destroyed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      scene.removeEventListener("pointermove", pointer);
      scene.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused, reducedMotion]);

  return (
    <figure
      className="hero-art neural-card"
      aria-label="Visualización conceptual de una red neuronal: partículas conectadas y pulsos de información"
    >
      <div className="art-top">
        <span>RED NEURONAL / IA APLICADA</span>
        <span className="neural-index">01 — AS</span>
      </div>
      <div className="neural-stage" ref={sceneRef}>
        <div className="neural-cross cross-top" aria-hidden="true">
          +
        </div>
        <canvas ref={canvasRef} aria-hidden="true" />
        {!available && (
          <div className="neural-fallback" aria-hidden="true">
            <span>IA</span>
          </div>
        )}
        <div className="neural-caption" aria-hidden="true">
          <span>DATOS</span>
          <span>CONEXIONES</span>
          <span>POSIBILIDADES</span>
        </div>
      </div>
      <div className="neural-toolbar">
        <span>
          {reducedMotion
            ? "Vista estática · movimiento reducido"
            : "Visualización conceptual"}
        </span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          disabled={reducedMotion || !available}
          aria-label={
            paused
              ? "Reanudar animación de la red neuronal"
              : "Pausar animación de la red neuronal"
          }
        >
          {paused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}{" "}
          {paused || reducedMotion ? "Reanudar" : "Pausar"}
        </button>
      </div>
      <figcaption className="art-bottom">
        <div>
          <small>EXPLORANDO EL POTENCIAL DE LA IA</small>
          <strong>Conectar ideas. Crear soluciones.</strong>
        </div>
        <a href="#projects" aria-label="Explorar proyectos">
          <ArrowUpRight />
        </a>
      </figcaption>
    </figure>
  );
}
