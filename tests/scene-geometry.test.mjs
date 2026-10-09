import test from 'node:test';
import assert from 'node:assert/strict';
import { surfaces, projectiveMatrix, coverQuad, trackedQuad, surfaceOpacity } from '../src/lib/scene-geometry.js';

function map(matrix, x, y) {
  const w=matrix[3]*x+matrix[7]*y+matrix[15];
  return [(matrix[0]*x+matrix[4]*y+matrix[12])/w,(matrix[1]*x+matrix[5]*y+matrix[13])/w];
}

test('Every projected thumbnail corner matches its photographed glass corner after cover cropping', () => {
  for (const surface of surfaces) {
    for (const viewport of [[1266,713],[390,844]]) {
      const quad=coverQuad(trackedQuad(surface,surface.anchor),[1280,720],viewport,.6);
      const [w,h]=surface.size, matrix=projectiveMatrix(quad,w,h);
      [[0,0],[w,0],[w,h],[0,h]].forEach(([x,y],i)=>{
        const actual=map(matrix,x,y);
        actual.forEach((value,axis)=>assert.ok(Math.abs(value-quad[i][axis])<1e-8));
      });
    }
  }
});

test('Surfaces are visible at their stop and hidden outside the tracked transition', () => {
  for (const surface of surfaces) {
    assert.equal(surfaceOpacity(surface,surface.anchor),1);
    assert.equal(surfaceOpacity(surface,surface.anchor-8),0);
    assert.equal(surfaceOpacity(surface,surface.anchor+8),0);
    assert.ok(surfaceOpacity(surface,surface.anchor-5)>0);
    assert.deepEqual(trackedQuad(surface,surface.track[0][0]),surface.track[0][1]);
  }
});
