
var fs = require('fs');
var { join } = require('path');

// an array of the cli arguments that you've passed after `core.bot`.
// removing 'node' and 'core.bot'.
var args = process.argv.slice(2); 

// full path to the 'commands' folder.
var commandsPath = join(__dirname, 'commands');

// full path to the 'plugins' folder.
var pluginsPath = join(__dirname, 'plugins');

// names of all plugins in the 'plugins' folder.
var names = fs.readdirSync( pluginsPath );

// require all plugins in the 'plugins' folder.
var plugins = names.map(name => {
    return require( join(pluginsPath, name) );
});

// load all plugins to core.
core.plugin(plugins);

// full path to the command.
var commandPath = join(__dirname, 'commands', args.shift() || '');

// require the command module
var command = require(commandPath);

// if it's a function call it with the rest of the arguments.
if(core.isFunction(command)){
    command.apply(core, args);
}