# Creative Coding & Generative Art with JavaScript

This repository includes code & resources for students attending my *Generative Art & Creative Coding with JavaScript* workshops in 2018.

# Contents

- [Tools & Prerequisites](#tools--prerequisites)

- [Installing the Prerequisites](#installing-the-prerequisites)

  - [Complete Installation Guide](#complete-installation-guide)

- [Installing `canvas-sketch` CLI](#installing-canvas-sketch-cli)

- [Command-Line Tips & Suggestions](#command-line-tips--suggestions)

- [Cloning & Running Examples](#cloning--running-examples)

- [Other Modules for Creative Coding](#other-modules-for-creative-coding)

- [Cheat Sheet](#cheat-sheet)

- [Exercises](#exercises)

- [Further Reading](#further-reading)

# Tools & Prerequisites

Here is a list of tools, software and libraries that will be used during the workshop.

| Tool | Documentation | Description |
|---|---|---|
| *Code Editor* | | A JavaScript code editor, [VSCode](https://code.visualstudio.com/) is recommended
| *Browser* |  | A modern browser, [Chrome](https://www.google.com/chrome/) is recommended
| *Canvas API* | [[docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)] | The HTML5 `<canvas>` API, built into all browsers 
| *Command-Line* | [[guide](./docs/command-line.md)] | A command-line application like Terminal (macOS) or [cmder](http://cmder.net/) (Windows)
| [Node.js](https://nodejs.org/en/) (v8+) | [[docs](https://nodejs.org/dist/latest-v8.x/docs/api/)] | Used for running command-line JavaScript tools
| [npm](https://npmjs.com/) (v5+) | [[docs](https://nodejs.org/dist/latest-v8.x/docs/api/)] | Used to install third-party dependencies and tools
| [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch/) | [[docs](https://github.com/mattdesl/canvas-sketch/tree/master/docs)] | A development tool & framework for Generative Art
| [`canvas-sketch-util`](https://github.com/mattdesl/canvas-sketch-util/) | [[docs](https://github.com/mattdesl/canvas-sketch-util/tree/master/docs)] | Utilities for Math & Random Number Generation
| [ThreeJS](https://threejs.org/) | [[docs](https://threejs.org/docs/)] | A 3D rendering engine for WebGL

# Installing the Prerequisites 

Before starting the workshop, make sure you have installed and set up:

- A browser, Chrome recommended
- A code editor, VSCode recommended
- A terminal application (like Terminal, cmder or cmd.exe)
- Node.js 8+ and npm 5+

If you already have these tools installed, you can use the `--version` flag to make sure you have at least `node@8` and `npm@5`:

```sh
npm --version
node --version
```

### Complete Installation Guide

If you haven't installed these yet, you can find more instructions here:

- [Installation Guide](./docs/installation.md)

# Installing `canvas-sketch` CLI

We will be using [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch/) and its command-line interface (CLI) during the workshop.

To install the CLI with npm, use the `--global` or `-g` flag like so:

```sh
npm install canvas-sketch-cli --global
```

> :bulb: Note the `-cli` suffix in the name; this tells npm to install the CLI tool, not the code library.

# Command-Line Tips & Suggestions

If you are new to the command-line, you can read more details here:

- [Command-Line Tips & Suggestions](./docs/command-line.md)

# Cloning & Running Examples

During the workshop, you won't need to clone and run this repository locally. However, if you wish to do so, you can find more instructions here:

- [Cloning & Running Examples](./docs/cloning.md)

# Cheat Sheet

I've also included a small "cheat sheet" that you can use as a reference if you are forgetting some of the patterns and recipes discussed during the workshop.

- [Cheat Sheet](./docs/cheat-sheet.md)

# Exercises

Below are a couple exercises you can tackle during lunch and free coding periods:

- [Exercises](./docs/exercises.md)

# Other Modules for Creative Coding

This workshop encourages students to make use of [npm](https://www.npmjs.com) modules to build complex and interesting artworks.

If you find a module you want to use, like [point-in-polygon](https://www.npmjs.com/package/point-in-polygon), you can install it from your project folder like so:

```sh
npm install point-in-polygon
```

Below are some nice modules for creative coding & generative art:

- [load-asset](https://www.npmjs.com/package/load-asset) - a utility to load images and other assets with async/await
- [point-in-polygon](https://www.npmjs.com/package/point-in-polygon) - test if 2D point is within a polygon
- [nice-color-palettes](https://www.npmjs.com/package/nice-color-palettes) - a collection of 1000 beautiful color palettes
- [gl-matrix](https://www.npmjs.com/package/gl-matrix) - 2D and 3D vector & matrix math utilities
- [poisson-disk-sampling](https://www.npmjs.com/package/poisson-disk-sampling) - can be used for 2D and 3D object placements
- [delaunay-triangulate](https://www.npmjs.com/package/delaunay-triangulate) - 2D and 3D triangulation
- [simplify-path](https://www.npmjs.com/package/simplify-path) - simplify a 2D polyline path
- [chaikin-smooth](https://www.npmjs.com/package/chaikin-smooth) - smooth a 2D polyline path
- [earcut](https://www.npmjs.com/package/earcut) - fast 2D and 3D polygon triangulation
- [voronoi-diagram](https://www.npmjs.com/package/voronoi-diagram) - for 2D and 3D voronoi diagrams
- [svg-mesh-3d](https://github.com/mattdesl/svg-mesh-3d) - convert SVG path string to a 3D mesh
- [eases](https://www.npmjs.com/package/eases) - a set of common easing functions
- [bezier-easing](https://www.npmjs.com/package/bezier-easing) - create cubic bezier curve functions
- [glsl-noise](https://www.npmjs.com/package/glsl-noise) - noise functions as a GLSL module (used with glslify)
- [glsl-hsl2rgb](https://www.npmjs.com/package/glsl-hsl2rgb) - HSL to RGB function as a GLSL module (used with glslify)

# Further Reading

More links to generative art & creative coding:

- [Vanilla Canvas2D Demo](https://codepen.io/mattdesl/pen/BMGZJZ)

- Generative Art

  - [Generative Artistry](https://generativeartistry.com/)

  - [Anders Hoff](https://inconvergent.net/#writing) — Writing on Generative Art

  - [Tyler Hobbs](http://www.tylerlhobbs.com/writings) — Writing on Generative Art

  - [My Blog](https://mattdesl.svbtle.com/) — Writing on Creative Coding & Generative Art

- GLSL & Shaders

  - [The Book of Shaders](https://thebookofshaders.com/)

  - [Lesson: GLSL Shader Basics](https://github.com/Jam3/jam3-lesson-webgl-shader-intro)

  - [Lesson: Custom Shaders in ThreeJS](https://github.com/Jam3/jam3-lesson-webgl-shader-threejs)

- Math

  - [Linear Interpolation](https://mattdesl.svbtle.com/linear-interpolation) — intro to `lerp`

  - [math-as-code](https://github.com/Jam3/math-as-code) — A cheat sheet for mathematical notation in code form

- More Resources

  - [awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding) — a large list of resources

  - [graphics-resources](https://github.com/mattdesl/graphics-resources) — a large list of papers & study material

- Tools

  - [giftool.surge.sh](https://giftool.surge.sh/) — A simple tool for creating looping GIF animations from a folder of PNG frames

  - [cubic-bezier.com](http://cubic-bezier.com) — A cubic Bezier curve editor, useful alongside the [bezier-easing](https://www.npmjs.com/package/bezier-easing) module

  - [ThreeJS Editor](https://threejs.org/editor/) — An online scene editor for ThreeJS

- Communities

  - [creative-dev Slack team](https://creative-dev.herokuapp.com/)

  - [#plottertwitter](https://twitter.com/hashtag/plottertwitter?lang=en), [#generative](https://twitter.com/hashtag/generative?lang=en), [#webgl](https://twitter.com/hashtag/webgl?lang=en) and similar hashtags on Twitter, Instagram etc.

# License

This repository has a dual license.

The textual documentation and markdown files are all licensed as MIT.

The JavaScript source files have been released under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) (CC BY-NC-SA 4.0), see [src/LICENSE.md](./src/LICENSE.md) for details.
