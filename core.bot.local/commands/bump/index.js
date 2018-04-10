
const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports = function bump (name) {

    if(name){ 
        process.chdir(name);
    }
    
    var here = process.cwd();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    var pkgPath = name ? path.join(here, name,'package.json') : path.join(here, 'package.json');
    var pkg = require(pkgPath);
    var lastVersion = pkg.version;
    var version = lastVersion.split('.');
    var patch = parseInt(version[version.length - 1]);
    version[version.length - 1] = patch + 1;
    var v = version.join('.');
    rl.question('Version (' + lastVersion + ' => ' + v + '):', function(version){
        pkg.version = version || v;
        var msg = ('bump to ' + pkg.version);
        rl.question('Message (' + msg + '):', function(message){
            msg = (message || msg);
            rl.close();
            fs.writeFile(pkgPath, JSON.stringify(pkg, null, 4), function(){
                bot.exec('git add .', function(err){
                    if(err){ throw err; } //
                    msg = (msg || 'bump to ' + pkg.version);
                    bot.exec('git commit -m "' + msg + '"', function(err){
                        if(err){ throw err; }
                        bot.exec('git push', function(err){
                            if(err){ throw err; }
                            bot.exec('npm publish', function(err){
                                if(err){ throw err; }
                                bot.log('#green(bumped to version) #yellow(' +  pkg.version + '), #green(commited and published)');
                                process.exit();
                            });
                        });
                    });
                });
            });
        });
    });

    

};