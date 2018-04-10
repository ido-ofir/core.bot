
const path = require('path');
const { spawn } = require('child_process');




module.exports = function server (name) {

    var here = process.cwd();
    try {
        var fPath = path.join(here, name);
        var templatePath = path.join(__dirname, 'template');
        var template = core.template.from(templatePath, { name: name });
        core.write(fPath, template, { failWhenExists: true });
        const i = spawn('npm', ['install'], { 
            cwd: fPath,
            stdio: ['pipe', process.stdout, process.stderr]
        });
        i.on('close', (code) => {
            console.log(``);
            console.log(`server '${ name }' => ${ fPath }`.green);
            process.exit();
        });
       

    } catch (err) {

        if (err.errno === -17) {
            throw `component '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};

module.exports.help = `
    ● create a new directory as the root of a node http-server application.
    ● install #cyan('express'), #cyan('body-parser'), #cyan('method-override') and #cyan('colors') from npm.
`;