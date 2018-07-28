var React = require('react');
var ReactDom = require('react-dom');
var core = require('core.web');

// core.plugin([
//     require('./plugin'),
//     require('./plugin2')
// ]);

core.require([
    //'plugin.Component'
], Component => 
    ReactDom.render(<div><h1>App</h1></div>, document.getElementById('app'))
)


