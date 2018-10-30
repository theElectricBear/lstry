'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var SitesSchema = new Schema({
    author: String,
    date: String,
    description: String,
    image: String,
    publisher: String,
    title: String,
    url: String,
    id: String,
    channel: String,
    posted: { $date: Date }
});
//export our module to use in server.js
module.exports = mongoose.model('Site', SitesSchema);

    