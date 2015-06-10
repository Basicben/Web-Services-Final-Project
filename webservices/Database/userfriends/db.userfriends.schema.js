var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userFriendSchema = new schema({
	Id: {Type:Number, index:1},
    FirstName: String,
    LastName: String,
    MediumProfilePicture: String,
    HomeTown: String,
    SocialPrivateId: Number,
},{collection: 'Circles'});

//Export
exports.userFriendSchema = userFriendSchema;
