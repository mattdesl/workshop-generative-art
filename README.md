# Creative Coding & Generative Art with JavaScript

This repository includes code & resources for students attending my *Generative Art & Creative Coding with JavaScript* workshops in 2018.

# Contents

- [Prerequisites](#Prerequisites)

  - [Using the Command-Line](#using-the-command-line)

  - [Installing Node.js & npm](#installing-nodejs--npm)

- [Libraries & Docs](#libraries--docs)

- [Running the Code Examples](#running-the-code-examples)

  - [Installing `canvas-sketch-cli`](#installing-canvas-sketch-cli)

  - [Running & Editing a Sketch](#running--editing-a-sketch)

  - [Creating New Sketches](#creating-new-sketches)

  - [Bundling to a Static Website](#bundling-to-a-static-website)

- [Tips for Using the Command-Line](#tips-for-using-the-command-line)

- [Further Reading](#further-reading)

# Prerequisites

Before starting the workshop, please make sure you've installed the latest version of [Node.js](https://nodejs.org/en/) and [npm](https://npmjs.com/) and that you can use these tools directly from your command-line interface. In macOS, you can use the Terminal app, and in Windows you can use cmd.exe or [cmder.net](http://cmder.net/). For writing JavaScript, I recommend [VSCode](https://code.visualstudio.com/) as a code editor.

If you already have these tools installed, you can use the `--version` flag to make sure you have above `node@8` and `npm@5`:

```sh
npm --version
node --version
```

Some further instructions below:

#### Using the Command-Line

In macOS, you can go to *Applications > Utilities > Terminal.app*. In Windows, you can click *Start* and search for `cmd.exe`, or download [cmder.net](http://cmder.net/) for a more powerful experience.

If you are new to the command-line, you can see some [Tips for using the Command-Line](#tips-for-using-the-command-line).

#### Installing Node.js & npm

You can download and install the latest version of [Node.js](https://nodejs.org/en/) (version 8.x or higher) from its website. This will come included with a recent version of npm (5.x or higher).

Once installed, you should be able to run `node --version` and `npm --version` from your command-line.

# Libraries & Docs

In addition to the core Node/npm tools, this workshop will also use a few libraries and frameworks. Below is a link to each of their doc pages:

- [Canvas API](https://developer.mozilla.org/kab/docs/Web/API/Canvas_API) — 2D and WebGL features on the `<canvas>` tag
- [canvas-sketch](https://github.com/mattdesl/canvas-sketch/tree/master/docs) — A development tool for Generative Art
- [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util/tree/master/docs) — Utilities for Math & Random Number Generation
- [ThreeJS](https://threejs.org/docs/) — A Rendering Engine for WebGL

# Running the Code Examples

This repository contains some code examples in the [src](./src) folder similar to the artworks we will be creating during the workshop.

Each artwork in [src](./src) is contained in a single JavaScript file, and can be run locally with the [canvas-sketch-cli](https://github.com/mattdesl/canvas-sketch-cli) tool.

#### Installing `canvas-sketch-cli`

Before starting, you must install the command-line tool like so:

```sh
npm install canvas-sketch-cli --global
```

Once installed, you won't need to run this again unless you want to update to a new version of `canvas-sketch-cli`.

#### Running & Editing a Sketch

Once you've installed the CLI tool globally, `cd` into this repository folder and you can run each individual sketch like so:

```sh
canvas-sketch src/grid-basic.js --open
```

The optional `--open` flag will open your default browser to the development server's URL, which is the same as [http://localhost:9966](http://localhost:9966).

Now, edit your JavaScript files and the browser will reload automatically.

#### Creating New Sketches

You can create a new sketch with the `--new` flag, which will write out a plain sketch file and start a development server so you can then edit it:

```sh
canvas-sketch src/my-new-sketch.js --new --open
```

#### Bundling to a Static Website

Once you are happy with your sketch, you can create a static website by bundling it up to a single HTML file. You can use the `--build` command, and `--inline` which will wrap all the JavaScript into an inline script tag so that you end up with just a single file for your site.

```sh
canvas-sketch src/my-new-sketch.js --build --inline
```

Try double-clicking the exported HTML file to see your website. This file can be shared on your favourite website host, like [Neocities](https://neocities.org/).

You can also turn on debugging (source maps) with the `--no-compress` option.

# Tips for Using the Command-Line

In this class we will only use a few operations from the command-line:

#### `cd`

To change directory, you can use the `cd` command:

```sh
# Set directory to './some-folder/'
cd some-folder/

# Set directory up one
cd ../

# Set directory up one and into foobar/
cd ../foobar
```

#### `mkdir`

To make a new directory, you can use `mkdir` command. The following will create a new folder in your current working directory called `foo-bar`:

```sh
mkdir foo-bar
```

#### `npm`

We will use the `npm` command to install and use third-party dependencies. This command only exists after you install Node.js and npm.

To install a code dependency, like [`three`](http://npmjs.com/package/three) (ThreeJS), you can use `npm install` like so:

```sh
# To install ThreeJS
npm install three

# To uninstall ThreeJS
npm uninstall three

# To install multiple dependencies, just list all of them
npm install three canvas-sketch-util
```

To install a global command-line tool, like `canvas-sketch-cli`, you can use the `--global` (or `-g`) flag:

```sh
npm install canvas-sketch-cli --global
```

#### Keyboard Shortcuts

- *Tab Completion* — Many terminal applications (macOS Terminal and cmder.exe) will support Tab Completion. Start typing a folder name and hit the Tab key, and it will auto-complete to a matched folder name that already exists. Hit it twice to display all matches.
- *Previous/Next Command* — You can use the Up and Down arrow keys to repeat previous commands

# Further Reading

More links to generative art & creative coding.

- Generative Art

  - [Generative Artistry](https://generativeartistry.com/)

  - [Anders Hoff — Writing on Generative Art](https://inconvergent.net/#writing)

  - [Tyler Hobbs — Writing on Generative Art](http://www.tylerlhobbs.com/writings)

  - [My Blog — Writing on Creative Coding & Generative Art](https://mattdesl.svbtle.com/)

- GLSL & Shaders

  - [The Book of Shaders](https://thebookofshaders.com/)

  - [Lesson: GLSL Shader Basics](https://github.com/Jam3/jam3-lesson-webgl-shader-intro)

  - [Lesson: Custom Shaders in ThreeJS](https://github.com/Jam3/jam3-lesson-webgl-shader-threejs)

- Math

  - [Linear Interpolation — intro to `lerp`](https://mattdesl.svbtle.com/linear-interpolation)

  - [math-as-code — A cheat sheet for mathematical notation in code form](https://github.com/Jam3/math-as-code)

- More Resources

  - [awesome-creative-coding — a large list of resources](https://github.com/terkelg/awesome-creative-coding)

  - [graphics-resources — a large list of papers & study material](https://github.com/mattdesl/graphics-resources)