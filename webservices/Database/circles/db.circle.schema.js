var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var circleSchema = new schema({
    Id: {type:Number, index:1},
    Title: String
},{collection: 'Circles'});

//Export
exports.circleSchema = circleSchema;
