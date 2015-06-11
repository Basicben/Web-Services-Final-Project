var mongoose = require('mongoose');
var schema = mongoose.Schema;

//User's Friends schema  - document
var userFriendsSchema = new schema({
    FirstName: String,
    LastName: String,
    MediumProfilePicture: String,
    HomeTown: String,
    SocialPrivateId: Number
},{collection: 'UserFriends'});

//Export
exports.userFriendSchema = userFriendsSchema;
