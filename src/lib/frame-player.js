// Load only nearby frames, bound decoded memory, and discard obsolete requests.
// Scroll input stays native; this controller never runs an idle animation loop.
export class FramePlayer {
  constructor(canvas, manifest, { onFrame, onFallback } = {}) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d', { alpha: false });
    this.manifest = manifest;
    this.onFrame = onFrame;
    this.onFallback = onFallback;
    this.cache = new Map();
    this.pending = new Map();
    this.failed = new Set();
    this.target = 0;
    this.dead = false;
    this.mobile = matchMedia('(max-width: 760px)').matches;
    this.variant = this.mobile ? manifest.mobile : manifest.desktop;
    if (!this.variant || !this.context) { this.dead = true; return; }
    canvas.width = this.variant.width;
    canvas.height = this.variant.height;
  }

  url(index) {
    return `${this.variant.path}/frame-${String(index + 1).padStart(4, '0')}.webp`;
  }

  seek(progress) {
    if (this.dead) return;
    this.target = Math.max(0, Math.min(this.manifest.frameCount - 1, Math.round(progress * (this.manifest.frameCount - 1))));
    for (const [index, controller] of this.pending) {
      if (Math.abs(index - this.target) > 5) controller.abort();
    }
    this.draw();
    this.pump();
  }

  draw() {
    let index = this.target;
    if (!this.cache.has(index) && !this.failed.has(index)) {
      // A nearby decoded frame prevents flashes during short network delays.
      const nearest = [...this.cache.keys()].sort((a, b) => Math.abs(a - index) - Math.abs(b - index))[0];
      if (nearest !== undefined && Math.abs(nearest - index) <= 3) index = nearest;
    }
    const frame = this.cache.get(index);
    if (!frame) { this.canvas.classList.remove('is-ready'); this.onFallback?.(); return; }
    this.cache.delete(index);
    this.cache.set(index, frame);
    this.context.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
    this.canvas.classList.add('is-ready');
    this.onFrame?.(index);
  }

  pump() {
    if (this.dead || this.pending.size >= 3) return;
    const desired = [0, 1, -1, 2, -2, 3, -3].map(offset => this.target + offset).filter(index => index >= 0 && index < this.manifest.frameCount);
    for (const index of desired) {
      if (this.pending.size >= 3) break;
      if (this.cache.has(index) || this.pending.has(index) || this.failed.has(index)) continue;
      const controller = new AbortController();
      this.pending.set(index, controller);
      fetch(this.url(index), { signal: controller.signal, cache: 'force-cache' })
        .then(response => {
          if (!response.ok) throw new Error(`Frame unavailable: ${response.status}`);
          return response.blob();
        })
        .then(blob => createImageBitmap(blob))
        .then(bitmap => {
          if (this.dead || Math.abs(index - this.target) > 5) { bitmap.close(); return; }
          this.cache.set(index, bitmap);
          while (this.cache.size > 12) {
            const oldest = this.cache.keys().next().value;
            this.cache.get(oldest).close();
            this.cache.delete(oldest);
          }
          this.draw();
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            this.failed.add(index);
            if (index === this.target) this.draw();
          }
        })
        .finally(() => { this.pending.delete(index); this.pump(); });
    }
  }

  destroy() {
    this.dead = true;
    for (const controller of this.pending.values()) controller.abort();
    this.pending.clear();
    for (const bitmap of this.cache.values()) bitmap.close();
    this.cache.clear();
  }
}
