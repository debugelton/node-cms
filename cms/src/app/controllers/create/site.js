var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create/site', function (req, res, next) {
  var article = new Article({
    title : 'bli bla blub',
    url   : '#',
    text  : 'title text blibla blub fallerie fallera holahopsasa und so weiter und so fort'
  });
   
  article.save(function (err, data) {
  if (err) console.log(err);
  else console.log('Saved : ', data );
  });
  Article.find(function (err, articles) {
    if (err) return next(err);
    console.log(articles);
    res.render('create/site', {
      title: 'CMS Create Site',
      articles: articles
    });
  });
});
