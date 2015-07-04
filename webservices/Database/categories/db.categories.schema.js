var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var categorySchema = new schema({
    Title: {type: String, unique: true},
    Picture: String,
    IsSelected: Boolean
},{collection: 'Categories'});

//Export
exports.categorySchema = categorySchema;
