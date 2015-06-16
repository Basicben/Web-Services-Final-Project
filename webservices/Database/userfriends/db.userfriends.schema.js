var mongoose = require('mongoose');
var schema = mongoose.Schema;

//User's Friends schema  - document
var userFriendsSchema = new schema({
    FirstName: String,
    LastName: String,
    Email: String,
    MediumProfilePicture: String,
    SmallProfilePicture: String,
    HomeTown: String,
    Gender: String,
    FacebookId: Number
},{collection: 'UserFriends'});

//Export
exports.userFriendSchema = userFriendsSchema;
