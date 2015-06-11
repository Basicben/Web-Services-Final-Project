var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
    Id: {type:Number, index:1},
    FirstName: String,
    LastName: String,
    Email: {type:  String},
    MediumProfilePicture: String,
    SmallProfilePicture: String,
    HomeTown: String,
    FacebookId: Number,
    Gender: String
   
},{collection: 'Users'});

//Exports
exports.userSchema = userSchema;
