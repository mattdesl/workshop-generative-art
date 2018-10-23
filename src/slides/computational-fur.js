const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');

random.setSeed(random.getRandomSeed());

const settings = {
  seed: random.getSeed(),
  exportPixelRatio: 2,
  dimensions: [ 1440, 1440 ]
};

console.log('Seed', settings.seed);

const sketch = ({ width, height }) => {
  const lineCount = 250;
  const lineSegments = 400;
  const foreground = '#EEF0F0';

  let lines = [];
  const margin = width * 0.15;

  for (let i = 0; i < lineCount; i++) {
    const A = i / (lineCount - 1);
    const line = [];

    const x = lerp(margin, width - margin, A);
    for (let j = 0; j < lineSegments; j++) {
      const B = j / (lineSegments - 1);
      const y = lerp(margin, height - margin, B);

      const frequency0 = 0.00105 + random.gaussian() * 0.00003;
      const z0 = noise(x * frequency0, y * frequency0, -1);
      const z1 = noise(x * frequency0, y * frequency0, +1);

      const warp = random.gaussian(20, 40);
      const fx = x + z0 * warp;
      const fy = y + z1 * warp;

      const point = [ fx, fy ];
      line.push(point);
    }

    lines.push(line);
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#181818';
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 1;

    lines.forEach(line => {
      context.beginPath();
      line.forEach(([ x, y ]) => context.lineTo(x, y));
      context.globalCompositeOperation = 'lighter';
      context.strokeStyle = foreground;
      context.globalAlpha = 0.35;
      context.stroke();
    });
  };

  function noise (nx, ny, z, freq = 0.75) {
    // This uses many layers of noise to create a more organic pattern
    nx *= freq;
    ny *= freq;
    let e = (1.00 * (random.noise3D(1 * nx, 1 * ny, z) * 0.5 + 0.5) +
        0.50 * (random.noise3D(2 * nx, 2 * ny, z) * 0.5 + 0.5) +
        0.25 * (random.noise3D(4 * nx, 4 * ny, z) * 0.5 + 0.5) +
        0.13 * (random.noise3D(8 * nx, 8 * ny, z) * 0.5 + 0.5) +
        0.06 * (random.noise3D(16 * nx, 16 * ny, z) * 0.5 + 0.5) +
        0.03 * (random.noise3D(32 * nx, 32 * ny, z) * 0.5 + 0.5));
    e /= (1.00 + 0.50 + 0.25 + 0.13 + 0.06 + 0.03);
    e = Math.pow(e, 2);
    e = Math.max(e, 0);
    e *= 2;
    return e * 2 - 1;
  }
};

canvasSketch(sketch, settings);
