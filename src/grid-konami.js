const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const palettes = require('nice-color-palettes/1000.json');
const random = require('canvas-sketch-util/random');

let background, palette;
const monochrome = true;

// Choose a color palette
if (monochrome) {
  background = 'hsl(0, 0%, 96%)';
  palette = ['hsl(0, 0%, 10%)'];
} else {
  // Get random 5-color palette
  palette = random.pick(palettes);
  // Shuffle the 5 colors
  palette = random.shuffle(palette);
  palette = palette.slice(0, random.rangeFloor(2, palette.length + 1));
  background = palette.shift();
}

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const count = 20;
  const characters = '←↑→↓AB'.split('');

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const position = [ u, v ];
        const character = random.pick(characters);
        const r = /[AB]/i.test(character) ? 25 : 50;
        const e = /[AB]/i.test(character) ? 10 : 20;
        points.push({
          color: random.pick(palette),
          radius: Math.abs(r + e * random.gaussian()),
          position,
          character
        });
      }
    }
    return points;
  };

  let points = createGrid().filter(() => {
    return Math.random() > 0.5;
  });

  points = random.shuffle(points);

  // We can use "FontFace" to load fonts from JavaScript
  // This will ensure the font is renderable
  const font = new window.FontFace('SpaceGrotesk-Medium', 'url(assets/fonts/SpaceGrotesk-Medium.woff)');
  return font.load().then(() => {
    return ({ context, width, height }) => {
      const margin = width * 0.175;

      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      points.forEach(data => {
        const {
          position,
          radius,
          color,
          character
        } = data;
        const x = lerp(margin, width - margin, position[0]);
        const y = lerp(margin, height - margin, position[1]);

        // Draw the character
        context.fillStyle = color;
        context.font = `${radius}px "SpaceGrotesk-Medium"`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(character, x, y);
      });
    };
  });
};

canvasSketch(sketch, settings);
