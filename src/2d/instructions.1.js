const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 1024 ]
};

const sketch = ({ width, height }) => {
  const palette = random.pick(palettes);

  const createLines = (opt = {}) => {
    const { count = 25, segments = 40 } = opt;
    const lines = [];
    for (let y = 0; y < count; y++) {
      const line = []
      const v = count <= 1 ? 0.5 : (y / (count - 1));
      for (let x = 0; x < segments; x++) {
        let u = count <= 1 ? 0.5 : (x / (segments - 1));
        let [ px, py ] = [ u, v ];
        const f = 1;
        px += random.gaussian() * 0.0025
        py += 0.1 * random.noise2D(u * f, v * f);
        line.push([ px, py ]);
      }
      lines.push({
        path: line,
        color: palette[y % palette.length],
        lineWidth: v * 20
      });
    }
    return lines;
  };

  const margin = width * 0.075;
  const lines = createLines();

  const background = 'white';

  // wide mural,
  // many points drawin horizontally to form a non-straight line
  // repeat going down the wall
  // the non-straight lines get thicker toward the bottom of the wall

  return ({ context, width, height }) => {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    lines.forEach(({ lineWidth, path, color }) => {
      context.beginPath();
      path.forEach(([ u, v ]) => {
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);
        context.lineTo(x, y)
      });
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
