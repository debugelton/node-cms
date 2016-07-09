'use strict';
var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create', function (req, res, next) {
    var template = require(req.app.get('views') + '/create.marko');
    Article.find(function (err, articles) {
        if (err) return next(err);
        console.log(articles);
        template.render({
            title: 'CMS Manager',
            articles: articles,
            includes: {
                main_menu: require(req.app.get('views') + "/components/link.main-menu.marko")
            }
        }, res);
    });
});
