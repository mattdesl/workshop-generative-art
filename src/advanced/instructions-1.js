const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp, lerpArray } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  units: 'cm',
  pixelsPerInch: 300
};

const sketch = ({ width, height }) => {
  const margin = 2;
  const gridXCount = 2;
  const gridYCount = gridXCount;

  const palette = random.pick(palettes);

  // Make a grid of points
  const gridPoints = [];
  for (let x = 0; x < gridXCount; x++) {
    for (let y = 0; y < gridYCount; y++) {
      const u = gridXCount <= 1 ? 0.5 : x / (gridXCount - 1);
      const v = gridYCount <= 1 ? 0.5 : y / (gridYCount - 1);

      const px = lerp(margin, width - margin, u);
      const py = lerp(margin, height - margin, v);
      gridPoints.push([ px, py ]);
    }
  }

  // Make a list of the four "corner" points
  const corners = [
    [ 0, 0 ], [ 1, 0 ],
    [ 1, 1 ], [ 0, 1 ]
  ].map(uv => {
    const [u, v] = uv;
    const px = lerp(margin, width - margin, u);
    const py = lerp(margin, height - margin, v);
    return [ px, py ];
  });

  // Connect a random point along one of the four edges of the grid
  // to a random point in the grid
  const connect = () => {
    const cornerIndex = random.rangeFloor(0, corners.length);
    const nextCornerIndex = (cornerIndex + 1) % corners.length;
    const edgeStart = corners[cornerIndex];
    const edgeEnd = corners[nextCornerIndex];
    const t = random.value();
    const start = lerpArray(edgeStart, edgeEnd, t);

    const gridIndex = random.rangeFloor(0, gridPoints.length);
    const end = gridPoints[gridIndex];
    gridPoints.splice(gridIndex, 1);

    return {
      color: palette[cornerIndex % palette.length],
      path: [ start, end ]
    };
  };

  const maxLines = 30;
  const items = [];
  for (let i = 0; i < maxLines; i++) {
    if (gridPoints.length > 0) {
      const item = connect();
      items.push(item);
    }
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    items.forEach(item => {
      context.beginPath();
      item.path.forEach(point => {
        context.lineTo(point[0], point[1]);
      });
      context.fillStyle = context.strokeStyle = item.color;
      context.lineWidth = 0.15;
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'multiply';
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
