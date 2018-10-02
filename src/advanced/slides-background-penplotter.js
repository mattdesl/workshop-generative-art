const canvasSketch = require('canvas-sketch');
const { createRandom, getRandomSeed } = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math');
const { polylinesToSVG } = require('canvas-sketch-util/penplot');
const { vec2 } = require('gl-matrix');

const settings = {
  dimensions: 'A4',
  units: 'cm'
};

const sketch = ({ width, height, units, render }) => {
  // Some constant variables here
  const margin = 3.5;
  const colors = [ '#181818', '#EEF0F0' ];
  const [background, foreground] = colors;

  // Set up a function that will re-generate the state entirely
  let seed, lines;
  const reset = () => {
    seed = getRandomSeed();
    const random = createRandom(seed);
    lines = generate(random);
  };

  // On pressing the N key, we re-generate and re-render
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'n') {
      ev.preventDefault();
      reset();
      render();
    }
  });

  // Set the initial state
  reset();

  return ({ context }) => {
    // Setup background
    context.fillStyle = background;
    context.globalAlpha = 1;
    context.fillRect(0, 0, width, height);
    context.lineWidth = 0.03;

    // Now draw each line
    lines.forEach(line => {
      context.beginPath();
      line.forEach(([x, y]) => context.lineTo(x, y));
      context.strokeStyle = foreground;
      context.globalAlpha = 1;
      context.stroke();
    });

    // Return PNG + SVG data, use the random seed as filename suffix
    return [
      { data: context.canvas, suffix: seed },
      { data: polylinesToSVG(lines, {width, height, units}), extension: '.svg', suffix: seed }
    ];
  };

  function generate (random) {
    const length = random.range(0.25, 2);

    let lineCount = random.rangeFloor(4, 14);
    if (lineCount % 2 !== 0) lineCount++;

    const isEqualSegments = random.boolean();
    let lineSegments = isEqualSegments
      ? lineCount
      : Math.floor(random.range(lineCount * 0.5, lineCount * 4));
    if (lineSegments % 2 !== 0) lineSegments++;

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

    const tileSize = (width - margin * 2) / (lineCount - 1);
    const ix = random.rangeFloor(0, lineCount - 1);
    const center = [
      margin + (ix * tileSize) + tileSize / 2,
      lerp(margin, height - margin, random.value())
    ];

    // Turn each point into a line segment
    return points.map(point => {
      let direction = vec2.sub([], point, center);
      vec2.normalize(direction, direction);

      const a = vec2.scaleAndAdd([], point, direction, length / 2);
      const b = vec2.scaleAndAdd([], point, direction, -length / 2);
      return [ a, b ];
    });
  }
};

canvasSketch(sketch, settings);
