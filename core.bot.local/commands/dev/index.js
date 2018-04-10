
const path = require('path');
const fs = require('fs');
const http = require('http');

const config = require('./config');
const here = process.cwd();

module.exports = function dev (port) {

    port = port || config.port;

    http.createServer(function(req, res){

        var str = ['core.build('];
        req.on('data', (chunk) => {
            str.push(chunk.toString())
        });
        req.on('end', () => {
    
            str.push(');');
            fs.writeFile(path.resolve(here, 'coreObject.js'), str.join(''), function(err){
                res.end('ok');
            });
        });
    
    }).listen(port);

    core.log(`#green(dev server at port ${ port  })`)

};

module.exports.help = `
    ● run a dev server that will save client core objects.
`;