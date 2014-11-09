var config  = require('./config');
var express = require('express');

config.root = __dirname;

var app = express();
require('./config/express')(app, config)

//Loading routes
require('./config/routes')(app)

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});