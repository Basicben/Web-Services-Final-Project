var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var circleSchema = new schema({
    Title: String
},{collection: 'Circles'});

//Export
exports.circleSchema = circleSchema;
