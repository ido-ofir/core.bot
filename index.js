var fs = require('fs');
var path = require('path');

var Core = require('core.constructor');

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
var localPath = getLocalPath(process.cwd().split(path.sep)) || globalPath;

var core = global.core = global.bot = new Core({
    name: 'core.bot',
    extend: {
        paths: {
            global: globalPath,
            local: localPath
        }        
    }
});

require(localPath);