var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var circleSchema = new schema({
    Title: {type: String, unique: true}
},{collection: 'Circles'});

//Export
exports.circleSchema = circleSchema;
