var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    var templatePath = require.resolve('../views/index.marko');
    var template     = require('marko').load(templatePath);

    template.stream({
      title: 'CMS Manager'
    }).pipe(res);
});
