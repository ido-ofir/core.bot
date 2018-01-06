module.exports = function up () {

    var here = process.cwd();
    var path = require('path');
    
    core.write(core.paths.global, core.read(core.paths.local));
    console.log(core.paths.global.yellow, '=>'.green, core.paths.local.yellow);

    process.exit();

};

module.exports.help = `
    ● push the local #yellow(core.bot.local) directory to the global #yellow(core.bot) installation.
    ● commands defined in this directory will then become available across your machine.
    ● the previous state will be deleted. use #yellow('bot local') before this command to backup the current state.
`;