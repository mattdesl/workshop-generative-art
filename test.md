
- [Prerequisites](#Prerequisites)

  - [Using the Command-Line](#using-the-command-line)

  - [Installing Node.js & npm](#installing-nodejs--npm)

- [Libraries & Docs](#libraries--docs)

- [Running the Code Examples](#running-the-code-examples)

- [Tips for Using the Command-Line](#tips-for-using-the-command-line)

- [Further Reading](#further-reading)


# Prerequisites

Before starting the workshop, please make sure you've installed the latest version of [Node.js](https://nodejs.org/en/) and [npm](https://npmjs.com/) and that you can use these tools directly from your command-line interface. In macOS, you can use the Terminal app, and in Windows you can use cmd.exe or [cmder.net](http://cmder.net/). For writing JavaScript, I recommend [VSCode](https://code.visualstudio.com/) as a code editor. I also suggest using Chrome as your development browser.

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

- Canvas API [[docs](https://developer.mozilla.org/kab/docs/Web/API/Canvas_API)] 

  - 2D and WebGL features on the `<canvas>` tag

- [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch/) [[docs](https://github.com/mattdesl/canvas-sketch/tree/master/docs)]

  - A development tool for Generative Art

- [`canvas-sketch-util`](https://github.com/mattdesl/canvas-sketch-util/) [[docs](https://github.com/mattdesl/canvas-sketch-util/tree/master/docs)]

  - Utilities for Math & Random Number Generation

- [ThreeJS](https://threejs.org/) [[docs](https://threejs.org/docs/)]

  - A Rendering Engine for WebGL

# Running the Code Examples

Students will not need to clone this repository during the lesson. 

However, you can find instructions on cloning & running the examples from source in [src/README.md](./src/README.md).

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
