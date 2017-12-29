
module.exports = require('./<% name %>.js');

if(module.hot) {
    module.hot.accept('./<% name %>.js', function() {

        var <% name %> = require('./<% name %>.js');
        <% plugin ? (name + ".name = '" + plugin + "." + name + "';") : '' %>
        core.injector.revoke(<% name %>.name);
        core.Type(<% name %>);
        core.emit('hotUpdate');

    });
}