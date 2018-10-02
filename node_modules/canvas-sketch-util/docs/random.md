#### <sup>:closed_book: [canvas-sketch-util](../README.md) → [Documentation](./README.md) → `random`</sup>

---

### `canvas-sketch-util/random`

A singleton utility to produce randomness; such as random numbers, vectors, rotations, etc.

By default, random values are not deterministic, but if you set a seed with `setSeed`, all values returned from these functions will be deterministic and reproducible.

### Example

```js
const random = require('canvas-sketch-util/random');

// Random betwee 0 (inclusive) and 1 (exclusive)
const r = random.value();

// Random 2D point on unit circle
const [ x, y ] = random.onCircle();
```

### Functions

- [createRandom](#createRandom)
- [value](#value)
- [setSeed](#setSeed)
- [getSeed](#getSeed)
- [getRandomSeed](#getRandomSeed)
- [valueNonZero](#valueNonZero)
- [noise1D](#noise1D)
- [noise2D](#noise2D)
- [noise3D](#noise3D)
- [noise4D](#noise4D)
- [permuteNoise](#permuteNoise)
- [sign](#sign)
- [boolean](#boolean)
- [chance](#chance)
- [range](#range)
- [rangeFloor](#rangeFloor)
- [gaussian](#gaussian)
- [pick](#pick)
- [shuffle](#shuffle)
- [onCircle](#onCircle)
- [insideCircle](#insideCircle)
- [onSphere](#onSphere)
- [insideSphere](#insideSphere)
- [quaternion](#quaternion)
- [weighted](#weighted)
- [weightedSet](#weightedSet)
- [weightedSetIndex](#weightedSetIndex)

<a name="createRandom"></a>

### `instance = random.createRandom(defaultSeed)`

Instead of using the singleton (which may have its seed polluted by another module), you can create a self-contained instance of the random utility with `createRandom`, optionally passing a seed to produce deterministic randomness. If no seed is used, then the default `Math.random()` function will be used under the hood.

The return value has all the same functions as the `random` module.

<a name="value"></a>

### `v = random.value()`

Produce a random value between 0 (inclusive) and 1 (exclusive). This is functionally equivalent to `Math.random()`, except in the case that a seed has been set on the singleton, in which case a detemrinistic result is produced.

All other utilities will use this function under the hood.

<a name="setSeed"></a>

### `random.setSeed(n)`

Forces this random generator instance to use the seed `n`, which can be a number or string type. After setting the seed, all future random numbers will have a deterministic result based on this seed.

If you specify a falsey value, the seed will be cleared from the instance and non-deterministic randomness will return via `Math.random()`.

<a name="getSeed"></a>

### `seed = random.getSeed()`

Returns the current seed of this random generator instance, or `undefined` if none is set.

<a name="getRandomSeed"></a>

### `seed = random.getRandomSeed()`

Produces a non-determinstic random seed, a floored integer between 0 and 1000000 which is then turned into a string. Unlike other functions, this always uses `Math.random()` and is never based on the internal seed.

Useful to set an initial random seed, like so:

```js
// Set an initial random seed
random.setSeed(random.getRandomSeed());

// Log it for later reproducibility
console.log('Random seed: %s', random.getSeed());
```

<a name="valueNonZero"></a>

### `v = random.valueNonZero()`

Produce a random value between 0 (exlusive) and 1 (exclusive).

<a name="noise1D"></a>

### `n = random.noise1D(x)`

Produces random simplex noise with the `simplex-noise` module. This is equivalent to `noise2D(x, 0)`.

<a name="noise2D"></a>

### `n = random.noise2D(x, y)`

Produces random simplex noise with the `simplex-noise` module.

<a name="noise3D"></a>

### `n = random.noise3D(x, y, z)`

Produces random simplex noise with the `simplex-noise` module.

<a name="noise4D"></a>

### `n = random.noise4D(x, y, z, w)`

Produces random simplex noise with the `simplex-noise` module.

<a name="permuteNoise"></a>

### `random.permuteNoise()`

Re-computes the noise tables so that future calls to `noiseND()` will have different values.

<a name="sign"></a>

### `random.sign()`

Uniformly produce either `1` or `-1` values.

<a name="boolean"></a>

### `random.boolean()`

Uniformly produce either `true` or `false` values.

<a name="chance"></a>

### `random.chance(probability = 0.5)`

Produce random `true` or `false` values based on the given `probability`, where the closer it is to 1 the more likely you will get `true`, and the closer to 0 the more likely you will get `false`. The default probability is 0.5, which is functionally equivalent to `random.boolean()`.

<a name="range"></a>

### `random.range(min, max)`

Produces a random float value between `min` (inclusive) and `max` (exclusive). If only one argument is provided, the `min` is defaulted to 0, and that argument is used as the `max`.

<a name="rangeFloor"></a>

### `random.rangeFloor(min, max)`

Produces a random integer value between `min` integer (inclusive) and `max` integer (exclusive). If only one argument is provided, the `min` is defaulted to 0, and that argument is used as the `max`.

<a name="gaussian"></a>

### `v = random.gaussian(mean = 0, std = 1)`

Produces a random Gaussian distribution using *mean* and *std* for standard deviation.

<a name="pick"></a>

### `random.pick(array)`

Picks a random element from the specified array.

<a name="shuffle"></a>

### `shuffled = random.shuffle(array)`

Shallow copies the array, returning a randomly shuffled result. Does not modify the array in place.

<a name="onCircle"></a>

### `[x, y] = random.onCircle(radius = 1, out = [])`

Produces a random 2D point around the perimiter of a unit circle, optionally scaled to *radius*. You can pass an existing `out` array to re-use, instead of creating a new array.

<a name="insideCircle"></a>

### `[x, y] = random.insideCircle(radius = 1, out = [])`

Produces a random 2D point inside a unit circle, optionally scaled to *radius*. You can pass an existing `out` array to re-use, instead of creating a new array.

<a name="onSphere"></a>

### `[x, y, z] = random.onSphere(radius = 1, out = [])`

Produces a random 3D point on the surface of a unit sphere, optionally scaled to *radius*. You can pass an existing `out` array to re-use, instead of creating a new array.

<a name="insideSphere"></a>

### `[x, y, z] = random.insideSphere(radius = 1, out = [])`

Produces a random 3D point within a unit sphere, optionally scaled to *radius*. You can pass an existing `out` array to re-use, instead of creating a new array.

<a name="quaternion"></a>

### `[x, y, z, w] = random.quaternion(out = [])`

Produces a random 4D quaternion rotation. You can pass an existing `out` array to re-use, instead of creating a new array.

<a name="weighted"></a>

### `index = random.weighted(weights)`

Returns a random index, selected from an array of weights. This allows you to produce weighted randomness, for example weighing the results toward a specific element in an array. Higher numbers are more likely to get picked than lower numbers.

```js
const weights = [ 0, 2500, 10 ];
const index = random.weighted(weights);
// likely to produce index=1
```

<a name="weightedSet"></a>

### `value = random.weightedSet(set)`

A utility to produce a value from a "set" of weighted objects.

The objects must have the format `{ value, weight }` like so:

```js
const colors = [
  { value: 'red', weight: 200 },
  { value: '#ff0000', weight: 50 }
];

const color = random.weightedSet(colors);
element.style.background = color;
```

<a name="weightedSetIndex"></a>

### `index = random.weightedSetIndex(set)`

Similar to [weightedSet](#weightedSet), but returns the index of the element within the array, rather than the value.

## 

#### <sup>[← Back to Documentation](./README.md)