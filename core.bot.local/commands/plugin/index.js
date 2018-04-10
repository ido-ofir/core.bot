var fs = require('fs');
var path = require('path');
var here = process.cwd();


module.exports = function (name, folder) {

    try {
        var fPath = path.join(here, folder || '', name);
        var template = core.template.from(path.join(__dirname, 'template'), { name: name });
        template[`${name}.test.js`] = template[`test.js`];
        delete template[`test.js`];
        template[`${name}.js`] = template[`plugin.js`];
        delete template[`plugin.js`];
        core.write(fPath, template, { failWhenExists: true });
        console.log(`plugin '${ name }' => ${ fPath } ok`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `plugin '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};

module.exports.help = `
    ● create a new plugin called #purple(name) in #yellow('${here}').
`;