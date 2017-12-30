
const path = require('path');
const { spawn } = require('child_process');


/**
 * push
 * @param {string} name 
 * @param {s} commit 
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