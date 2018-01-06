
var path = require('path');
var fs = require('fs');
var here = process.cwd();

module.exports = function clear (args) {


    var dir = fs.readdirSync(path.join(here, 'node_modules'));
    dir.map(function (f){
        if(f.indexOf('core.') === 0){
            bot.delete(path.join(here, 'node_modules', f))
        }
    });

    process.exit();

};

module.exports.help = `
    ● clears all #yellow(core.*) modules from #yellow(${ path.join(here, 'node_modules') }). 
`