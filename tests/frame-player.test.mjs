import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/lib/frame-player.js', import.meta.url), 'utf8');
const { FramePlayer } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const settle = async () => { for (let i = 0; i < 8; i++) await new Promise(resolve => setImmediate(resolve)); };
const manifest = { frameCount: 100, desktop: { path: '/frames', width: 1280, height: 720 } };

function fixture(t, fail = () => false) {
  const originals = { fetch: globalThis.fetch, createImageBitmap: globalThis.createImageBitmap, matchMedia: globalThis.matchMedia };
  const bitmaps = [];
  const classes = new Set();
  const draws = [];
  globalThis.matchMedia = () => ({ matches: false });
  globalThis.fetch = async (url) => ({ ok: !fail(url), status: fail(url) ? 404 : 200, blob: async () => url });
  globalThis.createImageBitmap = async (url) => {
    const image = { url, closed: false, close() { this.closed = true; } };
    bitmaps.push(image);
    return image;
  };
  t.after(() => Object.assign(globalThis, originals));
  const canvas = { width: 0, height: 0, getContext: () => ({ drawImage: bitmap => draws.push(bitmap.url) }), classList: { add: c => classes.add(c), remove: c => classes.delete(c) } };
  return { canvas, classes, bitmaps, draws };
}

test('Decoded frame memory stays bounded and destroy closes all retained bitmaps', async t => {
  const f = fixture(t);
  const player = new FramePlayer(f.canvas, manifest);
  for (const progress of [0, .2, .4, .6, .8, 1]) {
    player.seek(progress);
    await settle();
    assert.ok(player.cache.size <= 12);
    assert.ok(f.bitmaps.filter(bitmap => !bitmap.closed).length <= 12);
  }
  player.destroy();
  assert.equal(player.cache.size, 0);
  assert.ok(f.bitmaps.every(bitmap => bitmap.closed));
});

test('A failed target reveals keyframe fallback instead of covering it with a stale canvas', async t => {
  const f = fixture(t, url => url.endsWith('frame-0100.webp'));
  const player = new FramePlayer(f.canvas, manifest);
  t.after(() => player.destroy());
  player.seek(0);
  await settle();
  assert.ok(f.classes.has('is-ready'));
  player.seek(1);
  await settle();
  assert.ok(player.failed.has(99));
  assert.equal(f.classes.has('is-ready'), false, 'Canvas must hide when the current target is unavailable');
});

test('Short network delays keep a nearby frame visible, large jumps reveal the chapter poster', async t => {
  const f = fixture(t);
  const player = new FramePlayer(f.canvas, manifest);
  t.after(() => player.destroy());
  player.seek(0);
  await settle();
  globalThis.fetch = () => new Promise(() => {});
  player.seek(6 / 99);
  assert.ok(f.classes.has('is-ready'));
  assert.equal(f.draws.at(-1), '/frames/frame-0004.webp');
  assert.equal(player.cache.has(6), false, 'Nearby frames retain their real index');
  player.seek(1);
  assert.equal(f.classes.has('is-ready'), false);
});

test('Bitmaps that finish decoding after destroy are closed, never drawn or retained', async t => {
  const f = fixture(t);
  const unresolved = [];
  globalThis.createImageBitmap = url => new Promise(resolve => unresolved.push({ url, resolve }));
  const player = new FramePlayer(f.canvas, manifest);
  player.seek(0);
  await settle();
  player.destroy();
  const late = unresolved.map(({ url, resolve }) => {
    const bitmap = { url, closed: false, close() { this.closed = true; } };
    resolve(bitmap);
    return bitmap;
  });
  await settle();
  assert.ok(late.every(bitmap => bitmap.closed));
  assert.equal(f.draws.length, 0);
  assert.equal(player.cache.size, 0);
});
