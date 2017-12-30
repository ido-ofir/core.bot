module.exports = function up (args) {

    var here = process.cwd();
    var path = require('path');
    
    core.write(core.bot.globalPath, core.read(core.bot.localPath));
    console.log(core.bot.localPath.yellow, '=>'.green, core.bot.globalPath.yellow);

    process.exit();

};