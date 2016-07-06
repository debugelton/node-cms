var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create', function (req, res, next) {
    var viewPath         = req.app.get('views');
    var resolvedTemplate = require.resolve(viewPath + '/create.marko');
    var template         = require('marko').load(resolvedTemplate);
    Article.find(function (err, articles) {
        if (err) return next(err);
        template.render({
            title: 'CMS Manager',
            articles: articles
        }, res);
    });
});
