#### <sup>:closed_book: [workshop-generative-art](../README.md) → Cloning & Running Examples</sup>

---

# Cloning & Running Examples

The [`src/`](../src/) folder contains some code examples similar to the artworks we will be creating during the workshop.

Each artwork in the `src` folder is contained in a single JavaScript file, and can be run locally with the [canvas-sketch-cli](https://github.com/mattdesl/canvas-sketch-cli) tool.

# Contents

  - [Cloning & Installing Dependencies](#cloning--installing-dependencies)

  - [Installing `canvas-sketch-cli`](#installing-canvas-sketch-cli)

  - [Running & Editing a Sketch](#running--editing-a-sketch)

  - [Creating New Sketches](#creating-new-sketches)

  - [Bundling to a Static Website](#bundling-to-a-static-website)

# Cloning & Installing Dependencies

The first step is to clone this repository. Navigate with `cd` to a folder of your choice (such as `~/Desktop`) and then run:

```sh
git clone https://github.com/mattdesl/workshop-generative-art.git
```

This will create a new folder called `workshop-generative-art` and download all the source code into it. Next, move into the folder and install its dependencies:

```sh
# Move into the folder
cd workshop-generative-art

# Install its dependencies
npm install
```

# Installing `canvas-sketch-cli`

If you haven't already, you will need to install the `canvas-sketch` command-line tool *globally* like so:

```sh
npm install canvas-sketch-cli --global
```

> :bulb: Note the `-cli` suffix in the name; this tells npm to install the CLI tool, not the code library.

Once installed, you won't need to run this again unless you want to update to a new version of `canvas-sketch-cli`.

# Running & Editing a Sketch

Once you've installed the CLI tool globally, `cd` into this repository folder and you can run each individual sketch with the `canvas-sketch` command, like so:

```sh
canvas-sketch src/2d/01-grid.js --open
```

The optional `--open` flag will open your default browser to the development server's URL, which is the same as [http://localhost:9966](http://localhost:9966).

Now, edit your JavaScript files and the browser will reload automatically.

# Creating New Sketches

You can create a new sketch with the `--new` flag, which will write out a plain sketch file and start a development server so you can then edit it:

```sh
canvas-sketch src/my-new-sketch.js --new --open
```

# Bundling to a Static Website

Once you are happy with your sketch, you can create a static website by bundling it up to a single HTML file. You can use the `--build` command, and `--inline` which will wrap all the JavaScript into an inline script tag so that you end up with just a single file for your site.

```sh
canvas-sketch src/my-new-sketch.js --build --inline
```

Try double-clicking the exported HTML file to see your website. This file can be shared on your favourite website host, like [Neocities](https://neocities.org/).

You can also turn on debugging (source maps) with the `--no-compress` option.

## 

#### <sup>[← Back to Documentation](../README.md)