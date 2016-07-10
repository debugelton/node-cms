'use strict';
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo:27017/app-development'
  },

  test: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo:27017/app-test'
  },

  production: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo:27017/app-production'
  }
};

module.exports = config[env];
