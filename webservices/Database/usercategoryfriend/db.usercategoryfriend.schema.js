var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userCategoryFriendSchema = new schema({
    UserId: String,
    FriendUserId: String,
    CategoryId: String
},{collection: 'UserCategoryFriend'});

//Export
exports.userCategoryFriendSchema = userCategoryFriendSchema;
