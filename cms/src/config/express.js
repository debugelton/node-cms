var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');


require('marko/express'); //enable res.marko
require('marko/node-require').install();

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.viewPath);
  // app.set('view engine', 'marko');

  app.use(favicon(config.root + '/public/favicons/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){

    app.use(function (err, req, res, next) {
      var templatePath = require.resolve('../app/views/error.marko');
      var template     = require('marko').load(templatePath);
      res.status(err.status || 500);
      template.render({
        message: err.message,
        error: err,
        title: 'error'
      }, req);
    });

    require('marko/hot-reload').enable();
    require('fs').watch(config.viewPath, function (event, filename) {
        if (/\.marko$/.test(filename)) {
            // Resolve the filename to a full template path:
            var templatePath = require("path").join(config.viewPath, filename);

            console.log('Marko template modified: ', templatePath);

            // Pass along the *full* template path to marko
            require('marko/hot-reload').handleFileModified(templatePath);
        }
    });

  }

  app.use(function (err, req, res, next) {
    var templatePath = require.resolve('../app/views/error.marko');
    var template     = require('marko').load(templatePath);
    res.status(err.status || 500);
      template.render({
        message: err.message,
        error: {},
        title: 'error'
      }, req);
  });

};
