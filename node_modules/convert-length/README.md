# convert-length

A simple utility to convert from physical lengths (meters, inches, etc) to pixels and back, based on the CSS spec. Supports converting to and from the following units:

- `mm` (millimeters)
- `cm` (centimeters)
- `m` (meters)
- `pc` (pica, or 1 / 6 of an inch)
- `pt` (point, or 1 / 72 of an inch)
- `in` (inch)
- `ft` (feet, or 12 inches)
- `px` (pixels)

Example:

```js
const convert = require('convert-length');

// Convert 10 inches to meters
const result = convert(10, 'in', 'm')
// -> 0.254

// Convert A4 print (210 x 297 mm) to pixels @ 300 PPI
const result = [ 210, 297 ].map(n => {
  return convert(n, 'mm', 'px', { pixelsPerInch: 300 })
});
// -> [ 2480, 3508 ]
```

Pixels are computed based on the specified `pixelsPerInch` setting (default 96), as per the CSS spec.

## Install

Use [npm](https://npmjs.com/) to install and use this. Should work with browserify, Webpack, etc.

```sh
npm install convert-length
```

## Usage

### `result = convert(value, fromUnit, toUnit, [options])`

Converts the `value` number from the `fromUnit` unit string (e.g. `"in"`) to the `toUnit` unit string. The unit strings are case insensitive.

Options can be:

- `pixelsPerInch` (default 96) the number of pixels in one inch, used when converting to and from `"px"` units
- `precision` if specified, the value will be rounded to the Nth decimal. e.g. A precision of `3` will round to `0.001`. If not specified, the result will not be rounded.
- `roundPixel` (default true) If enabled, when converting to a `"px"` unit the return value will be rounded to a whole pixel. If disabled, the conversion will instead round to the specified Nth `precision` decimal (or no rounding if `precision` is not specified).

### `convert.units`

The list of supported units for this module, equivalent to:

```js
[ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ]
```

## See Also

This module was inspired by [measures](https://www.npmjs.com/package/measures) and [convert-units](https://www.npmjs.com/package/convert-units), but I wanted something dead-simple for the browser, without all the extra features, and that supports pixels in the same way CSS and Photoshop handle their conversions.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/convert-length/blob/master/LICENSE.md) for details.
