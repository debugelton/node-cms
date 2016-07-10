'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SiteSchema = new Schema({
  title: String,
  published_date: Date,
  route: String
},
{timestamp: true});

SiteSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Site', SiteSchema);
