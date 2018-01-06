
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

function help (args) {

    var here = process.cwd();

    var fs = require('fs');
    var path = require('path');

    var commands = fs.readdirSync(path.join(bot.paths.local, 'commands'))
    bot.log();
    commands.map(function(command){
        if(command && (command !== 'index.js')){
            var f = require('../' + command);
            var params = getParamNames(f);
            if(f.help){
                var clean = [command].concat(params).join(' ');
                var str = [command.green].concat(params.map(function (t){ return t.purple; })).join(' ');
                bot.log(str);
                bot.log(clean.split('').map(function(t) { return '='; }).join('').blue);
                bot.log(f.help);
            }
        }
    });


    process.exit();

};

help.help = `
    prints this list of help for commands.
    commands should define a string property called 'help' on the command function.
`;

module.exports = help;