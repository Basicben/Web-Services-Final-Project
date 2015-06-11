var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userFriendSchema = new schema({
    FirstName: String,
    LastName: String,
    MediumProfilePicture: String,
    HomeTown: String,
    SocialPrivateId: Number
},{collection: 'UserFriends'});

//Export
exports.userFriendSchema = userFriendSchema;
