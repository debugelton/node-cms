var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Site     = mongoose.model('Site');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
    var templatePath = req.app.get('views');
    var template = require(templatePath + '/create/site.marko');
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
    var params = req.body;
    var site  = new Site({
        title : params.title,
        route   : params.route
    });
    site.save();
    res.redirect('/create/site');
});