'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var ChannelsSchema = new Schema({
    id: String,
    name: String,
    latest: {
        type: String,
        user: String,
        text: String
    },
    members: [String],
    type: String
});
//export our module to use in server.js
module.exports = mongoose.model('Channel', ChannelsSchema);