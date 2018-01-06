
var path = require('path');

var here = process.cwd();

module.exports = function local () {

    var folder = core.read(core.bot.path);
    var fPath = path.join(here, 'core.bot.local');
    core.write(fPath, folder);
    console.log(`=> ${ fPath }`.green)
    process.exit();
    
};

module.exports.help = `
    ● create a #yellow(core.bot.local) directory which holds a copy of the bot.
    ● running #yellow(bot) inside the current directory will use the local bot instead of the global installation.
`;