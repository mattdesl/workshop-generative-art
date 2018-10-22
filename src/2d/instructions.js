const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp, lerpArray } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes/1000.json');

const settings = {
  dimensions: [ 2048, 1024 ]
};

const sketch = ({ width, height }) => {
  const nColors = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, nColors);
  const margin = width * 0.05;

  const createGrid = () => {
    const xCount = 6;
    const yCount = 6;
    const points = [];
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        const u = x / (xCount - 1);
        const v = y / (yCount - 1);
        const px = lerp(margin, width - margin, u);
        const py = lerp(margin, height - margin, v);
        points.push([ px, py ]);
      }
    }
    return points;
  };

  let grid = createGrid();
  const originalGrid = grid.slice();

  let shapes = [];
  while (grid.length > 2) {
    const pointsToRemove = random.shuffle(grid).slice(0, 2);
    if (pointsToRemove.length < 2) break;
    grid = grid.filter(p => !pointsToRemove.includes(p));
    const [ a, b ] = pointsToRemove;
    shapes.push({
      color: random.pick(palette),
      path: [
        [ a[0], height - margin ],
        a,
        b,
        [ b[0], height - margin ]
      ],
      dist: lerpArray(a, b, 0.5)[1]
    });
  }

  shapes.sort((a, b) => a.dist - b.dist);
  
  const background = 'white';

  return ({ context, width, height }) => {
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    shapes.forEach(({ lineWidth, path, color }) => {
      context.beginPath();
      path.forEach(([ x, y ]) => {
        context.lineTo(x, y)
      });
      context.closePath();
      context.lineWidth = 20;
      context.globalAlpha = 0.85;
      context.fillStyle = color;
      context.lineJoin = context.lineCap = 'round';
      context.strokeStyle = background;
      context.fill();
      context.globalAlpha = 1;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
