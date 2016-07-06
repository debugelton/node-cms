var express      = require('express');
var router       = express.Router();
var mongoose     = require('mongoose');
var Article      = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    var viewPath         = req.app.get('views');
    var resolvedTemplate = require.resolve(viewPath + '/index.marko');
    var template         = require('marko').load(resolvedTemplate);

    template.stream({
      title: 'CMS Manager'
    }).pipe(res);
});
