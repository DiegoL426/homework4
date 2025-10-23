// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(255);
    //p.fill(30, 120, 40);
    //p.textSize(32);
    //p.textAlign(p.CENTER, p.CENTER);
    //p.text('HWK #4. C', p.width / 2, p.height / 2);

    // create two irregular ellipses and fill between them
    const centerX = p.width/2;
    const centerY = p.height/2;
    const outer = irregularEllipsePoints(p, centerX, centerY, 180, 120, 180, 1.5, 0.28, 42);
    const inner = irregularEllipsePoints(p, centerX, centerY, 120, 80, 180, 1.5, 0.18, 99);
    fillBetweenEllipses(p, outer, inner, p.color(255, 120, 60, 200));
  };


// irregularEllipsePoints(p, x, y, rx, ry, detail = 128, noiseScale = 1.0, noiseRadius = 0.25, seed = null)
// returns Array of p5.Vector points around an ellipse with Perlin-noise edge perturbation
function irregularEllipsePoints(p, x, y, rx, ry, detail = 128, noiseScale = 1.0, noiseRadius = 0.25, seed = null) {
  if (seed !== null && p.noiseSeed) p.noiseSeed(seed);
  const pts = [];
  const step = p.TWO_PI / detail;
  // offset to avoid symmetry artifacts
  const ox = p.random(1000);
  const oy = p.random(1000);
  for (let i = 0; i < detail; i++) {
    const a = i * step;
    const nx = p.cos(a) * noiseScale + ox;
    const ny = p.sin(a) * noiseScale + oy;
    const n = p.noise(nx, ny);
    const radiusMul = 1 + (n - 0.5) * 2 * noiseRadius; // ~[1-noiseRadius, 1+noiseRadius]
    const px = x + p.cos(a) * rx * radiusMul;
    const py = y + p.sin(a) * ry * radiusMul;
    pts.push(p.createVector(px, py));
  }
  return pts;
}


// fillBetweenEllipses(p, ptsA, ptsB, fillColor)
// fills the region between two closed vertex lists (arrays of p5.Vector).
// If lengths differ, it samples points from the longer to match the shorter.
function fillBetweenEllipses(p, ptsA, ptsB, fillColor) {
  if (!ptsA.length || !ptsB.length) return;
  // resample to same length if needed
  const n = Math.max(ptsA.length, ptsB.length);
  function sample(src, N) {
    const out = [];
    const m = src.length;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const idx = t * m;
      const i0 = Math.floor(idx) % m;
      const i1 = (i0 + 1) % m;
      const frac = idx - Math.floor(idx);
      const v = p.createVector(
        p.lerp(src[i0].x, src[i1].x, frac),
        p.lerp(src[i0].y, src[i1].y, frac)
      );
      out.push(v);
    }
    return out;
  }
  const A = ptsA.length === n ? ptsA : sample(ptsA, n);
  const B = ptsB.length === n ? ptsB : sample(ptsB, n);

  p.push();
  p.noStroke();
  p.fill(fillColor);
  p.beginShape();
  // go around A
  for (let i = 0; i < n; i++) p.vertex(A[i].x, A[i].y);
  // then go around B in reverse to make a single closed polygon
  for (let i = n - 1; i >= 0; i--) p.vertex(B[i].x, B[i].y);
  p.endShape(p.CLOSE);
  p.pop();
}
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
