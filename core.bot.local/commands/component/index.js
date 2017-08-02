var fs = require('fs');
var path = require('path');


module.exports = function (name) {

    var here = process.cwd();
    try {

        core.parseFolder(path.join(__dirname, 'template'), path.join(here, name), { name: name });
        console.log(`created component ${ name }.`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `component '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};