#### <sup>:closed_book: [workshop-generative-art](../README.md) → Command-Line Tips & Suggestions</sup>

---

# Command-Line Tips & Suggestions

In this workshop we will only use a few operations from the command-line:

## `cd`

To change directory, you can use the `cd` command:

```sh
# Set directory to './some-folder/'
cd some-folder/

# Set directory up one
cd ../

# Set directory up one and into foobar/
cd ../foobar
```

## `mkdir`

To make a new directory, you can use `mkdir` command. The following will create a new folder in your current working directory called `foo-bar`:

```sh
mkdir foo-bar
```

## `npm`

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

## `ls` or `dir`

You can list all files in your current working directory with the `ls` command in macOS, or `dir` command in Windows.

> If you are using a Unix-style command-line in Windows, like [cmder](http://cmder.net/), then you can use `ls` instead of `dir`.

## `code .`

You can set up VSCode as a terminal command for quickly opening files and folders:

1. Open VSCode and select View > Command Palette, then type in "install command" and select **Shell Command: Install 'code' command in PATH**
2. Now, after restarting your Terminal application, you should be able to enter `code .` (open current folder) to open VSCode to that folder

## `open .`

In macOS Terminal, you can enter `open .` to open the current working directory in Finder.

## Keyboard Shortcuts

- *Tab Completion* — Many terminal applications (macOS Terminal and cmder.exe) will support Tab Completion. Start typing a folder name and hit the Tab key, and it will auto-complete to a matched folder name that already exists. Hit it twice to display all matches.
- *Previous/Next Command* — You can use the Up and Down arrow keys to repeat previous commands
- *Stop Program* — You can push `Ctrl + C` to kill a program, like the canvas-sketch development environment.
- *New Terminal Tab* — In macOS Terminal, you can push `Cmd + T` to open a new tab from the same folder

## 

#### <sup>[← Back to Documentation](../README.md)