module.exports = function install (name, g) {
    
    const isGlobal = [].indexOf.call(arguments, '-g') > -1;

    const fPath = isGlobal ? core.bot.globalPath : core.bot.localPath;

    const { spawn } = require('child_process');
    const path = require('path');
    
    const install = spawn('npm', ['install', name], { 
        cwd: fPath,
        stdio: ['pipe', process.stdout, process.stderr]
    });

    install.on('close', (code) => {
        console.log(``);
        console.log(name.blue, '=>'.green, path.join(fPath, 'node_modules', name).blue);
        process.exit();
    });
    // console.log(`'install' in '${ here }'`.green);

};