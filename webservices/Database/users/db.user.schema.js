var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
    Id: {type:Number, index:1},
    FirstName: String,
    LatName: String,
    Email: {type:  String, unique: true},
    MediumProfilePic: String,
    SmallProfilePic: String,
    HomeTown: String,
    FacebookId: Number,
    Gender: String,
   
},{collection: 'Users'});

//Circles schema  - document
var circleSchema = new schema({
    Id: {type:Number, index:1},
    Title: String
},{collection: 'Circles'});



//Exports
exports.userSchema = userSchema;
exports.circleSchema = circleSchema;
