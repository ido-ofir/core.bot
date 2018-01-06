module.exports = function link (args) {

    var here = process.cwd();
    
    var fs = require('fs');
    var path = require('path');
    var folders = fs.readdirSync(here);

    folders.forEach(function(folder){
        if(folder.indexOf('core.') === 0){
            var link = path.join(here, 'node_modules', folder);
            var modul = path.join(here, folder);
            try{
                fs.unlinkSync(link);
            }
            catch(err){

            }
            finally{
                fs.symlinkSync(modul, link);
                core.log('+', folder.yellow)
            }
        }
    });

    process.exit();

};

module.exports.help = `
    create a symlink in the #yellow(node_modules) folder for each #yellow(core.*) folder in the current directory
`;