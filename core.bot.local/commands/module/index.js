var fs = require('fs');
var path = require('path');
var here = process.cwd();


module.exports = function (name, plugin) {

    try {
        var fPath = path.join(here, name);
        var templatePath = path.join(__dirname, 'template');
        var template = core.template.from(templatePath, { name: name, plugin: plugin });
        template[`${name}.test.js`] = template[`test.js`];
        delete template[`test.js`];
        template[`${name}.js`] = template[`module.js`];
        delete template[`module.js`];
        core.write(fPath, template, { failWhenExists: true });
        console.log(`module '${ name }' => ${ fPath }`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `module '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};

module.exports.help = `
    ● create a new module called #purple(name) in #yellow('${here}').
    ● if #purple(plugin) is provided it will be prepended to #purple(name).
`;