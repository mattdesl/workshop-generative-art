/**
 * A JavaScript implementation of Sol LeWitt's Wall Drawing #273 (1975) at SFMOMA.
 *
 * Instructions:
 * - A six-inch (15 cm) grid covering the walls. Lines from corners, sides,
 *   and centre of the walls to random points on the grid.
 * - (7th wall) Red lines from the midpoints of four sides, blue lines from
 *   four corners, yellow lines from the center.
 */

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp, lerpArray } = require('canvas-sketch-util/math');

// const palettes = require('nice-color-palettes');

const settings = {
  dimensions: 'A4',
  orientation: 'landscape',
  units: 'cm',
  pixelsPerInch: 300
};

const sketch = ({ width, height }) => {
  const margin = 2;
  const gridMargin = margin;
  const gridXCount = 10;
  const gridYCount = gridXCount;
  const skipEdge = true;
  const count = 40;
  const randomColors = false;
  const splicing = true;

  // Use a palette inspired by Sol LeWitt
  const palette = [ '#ea3f3f', '#76b9ed', '#f2d843' ];

  // Or, use a random palette
  // const palette = random.shuffle(random.pick(palettes)).slice(0, 3);

  // Make a grid of points
  const gridPoints = [];
  for (let x = 0; x < gridXCount; x++) {
    for (let y = 0; y < gridYCount; y++) {
      if (skipEdge) {
        if (x === 0 || x === gridXCount - 1 || y === 0 || y === gridYCount - 1) continue;
      }
      const u = gridXCount <= 1 ? 0.5 : x / (gridXCount - 1);
      const v = gridYCount <= 1 ? 0.5 : y / (gridYCount - 1);

      const px = lerp(gridMargin, width - gridMargin, u);
      const py = lerp(gridMargin, height - gridMargin, v);
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

  const connect = (start, color) => {
    if (gridPoints.length === 0) return null;
    const gridIndex = random.rangeFloor(0, gridPoints.length);
    const end = gridPoints[gridIndex];
    if (splicing) gridPoints.splice(gridIndex, 1);

    return {
      color: randomColors ? random.pick(palette) : color,
      path: [ start, end ]
    };
  };

  const fromMidpoint = () => {
    // Midpoint of line
    const t = 0.5;

    // Can instead be random along edge
    // const t = random.value();

    const cornerIndex = random.rangeFloor(0, corners.length);
    const nextCornerIndex = (cornerIndex + 1) % corners.length;
    const edgeStart = corners[cornerIndex];
    const edgeEnd = corners[nextCornerIndex];
    return lerpArray(edgeStart, edgeEnd, t);
  };

  const fromCorner = () => {
    const cornerIndex = random.rangeFloor(0, corners.length);
    return corners[cornerIndex % corners.length];
  };

  const fromCenter = () => {
    return [ width / 2, height / 2 ];
  };

  let items = [];

  // Gather all types..
  const types = [
    { count: count / 2, emitter: fromMidpoint, color: palette[0] },
    { count: count / 2, emitter: fromCorner, color: palette[1] },
    { count: count, emitter: fromCenter, color: palette[2] }
  ];

  // Emit each line type
  types.forEach(type => {
    for (let i = 0; i < type.count; i++) {
      if (gridPoints.length === 0) return;
      const start = type.emitter();
      items.push(connect(start, type.color));
    }
  });

  // Cleanup lines
  items = items.filter(Boolean);
  items = random.shuffle(items);

  // Draw lines
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    items.forEach(item => {
      context.beginPath();
      item.path.forEach(point => {
        context.lineTo(point[0], point[1]);
      });
      context.fillStyle = context.strokeStyle = item.color;
      context.lineWidth = 0.075;
      context.globalAlpha = 1;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
