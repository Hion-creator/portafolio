// Corners follow the existing glass surfaces, in source-image coordinates.
// The frame number is zero-based and refers to the frame actually displayed.
export const surfaces = [
  { id: 'lia', chapter: 1, size: [400, 620], anchor: 48,
    poster: [[1384,342],[1512,316],[1513,545],[1385,526]],
    track: [
      [40, [[1008,258],[1091,245],[1093,395],[1009,385]]],
      [48, [[1043,258],[1139,236],[1140,405],[1044,391]]],
      [56, [[1079,243],[1200,219],[1201,408],[1080,391]]],
    ] },
  { id: 'pulso', chapter: 2, size: [400, 960], anchor: 95,
    poster: [[981,177],[1074,244],[1060,624],[978,578]],
    track: [
      [87, [[731,149],[802,190],[787,453],[729,425]]],
      [95, [[736,128],[809,181],[793,462],[734,433]]],
      [103, [[713,83],[817,159],[800,526],[711,484]]],
    ] },
  { id: 'decision-lab', chapter: 3, size: [400, 540], anchor: 143,
    poster: [[1502,269],[1585,241],[1585,373],[1501,396]],
    track: [
      [135, [[1070,232],[1137,213],[1135,316],[1068,334]]],
      [143, [[1082,243],[1152,222],[1150,332],[1079,353]]],
    ] },
];

export function trackedQuad(surface, frame) {
  const keys = surface.track;
  let a = keys[0], b = keys.at(-1);
  for (let i = 1; i < keys.length; i++) {
    if (frame <= keys[i][0]) { a = keys[i - 1]; b = keys[i]; break; }
  }
  const t = Math.max(0, Math.min(1, (frame - a[0]) / (b[0] - a[0] || 1)));
  return a[1].map((point, i) => point.map((value, axis) => value + (b[1][i][axis] - value) * t));
}

export function surfaceOpacity(surface, frame) {
  const distance = Math.abs(frame - surface.anchor);
  const t = Math.max(0, Math.min(1, (8 - distance) / 5));
  return t * t * (3 - 2 * t);
}

// Preserve the same object-fit: cover crop as the underlying image/canvas.
export function coverQuad(quad, source, viewport, focus = .6) {
  const scale = Math.max(viewport[0] / source[0], viewport[1] / source[1]);
  const offsetX = (viewport[0] - source[0] * scale) * focus;
  const offsetY = (viewport[1] - source[1] * scale) / 2;
  return quad.map(([x, y]) => [x * scale + offsetX, y * scale + offsetY]);
}

// Exact projective mapping of a rectangle onto all four corners, rather than
// an approximate rotateY. CSS matrix3d accepts the resulting homography.
export function projectiveMatrix(quad, width, height) {
  const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = quad;
  const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
  const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
  const det=dx1*dy2-dx2*dy1;
  const g=det ? (dx3*dy2-dx2*dy3)/det : 0;
  const h=det ? (dx1*dy3-dx3*dy1)/det : 0;
  return [(x1-x0+g*x1)/width,(y1-y0+g*y1)/width,0,g/width,
    (x3-x0+h*x3)/height,(y3-y0+h*y3)/height,0,h/height,
    0,0,1,0,x0,y0,0,1];
}

export function mobileFocus(frame) {
  const values = [[0,.64],[48,.91],[95,.56],[143,.88]];
  for (let i=1;i<values.length;i++) {
    if (frame<=values[i][0]) {
      const [a,fa]=values[i-1], [b,fb]=values[i];
      const t=Math.max(0,Math.min(1,(frame-a)/(b-a)));
      return fa+(fb-fa)*t;
    }
  }
  return .88;
}
