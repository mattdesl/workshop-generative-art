#### <sup>:closed_book: [canvas-sketch-util](../README.md) → Documentation</sup>

---

### `canvas-sketch-util`

API Documentation for the various utilities/modules within `canvas-sketch-util`.

### Importing

The modules are generally required individually to keep bundle size smaller, such as:

```js
// Grab all math utils
const math = require('canvas-sketch-util/math');

// Or, grab just a select few
const { fract, mod, clamp } = require('canvas-sketch-util/math');
```

### Modules

- [`math`](./math.md) - Math & interpolation utilities
- [`random`](./random.md) - A random number generator
