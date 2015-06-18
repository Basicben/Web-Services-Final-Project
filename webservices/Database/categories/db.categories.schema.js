var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var categorySchema = new schema({
    Title: {type: String, unique: true},
    Picture: String,
    UserId: String,
    FriendUserId: String,
    CategoryId: String
},{collection: 'Categories'});

//Export
exports.categorySchema = categorySchema;
