module.exports = function clear (args) {

    var here = process.cwd();
    var fs = require('fs');
    var path = require('path');

    var dir = fs.readdirSync(path.join(here, 'node_modules'));
    dir.map(function (f){
        if(f.indexOf('core.') === 0){
            bot.delete(path.join(here, 'node_modules', f))
        }
    });

    process.exit();

};