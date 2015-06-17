var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userFriendConnectionSchema = new schema({
    UserId: String,
    UserFriendId: String
},{collection: 'UserFriendConnection'});

//Export
exports.userFriendConnectionSchema = userFriendConnectionSchema;
