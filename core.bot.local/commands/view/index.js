var fs = require('fs');
var path = require('path');


module.exports = function (name, plugin) {

    var here = process.cwd();
    try {
        var fPath = path.join(here, name);
        var templatePath = path.join(__dirname, 'template');
        var template = core.template.from(templatePath, { name: name, plugin: plugin });
        template[`${name}.test.js`] = template[`test.js`];
        delete template[`test.js`];
        template[`${name}.jsx`] = template[`view.jsx`];
        delete template[`view.jsx`];
        core.write(fPath, template);
        console.log(`view '${ name }' => ${ fPath }`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `view '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};