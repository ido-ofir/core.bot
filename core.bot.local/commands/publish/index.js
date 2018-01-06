module.exports = function publish (desc, version) {

    var here = process.cwd();
    const path = require('path');
    const fs = require('fs');
    const { spawn } = require('child_process');

    function exec(com, args, done){
        const i = spawn(com, args, { 
            cwd: fPath,
            stdio: ['pipe', process.stdout, process.stderr]
        });
        i.on('close', done);
    }

    function publish(){
        exec('npm', ['publish'], process.exit);
    }

    function push(){
        exec('git', ['push'], publish);
    }

    function commit(){
        exec('git', ['commit', '-m', `"${ desc }"`], push);
    }

    function add(){
        exec('git', ['add', '.'], commit);
    }

    function bump(){
        var pck = require(path.join(here, `./package.json`));
        var oldVersion = pck.version.split('.');
        var types = ['major', 'minor', 'patch'];
        var type = 'patch';
        var index = types.indexOf(type);
        var newVertion = oldVersion.map(function(t, i){
            return (i === index) ? String(parseInt(t) + 1) : t;
        });
        pck.version = version || newVertion.join('.');
        core.write(here, {
            'package.json': JSON.stringify(pck, null, 4)
        });
        add();
    }

    bump();

};

module.exports.help = `
    ● bump the npm version as a patch.
    ● add all files, commit and push to git.
    ● publish to npm
`;