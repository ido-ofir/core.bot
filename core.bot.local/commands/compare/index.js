
var here = process.cwd();
module.exports = function compare (name) {


    var fs = require('fs');
    var path = require('path');

    if(!name){
        bot.log('#red(please provide a name of a module to compare, as in) #yellow(bot compare core.web)');
        return process.exit();
    }

    var thisFolder = fs.readdirSync(here);
    var ignore = ['node_modules', 'package.json', name];
    var pck = require(path.join(here, name, `./package.json`));
    var dependencies = pck.dependencies;
    thisFolder.forEach(function(t){
        if(!t){ return; };
        if(ignore.indexOf[t] > -1){ return; };
        if(!dependencies[t]){ return; }
        var version = require(path.join(here, t, `./package.json`)).version;
        if(!version) { return; }
        var color = (dependencies[t] === version) ? '#green' : '#red';
        bot.log(`${ color }(${ t }) #yellow(${ dependencies[t] }) ${ color }(=>) #yellow(${ version })`);
    });
    
    process.exit();

};

module.exports.help = `
    ● compares #purple(name)'s dependency tree with all the other packages in #yellow(${here}).
`;