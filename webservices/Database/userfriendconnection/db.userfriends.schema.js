var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userFriendConnectionSchema = new schema({
    UserId: {Type: Number, unique: true},
    UserFriendId: {Type: Number, unique: true}
},{collection: 'UserFriendConnection'});

//Export
exports.userFriendConnectionSchema = userFriendConnectionSchema;
