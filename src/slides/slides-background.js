/**
 * Generates 100 uniqu slide images that can be used
 * as subtle backdrops for Keynote presentations.
 */

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const { vec2 } = require('gl-matrix');

const settings = {
  animate: true,
  fps: 1.8,
  playbackRate: 'throttle',
  totalFrames: 100,
  dimensions: [ 1440, 900 ]
};

const sketch = ({ width, height }) => {
  return ({ context, width, height }) => {
    const margin = 150;

    let lineCount = random.rangeFloor(4, 14);
    if (lineCount % 2 !== 0) lineCount++;

    const isEqualSegments = random.boolean();
    let lineSegments = isEqualSegments
      ? lineCount
      : Math.floor(random.range(lineCount * 0.5, lineCount * 4));
    if (lineSegments % 2 !== 0) lineSegments++;

    const colors = [ '#000000', '#EEF0F0' ];
    const [background, foreground] = colors;

    let points = [];

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

    context.fillStyle = background;
    context.globalAlpha = 1;
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;

    const tileSize = (width - margin * 2) / (lineCount - 1);
    const ix = random.rangeFloor(0, lineCount - 1);
    const center = [
      margin + (ix * tileSize) + tileSize / 2,
      lerp(margin, height - margin, random.value())
    ];

    const length = random.range(10, 100);

    // Turn each point into a line segment
    points.forEach(point => {
      let direction = vec2.sub([], point, center);
      vec2.normalize(direction, direction);

      const a = vec2.scaleAndAdd([], point, direction, length / 2);
      const b = vec2.scaleAndAdd([], point, direction, -length / 2);
      const line = [ a, b ];

      context.beginPath();
      line.forEach(([x, y]) => context.lineTo(x, y));
      context.strokeStyle = foreground;
      context.globalAlpha = 1;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
