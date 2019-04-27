// A recreation of:
// https://twitter.com/hyper_yolo/status/1116208688522383360

const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');

const settings = {
  scaleToView: true,
  dimensions: [ 2048, 2048 ]
};

const sketch = ({ width, height }) => {
  const palette = Random.shuffle(Random.pick(palettes));
  const background = palette.shift();

  const count = Random.rangeFloor(4, 10);

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);

        const corner = Random.pick([ 0, 0.5, 1, 1.5 ]);
        const arcStart = Math.PI * corner;
        const arcEnd = arcStart + Math.PI * 1.5;

        points.push({
          position: [ u, v ],
          arcStart,
          arcEnd
        });
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    points.forEach(point => {
      const {
        position,
        arcStart,
        arcEnd
      } = point;

      const [ u, v ] = position;
      const margin = width * 0.2;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      const dim = Math.min(width, height) - margin * 2;
      const radius = dim / (count - 1) * 0.35;
      context.beginPath();
      context.arc(x, y, radius, arcStart, arcEnd, false);
      context.fillStyle = 'black';
      context.lineTo(x, y);
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
