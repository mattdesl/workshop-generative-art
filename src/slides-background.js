const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp, lerpArray } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');
const { vec2 } = require('gl-matrix');

random.setSeed(random.getRandomSeed());

const settings = {
  seed: random.getSeed(),
  dimensions: [ 1440, 900 ]
};

console.log('Seed', settings.seed);

const sketch = ({ width, height }) => {
  const lineCount = 12;
  const lineSegments = Math.floor(2 * lineCount * (width / height));
  const foreground = '#EEF0F0';

  let points = [];
  const margin = 100;

  for (let i = 0; i < lineCount; i++) {
    const A = i / (lineCount - 1);

    const x = lerp(margin, width - margin, A);
    for (let j = 0; j < lineSegments; j++) {
      const B = j / (lineSegments - 1);
      const y = lerp(margin, height - margin, B);

      const point = [ x, y ];
      points.push(point);
    }
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#181818';
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;

    points.forEach(point => {
      context.beginPath();

      // const center = [ width / 2, height / 2 ];
      // const center = [ width / 2, margin ];
      const center = [ width, 0 ];
      const direction = vec2.sub([], point, center);
      vec2.normalize(direction, direction);

      const length = 100;
      const a = vec2.scaleAndAdd([], point, direction, length / 2);
      const b = vec2.scaleAndAdd([], point, direction, -length / 2);
      const line = [ a, b ];

      line.forEach(([ x, y ]) => context.lineTo(x, y));
      context.strokeStyle = foreground;
      context.globalAlpha = 1;
      context.stroke();
    });
  };

  function noise (nx, ny, z, freq = 1) {
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
