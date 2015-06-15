var mongoose = require('mongoose');
var schema = mongoose.Schema;

//User's Friends schema  - document
var userFriendsSchema = new schema({
    FirstName: String,
    LastName: String,
    Email: {type: String, unique:true },
    MediumProfilePicture: String,
    SmallProfilePicture: String,
    HomeTown: String,
    Gender: String
},{collection: 'UserFriends'});

//Export
exports.userFriendSchema = userFriendsSchema;
