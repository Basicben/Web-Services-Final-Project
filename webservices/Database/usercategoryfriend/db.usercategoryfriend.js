/********       Connecting to database + Creating UserCategoryFriend schema            **************/
var mongoose = require('mongoose');
var userCategoryFriendSchema = require('./db.usercategoryfriend.schema').userCategoryFriendSchema;
var UserCategoryFriend = mongoose.model('UserCategoryFriendM',userCategoryFriendSchema);
/** **********************************************************/


var addUserCategoryFriend = function(userCategoryFriendObj){

    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    }

    var conn = mongoose.connection;

        /**********       Adding new UserFriendCategory from app to User category friend collection    **********/
            var newUserCategoryFriend = new UserCategoryFriend({
                UserId: userCategoryFriendObj.UserId,
                FriendId: userCategoryFriendObj.FriendId,
                Categories: userCategoryFriendObj.Categories
            });

                /**     Check if UserFriendCategory already exist        **/
                if(newUserCategoryFriend.isNew) {
                    newUserCategoryFriend.save(function (err, doc) {
                        console.log("\n UserCategoryFriend was added to UserCategoryFriend collection ");
                    })
                }

};


// Exports
exports.addUserCategoryFriend = addUserCategoryFriend;
