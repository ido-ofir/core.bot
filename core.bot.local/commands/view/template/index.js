
module.exports = require('./<% name %>.jsx');

if(module.hot) {
    module.hot.accept('./<% name %>.jsx', function() {

        var <% name %> = require('./<% name %>.jsx');
        <% plugin ? (name + ".name = '" + plugin + "." + name + "';") : '' %>
        core.injector.revoke(<% name %>.name);
        core.View(<% name %>);
        core.emit('hotUpdate');
        
    });
}