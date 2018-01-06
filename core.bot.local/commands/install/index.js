module.exports = function install (name, g) {
    
    const path = require('path');
    const isGlobal = [].indexOf.call(arguments, '-g') > -1;

    const fPath = isGlobal ? bot.paths.global : bot.paths.local;

    bot.exec(['npm', 'install', name], { 
        cwd: fPath,
    }, (code) => {
        console.log(``);
        console.log(name.blue, '=>'.green, path.join(fPath, 'node_modules', name).blue);
        process.exit();
    });


};

module.exports.help = `
    ● installs #purple(name) in the #yellow(core.bot.local) directory.
    ● if there is no #yellow(core.bot.local) directory, #purple(name) is installed in the global bot.
    #red(-g) - force a global installation.
`;