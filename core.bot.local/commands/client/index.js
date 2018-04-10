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
        core.write(fPath, template, { failWhenExists: true });
        var production = this.flags['-p'] || this.flags['--production'];
        var args = ['npm', 'install'];
        if(production){
            args.push('--production');
        }
        core.exec(args, { cwd: fPath }, (code) => {
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

module.exports.help = `
    ● create a new directory called #purple(name) as the root of a new web client application.
    ● install dependencies through npm.

    #red(-p) / #red(--production) - fast install without #yellow(devDependencies). this will install only #cyan('core.web'), #cyan('react') and #cyan('react-dom').
`;