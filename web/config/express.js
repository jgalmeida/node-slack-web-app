var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var multer         = require('multer');
var errorHandler   = require('errorhandler');

function boot(app, config) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(config.root, 'views'));
  app.set('view engine', 'jade');
  app.set('view options', {layout: true});

  app.use(logger('dev'));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer());
  app.use(express.static(path.join(config.root, 'public')));

  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }
}

module.exports = boot