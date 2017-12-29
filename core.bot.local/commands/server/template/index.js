
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var colors = require('colors');

var config = require('./config');

var app = express();
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(config.port, function(err){
    if(err){ throw err; }
    console.log(`listening at port ${config.port}`.green);
});
