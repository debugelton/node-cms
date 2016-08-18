'use strict';
var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Site     = mongoose.model('Site');
var fs       = require('fs');
var exec     = require('child_process').exec;
var rmdir       = require('rmdir');
var utils    = {
    form: require('../../../lib/controller/form')
};

module.exports = function (app) {
  app.use('/', router);
};

router.get('/site/delete', function (req, res, next) {
    var route    = req.query.route;
    var dataPath = "../www/src/app";
    Site.findOneAndRemove({"route": route}, function (error) {
        if (error) {
            res.redirect('/site/delete/error/' + error.code);
        }
        else {
            var cmd = [dataPath + "/controllers" + route, dataPath + "/views" + route];
            cmd.forEach(function (val) {
                rmdir(val);
            });
            res.redirect('/site/create');
        }
        
    });
});