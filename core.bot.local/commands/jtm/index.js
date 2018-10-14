module.exports = function jtm (args = []) {

    let jsdoc2md, here = process.cwd();

    function run(){
        let path = require('path');
        let fs = require('fs');
        let docs = jsdoc2md.renderSync({ files: path.join(here, args[0] || 'index.js') });
        fs.writeFileSync(path.join(args[1] || 'README.md'), docs);
        bot.log('#green(done)');
        process.exit();
    }
    try{
        jsdoc2md = require('jsdoc-to-markdown');
        run()
    }
    catch(err){
        bot.exec('npm i --save jsdoc-to-markdown', { cwd: __dirname }, () => {
            jsdoc2md = require('jsdoc-to-markdown');
            run();
        })
    }
    
};