var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');
var Site      = mongoose.model('Site');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
    var templatePath = req.app.get('views');
    var template = require(templatePath + '/create/site.marko');
    // var site  = new Site({
    //     title : 'bli bla blub',
    //     url   : '#',
    //     text  : 'title text blibla blub fallerie fallera holahopsasa und so weiter und so fort'
    // });
    Site.find(function (err, sites) {
        if (err) return next(err);
        template.render({
            title: 'CMS Home',
            sites: sites,
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
    var site  = new Site({
        title : params.title,
        route   : params.route
    });
    site.save();
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