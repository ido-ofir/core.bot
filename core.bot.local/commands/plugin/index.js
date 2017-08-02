var fs = require('fs');
var path = require('path');


module.exports = function (name, folder) {

    var here = process.cwd();
    try {
        var fPath = path.join(here, folder || '', name);
        var template = core.template.from(path.join(__dirname, 'template'), { name: name });
        template[`${name}.test.js`] = template[`test.js`];
        delete template[`test.js`];
        template[`${name}.js`] = template[`plugin.js`];
        delete template[`plugin.js`];
        core.write(fPath, template);
        console.log(`plugin ${ name } => ${ fPath } ok`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `plugin '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};