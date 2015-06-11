var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userCategoryFriendSchema = new schema({
    UserId: Number,
    FriendUserId: Number,
    CategoryId: Number
},{collection: 'UserCategoryFriend'});

//Export
exports.userCategoryFriendSchema = userCategoryFriendSchema;
