var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
    var template = require(req.app.get('views') + '/create/site.marko');
    // var article  = new Article({
    //     title : 'bli bla blub',
    //     url   : '#',
    //     text  : 'title text blibla blub fallerie fallera holahopsasa und so weiter und so fort'
    // });
    Article.find(function (err, articles) {
        if (err) return next(err);
        template.render({
            title: 'CMS Create Site',
            articles: articles,
            includes: {
                main_menu: require(req.app.get('views') + "/components/link.main-menu.marko")
            }
        }, res);
    });
});
