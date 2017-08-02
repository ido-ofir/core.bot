
var path = require('path');

var here = process.cwd();

module.exports = function local () {

    var folder = core.read(core.bot.path);
    var fPath = path.join(here, 'core.bot.local');
    core.write(fPath, folder);
    console.log(`=> ${ fPath }`.green)
    process.exit();
    
};