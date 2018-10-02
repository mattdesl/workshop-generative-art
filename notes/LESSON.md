# tools

Chrome, Terminal, Node.js/npm, VSCode, canvas-sketch

# install canvas-sketch

Before starting, install the generative art toolkit with node/npm commands:

```sh
npm install canvas-sketch-cli -g
```

> Notice the `-cli` at the end! This is the 'command line interface' for the canvas-sketch toolkit.

The `-g` flag will install it globally. Once installed, it should provide you with a `canvas-sketch` command that you can enter into terminal. Let's test it to be sure:

```sh
canvas-sketch --version
```

It will give an error because you haven't passed any JavaScript files — so now we can 

# make a folder

Open Terminal and navigate to a folder of your choice, like `~/Documents` or your desktop.

Then, createa a new folder and move into it:

```sh
mkdir generative-sketches
cd generative-sketches
```

Now let's create a new folder within that, it will hold all our JavaScript:

```sh
mkdir src
```

# make a sketch

Now that we have a `src` folder, let's make a new sketch that draws a grid.

We use the `canvas-sketch` command-line tool to stub out a new file and run a local development server.

```sh
canvas-sketch src/simple-grid.js --new --open
```

The `--new` flag tells the tool to write a new file from a basic template. The `src/simple-grid.js` is the path to the new file we wish to create. The `--open` flag will launch the browser to our development server's URL.

# development server

Now we're running a development server on your local IP. You can access it with [http://localhost:9966/](http://localhost:9966/) or by hitting the IP directly that is logged from the `canvas-sketch` tool. You can also access this URL from your mobile phone if you're on the same WiFi network.

# `canvas-sketch` concepts

## renderer

## settings

## "pure functions"

## exporting

# EXAMPLE: make a grid of points

- create UV coordinates

# EXAMPLE: shift the grid in with a margin

## SLIDES: `lerp`

- use `lerp` for linear interpolation

# EXAMPLE: remove some random % of squares

- use `Math.random()`
