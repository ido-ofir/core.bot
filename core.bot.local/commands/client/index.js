var fs = require('fs');
var path = require('path');
const { spawn } = require('child_process');


module.exports = function (name) {

    var here = process.cwd();
    try {

        var camel = name[0].toUpperCase() + name.slice(1);
        var component = `${name}.${camel}`;
        var context = { name: name, component: component };
        var templatePath = path.join(__dirname, 'template');
        // var componentTemplatePath = path.resolve(__dirname, '../', 'component', 'template');

        var template = core.template.from(templatePath, context);
        // var componentTemplate = core.template.from(componentTemplatePath, { name: component });
        var fPath = path.join(here, name);
        core.write(fPath, template);
        const install = spawn('npm', ['install'], { 
            cwd: fPath,
            stdio: ['pipe', process.stdout, process.stderr]
        });
        install.on('close', (code) => {
            console.log(``);
            console.log(`created client ${ name }.`.green);
            process.exit();
        });

    } catch (err) {

        if (err.errno === -17) {
            throw `client '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};