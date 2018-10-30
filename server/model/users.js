'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var UsersSchema = new Schema({
    id: String,
    real_name: String,
    local_url: String,
    lists: [{
				id: String, 
				title: String,
				sites: [],
				date_created: { type: Date, default: Date.now },
				date_updated: { type: Date, default: Date.now },
    		}]

});
//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);

    