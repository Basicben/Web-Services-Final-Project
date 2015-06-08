var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
    Id: {type:Number, index:1},
    FirstName: String,
    LatName: String,
    Email: {type:  String, unique: true},
    ProfilePic: String,
    HomeTown: String
},{collection: 'Users'});

//Circle schema  - document
var circleSchema = new schema({
    Id: {type:Number, index:1},
    Title: String
},{collection: 'Circles'});

exports.userSchema = userSchema;
exports.circleSchema = circleSchema;
