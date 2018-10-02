#### <sup>:closed_book: [canvas-sketch-util](../README.md) → [Documentation](./README.md) → `math`</sup>

---

### `canvas-sketch-util/math`

Holds common math functions, shaping functions, interpolation, and so forth.

### Example

```js
const { lerp } = require('canvas-sketch-util/math');

console.log(lerp(0, 100, 0.5));
// -> 50
```

### Functions

- [mod](#mod)
- [fract](#fract)
- [sign](#sign)
- [clamp](#clamp)
- [clamp01](#clamp01)
- [degToRad](#degToRad)
- [radToDeg](#radToDeg)
- [wrap](#wrap)
- [pingPong](#pingPong)
- [lerp](#lerp)
- [inverseLerp](#inverseLerp)
- [lerpArray](#lerpArray)
- [lerpFrames](#lerpFrames)
- [linspace](#linspace)
- [smoothstep](#smoothstep)
- [mapRange](#mapRange)
- [expand2D](#expand2D)
- [expand3D](#expand3D)
- [expand4D](#expand4D)

<a name="mod"></a>

### `n = mod(a, b)`

Computes `a % b` but handles negatives and always returns a positive result, so that `mod(-1, 4)` will return 3 (instead of -1 with regular modulo).

<a name="fract"></a>

### `f = fract(n)`

Returns the fractional part of `n`, e.g. `fract(40.25)` will return `0.25`. This is defined as `x - floor(x)`

<a name="sign"></a>

### `s = sign(n)`

Returns the sign (positive or negative) of `n`. If `n > 0` return 1, if `n < 0` return -1, otherwise return 0.

<a name="clamp"></a>

### `v = clamp(n, min, max)`

Clamps the number *n* between *min* (inclusive) and *max* (inclusive).

<a name="clamp01"></a>

### `v = clamp01(n)`

Clamps the number *n* between 0 (inclusive) and 1 (inclusive). Convenience alias for `clamp(n, 0, 1)`.

<a name="degToRad"></a>

### `radians = degToRad(degrees)`

Converts `degrees` angle into `radians`, e.g. 180º will return `Math.PI`.

<a name="radToDeg"></a>

### `degrees = radToDeg(radians)`

Converts `radians` angle into `degrees`, e.g. `Math.PI` will return 180º.

<a name="wrap"></a>

### `n = wrap(value, from, to)`

Wraps the `value` around the range `from` to `to`. Particularly useful for wrapping angles/radians around a circle.

```js
// Wrap degrees from 0..360
const angle = wrap(-180, 0, 360);

// Wrap radians from -PI to PI
const radians = wrap(-Math.PI * 2, -Math.PI, Math.PI);
```

<a name="pingPong"></a>

### `n = pingPong(t, length)`

PingPongs the value *t*, so that it is never larger than *length* and never smaller than 0.

The returned value will move back and forth between 0 and length.

<a name="lerp"></a>

### `value = lerp(min, max, t)`

Linearly interpolates between *min* and *max* using the parameter *t*, where *t* is generally expected to be between 0..1 range. None of the inputs or outputs are clamped.

<a name="inverseLerp"></a>

### `t = inverseLerp(min, max, value)`

Produces the inverse of `lerp`, in that you pass a value (a number between the range *min* and *max*) and get back a *t* value typically within the 0..1 range. None of the inputs or outputs are clamped.

<a name="lerpArray"></a>

### `vector = lerpArray(minVector, maxVector, t, out = [])`

Linearly interpolates between *minVector* and *maxVector* arrays using the parameter *t*, where *t* is generally expected to be between 0..1 range. The two vectors can be any dimension but are expected to match, and each value is interpolated componentwise. None of the inputs or outputs are clamped.

You can pass `out` to re-use an existing array instead of creating a new one.

Example:

```js
// Choose a random point within a 2D line segment
const start = [ 0, 0 ];
const end = [ 25, 10 ];
const t = Math.random();
const point = lerpArray(start, end, t);
```

<a name="lerpFrames"></a>

### `value = lerpFrames(frames, t)`

A utility to interpolate the evenly-spaced *frames* array using the parameter *t*, clamped between 0..1 range. The *frames* array can be an array of numbers which will use `lerp()`, or an array of arrays (vectors) which will use `lerpArray()`.

For example, it can be used to interpolate color ramps, 2D and 3D paths, keyframed animations, and so forth.

```js
const polyline = [
  [ 0, 0 ], [ 20, 0 ], [ 20, 20 ], [ 0, 20 ], [ 0, 0 ]
];

// How far along our polyline to sample
const point = lerpKeyframes(polyline, 0.75);
```

<a name="linspace"></a>

### `array = linspace(N, inclusive = false)`

Produces a linearly-spaced array of *N* numbers in an array, interpolating from 0 toward 1. By default, 1 is exclusive, but you can pass `inclusive` as true to interpolate to and include 1 as the final element.

For example:

```js
console.log(linspace(4));
// [ 0, 0.25, 0.5, 0.75 ]

console.log(linspace(5, true));
// [ 0, 0.25, 0.5, 0.75, 1 ]
```

<a name="smoothstep"></a>

### `v = smoothstep(edge0, edge1, x)`

Performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`. This is useful in cases where a threshold function with a smooth transition is desired.

<a name="mapRange"></a>

### `n = mapRange(value, inputMin, inputMax, ouptutMin, outputMax, clamp = false)`

Maps the *value* from one range of `[inputMin..inputMax]` to another range of `[outputMin..outputMax]`, with min/max being inclusive. By default, *value* is not clamped, but you can specify `clamp` as true to clamp the output within `outputMin` and `outputMax`.

```js
// Converts normalized -1..1 coordinate to screen coordinate
const x = -1;
const pixel = mapRange(x, -1, 1, 0, screenWidth, true);
```

<a name="expand2D"></a>

### `vector = expand2D(value, defaultValue = 0)`

Expands the *value* into a 2D vector array, defaulting to `defaultValue` when *value* or one of its components is not a finite number. Here, *value* can be a number (expanding all components to that number) or an array of numbers.

This is useful to take a user input, like a scalar value, and expand it to a vector.

```js
console.log(expand2D(0.5)); // [ 0.5, 0.5 ]
console.log(expand2D(undefined, 1)); // [ 1, 1 ]
console.log(expand2D([ 0.5 ], 1)); // [ 0.5, 1 ]
console.log(expand2D([ 0.5, 0.5 ], 1)); // [ 0.5, 0.5 ]
console.log(expand2D([ null, 0.5 ], 1)); // [ 0.5, 0.5 ]
```

<a name="expand3D"></a>

### `vector = expand3D(value, defaultValue = 0)`

Same as [expand2D](#expand2D) but expands the value into a 3D vector array.

<a name="expand4D"></a>

### `vector = expand4D(value, defaultValue = 0)`

Same as [expand2D](#expand2D) but expands the value into a 4D vector array.

## 

#### <sup>[← Back to Documentation](./README.md)