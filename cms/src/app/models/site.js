'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SiteSchema = new Schema(
    {
        route : {
            type    : String, 
            required: true, 
            unique  : true
        },
        title         : String,
        published_date: Date,
        create_date   : Date
    },
    {
        timestamp: true
    }
);

SiteSchema.virtual('date').get(function(){
    return this._id.getTimestamp();
});

mongoose.model('Site', SiteSchema);
