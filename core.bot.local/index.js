
var fs = require('fs');
var { join } = require('path');

// an array of the cli arguments that you've passed after `core.bot`.
// removing 'node' and 'core.bot'.
var args = process.argv.slice(2); 

// full path to the 'commands' folder.
var commandsPath = join(__dirname, 'commands');

// full path to the 'node_modules' folder.
var nodeModulesPath = join(__dirname, 'node_modules');

// names of all modules in the 'node_modules' folder.
var names = fs.readdirSync( nodeModulesPath );

// require all modules in the 'node_modules' folder that have a name that starts with 'core.'.
var plugins = [];
names.map(name => {
    if(name.indexOf('core.') === 0){
        plugins.push(require( join(nodeModulesPath, name) ))
    }
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