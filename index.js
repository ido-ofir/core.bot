var fs = require('fs');
var path = require('path');

var Core = require('core.skeleton');

function getLocalPath(pathArray){
    var fPath = pathArray.concat(['core.bot.local']).join(path.sep);
    try{
        var stat = fs.statSync(fPath);
        if(stat.isDirectory()){
            return fPath;
        }
    }
    catch(err){
        if(!pathArray.pop()) return;
        if(!pathArray.length) return;
        return getLocalPath(pathArray);
    }
}

var globalPath = path.join(__dirname, 'core.bot.local');
var localPath = getLocalPath(process.cwd().split(path.sep));
var botPath = localPath || globalPath;

var core = global.core = new Core({
    name: 'core.bot',
    extend: {
        bot: {
            path: botPath
        }        
    }
});

require(botPath);