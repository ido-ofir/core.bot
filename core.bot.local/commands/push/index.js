
const path = require('path');
const { spawn } = require('child_process');


/**
 * push
 * @param {string} message 
 * @param {string} branch 
 */


module.exports = function push (message, branch) {

    var here = process.cwd();

    branch = branch || 'master';
    message = message || 'First Commit';

    function push(){
        core.exec(['git', 'push', '-u', 'origin', branch ], process.exit);
    }

    function commit(){
        core.exec(['git', 'commit', '-m', message ], push);
    }

    function add(){
        core.exec('git add .', commit);
    }

    add();
};

module.exports.help = `
    add all files and push to git
`;