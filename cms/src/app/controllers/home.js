'use strict';
var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    var viewPath         = req.app.get('views');
    var template         = require(viewPath + '/index.marko');

    template.stream({
      title: 'CMS Manager',
      includes: {
        main_menu: require(viewPath + '/components/link.main-menu.marko'),
        header: require(req.app.get('views') + "/components/header/header.marko")
      }
    }).pipe(res);
});
