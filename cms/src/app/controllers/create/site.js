var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
    var article = new Article({
        title : 'bli bla blub',
        url   : '#',
        text  : 'title text blibla blub fallerie fallera holahopsasa und so weiter und so fort'
    });
    var viewPath         = req.app.get('views');
    var resolvedTemplate = require.resolve(viewPath + '/create/site.marko');
    var template         = require('marko').load(resolvedTemplate);
    // article.save(function (err, data) {
    //     if (err) console.log(err);
    //     else console.log('Saved : ', data );
    // });
    Article.find(function (err, articles) {
        if (err) return next(err);
        template.render({
            title: 'CMS Create Site',
            articles: articles
        }, res);
    });
});
