var fs = require('fs');
var path = require('path');


module.exports = function (name) {

    var here = process.cwd();
    try {
        var fPath = path.join(here, name);
        var templatePath = path.join(__dirname, 'template');
        var template = core.template.from(templatePath, { name: name });
        template[`${name}.test.js`] = template[`test.js`];
        delete template[`test.js`];
        template[`${name}.js`] = template[`action.js`];
        delete template[`action.js`];
        core.write(fPath, template, { failWhenExists: true });
        console.log(`action '${ name }' => ${ fPath }`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `action '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};

module.exports.help = `
    ● creates a new action called #purple(name).
`