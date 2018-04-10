module.exports = function upgrade (name) {
    
    var here = process.cwd();
    var targetPackagePath = path.join(here, name, 'package.json');
    var targetPackage, dependencyPackage, dependencyPackagePath;
    try{
        targetPackage = require(targetPackagePath);
    }
    catch(err){
        return core.log(`#red(cannot find package at) #yellow(${targetPackagePath})`)
    }

    var upgrades = 0;
    
    for(var key in targetPackage.dependencies){
        try{
            if(key.indexOf('core.') === 0){
                dependencyPackagePath = path.join(here, key, 'package.json');
                dependencyPackage = require(dependencyPackagePath);
                if(targetPackage.dependencies[key] !== dependencyPackage.version){
                    bot.log(`#purple(${key}) #yellow(${ targetPackage.dependencies[key] }) #green(=>) #yellow(${dependencyPackage.version})`);
                    targetPackage.dependencies[key] = dependencyPackage.version;
                    upgrades += 1;
                }

            }
            
        }
        catch(err){
            return core.log(`#red(cannot find package at) #yellow(${pkgPath})`)
        }
    }

    if(!upgrades){
        bot.log(`#green(up to date)`);
        return process.exit();
    }

    fs.writeFile(targetPackagePath, JSON.stringify(targetPackage, null, 4), () => {

        bot.log(`#green(upgraded ${ upgrades } modules)`);

        process.exit();
    });
    

};