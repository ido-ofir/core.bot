var fs = require('fs');
var path = require('path');
var here = process.cwd();


module.exports = function (name) {

    try {

        core.parseFolder(path.join(__dirname, 'template'), path.join(here, name), { name: name });
        console.log(`created command ${ name }.`.green);
        process.exit();

    } catch (err) {

        if (err.errno === -17) {
            throw `command '${ name }' already exists.`.red;
        } else {
            throw err;
        }

    }

};

module.exports.help = `
    ● create a new command in #yellow("${ here }").
`;