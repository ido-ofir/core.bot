
module.exports = require('./<% name %>.js');

if(module.hot) {
    module.hot.accept('./<% name %>.js', function() {
        var plugin = require('./<% name %>.js');
        core.reloadPlugin(plugin);
    });
}