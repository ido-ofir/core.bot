
var express = require('express');
var server = require('core.node.server');

var config = require('./config');

server.listen(config.port, function(err){
    if(err){ throw err; }
    console.log(`listening at port ${config.port}`.green);
});
