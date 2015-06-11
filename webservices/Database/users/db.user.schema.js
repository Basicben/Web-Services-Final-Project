var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
    FirstName: String,
    LastName: String,
<<<<<<< HEAD
    Email: {type: String},
=======
    Email: {type: String, unique:true },
>>>>>>> origin/master
    MediumProfilePicture: String,
    SmallProfilePicture: String,
    HomeTown: String,
    FacebookId: Number,
    Gender: String
},{collection: 'Users'});

//Exports
exports.userSchema = userSchema;
