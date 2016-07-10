var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
    var templatePath = req.app.get('views');
    var template = require(templatePath + '/create/site.marko');
    // var article  = new Article({
    //     title : 'bli bla blub',
    //     url   : '#',
    //     text  : 'title text blibla blub fallerie fallera holahopsasa und so weiter und so fort'
    // });
    Article.find(function (err, articles) {
        if (err) return next(err);
        template.render({
            title: 'CMS Home',
            articles: articles,
            includes: {
                main_menu: require(templatePath + "/components/link.main-menu.marko"),
                header: require(templatePath + "/components/header/header.marko")
            }
        }, res);
    });
});


router.post('/create/site', function (req, res, next) {
    var templatePath = req.app.get('views');
    var template = require(templatePath + '/create/site.marko');
    var params = req.body;
    template.render({
        title: 'CMS Home',
        params: params,
        includes: {
            main_menu: require(templatePath + "/components/link.main-menu.marko"),
            header: require(templatePath + "/components/header/header.marko")
        }
    }, res);

    // req.redirect(302, '/create/site');
});