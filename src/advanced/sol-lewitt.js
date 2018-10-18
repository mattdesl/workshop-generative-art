const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { mod, lerp, lerpArray } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes');

const settings = {
  orientation: 'landscape',
  playbackRate: 'throttle',
  fps: 24,
  animate: true,
  duration: 10,
  dimensions: [ 1920, 1080 ]
};

const sketch = ({ width, height }) => {
  return ({ context, width, height, time }) => {
    const slideFPS = 2;
    const frame = Math.floor(slideFPS * time);
    random.setSeed(frame);
    const margin = 100;
    const gridMargin = margin;
    const gridXCount = random.rangeFloor(10, 40);
    const gridYCount = Math.ceil(gridXCount / (width / height));
    const skipEdge = true//random.boolean();
    const count = random.rangeFloor(10, 40);
    const randomColors = false;
    const splicing = random.boolean();
    const randomMidpoints = false;// random.boolean();
    const gridOffset = frame;

    // Use a palette inspired by Sol LeWitt
    const palette = [ '#ea3f3f', '#76b9ed', '#f2d843' ];

    // Or, use a random palette
    // const palette = random.shuffle(random.pick(palettes)).slice(0, 3);

    // Make a grid of points
    let gridPoints = [];
    for (let y = 0; y < gridYCount; y++) {
      for (let x = 0; x < gridXCount; x++) {
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

    gridPoints = random.shuffle(gridPoints);

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
      let gridIndex = random.rangeFloor(0, gridPoints.length);
      gridIndex = mod(gridIndex - gridOffset, gridPoints.length);
      const end = gridPoints[gridIndex];
      if (splicing) gridPoints.splice(gridIndex, 1);

      return {
        color: randomColors ? random.pick(palette) : color,
        path: [ start, end ]
      };
    };

    const fromMidpoint = () => {
      // Midpoint of line
      const t = randomMidpoints ? random.value() : 0.5;

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
    })

    // Cleanup lines
    items = items.filter(Boolean);
    items = random.shuffle(items);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    items.forEach(item => {
      context.beginPath();
      item.path.forEach(point => {
        context.lineTo(point[0], point[1]);
      });
      context.fillStyle = context.strokeStyle = item.color;
      context.lineWidth = 4;
      context.globalAlpha = 1;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);