'use strict';
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Site     = mongoose.model('Site');
var fs       = require('fs');
var utils    = {
    form: require('../../../lib/controller/form')
};

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
    var site = {};
    var required = [{'route': 'string'}, {'title': 'string'}];

    if (utils.form.is_required(required, params).length === 0) {
        site = new Site({
            title : params.title,
            route   : params.route
        });
        site.save();
        var dataPath = "../www/src/app";
        var fileName = params.route.split("/").pop();
        

        fs.mkdir(dataPath + "/controllers" + params.route, function (err) {
            fs.writeFile(dataPath + "/controllers" + params.route + "/" + fileName, '', function (err) {
              if (err) throw err;
              console.log('It\'s saved!');
            });
        });

        fs.mkdir(dataPath + "/views" + params.route, function (err) {
            // var view = Buffer.from("esel", "utf8");
            // var Readable = require('stream').Readable;

            // var view = new Readable;
            // view.push('<title>${data.title}</title>
            //             <meta charset="UTF-8" />
            //             <meta name="viewport" content="width=device-width, initial-scale=1">
            //             <link rel="stylesheet" href="/css/style.css" />
            //             <script src="/js/jquery-3.0.0.js" />')    // the string you want
            // view.push(null)  
            var view = '';
            // fs.writeFile(dataPath + "/views" + params.route + "/" + fileName + ".marko", view);
            // var template = require(dataPath + "/views" + params.route + "/" + fileName + ".marko");
            // template.render({"title":"test"});
            // view.end();
        });
    }
    res.redirect('/create/site');

});