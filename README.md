# core.bot

A dynamic node task runner.

### Installation
Install globaly with npm.
```sh
npm install -g core.bot
```

### Usage

Test your installation:
```sh
bot
```
You should drop into a <a href="https://nodejs.org/api/repl.html#repl_repl">repl</a> which means the installation was successful. ( press CTRL-C twice to exit )

The bot was designed to allow you to execute your own commands, in a specific area of your file system, like a project folder. It does so by dumping most of it's source code into a local folder called 'core.bot.local'. the location of a 'core.bot.local' is up to you but the commands in a local will only be accessible from the location of the local and downwards.

To create a local, go to the root of a project ( or a projects directory ) and run:
```sh
bot local
```
This will create a folder called `core.bot.local`, that looks like this:
```
|-commands
|-plugins
|-index.js
```
Whenever you run `bot` from within your project now, the bot finds this folder and runs the 'index.js' file.

### Commands

If you look into 'index.js' you will see that the first argument that you pass to `bot` is treated as a path to a command folder. this means that whatever you put into the `core.bot.local/commands` folder, will be available as a command across your project.


navigate to a folder inside your project and test one of the commands, for example `module`:

```sh
cd ./modules
bot module YOUR_MODULE_NAME
```
### Available commands

These commands are available out of the box:

* __module__ - create a core module. expects a name as the only argument.
* __component__ - create a core component. expects a name as the only argument.
* __view__ - create a core view. expects a name as the only argument.
* __plugin__ - create a core plugin. expects a name as the only argument.
* __action__ - create a core action. expects a name as the only argument.
* __client__ - create a core web client. expects a name as the only argument.
* __command__ - create a core.bot command. expects a name as the only argument.
* __local__ - create a core.bot.local with the bot's source code.

Once you run `bot local` you can step into `core.bot.local/commands` and edit these commands as much as you like. your changes will apply the next time you run the bot.

If you want to create a new command you only nee to add a folder with your command to `core.bot.local/commands`, and you can use the bot to do that for you:

```sh
cd core.bot.local/commands
bot command COMMAND_NAME
```

### How does it work

When you run a command from the cli (`bot [COMMAND] [ARGUMENTS]`), the bot is looking for a `core.bot.local` folder in the working directory. if it does not find one it keeps looking upwards in the file system until one is found. if no `core.bot.local` folder is found in the current file system tree the bot will use it's internal copy of this folder.

The content of this folder determines what happens next as the bot's only job is to execute it.
