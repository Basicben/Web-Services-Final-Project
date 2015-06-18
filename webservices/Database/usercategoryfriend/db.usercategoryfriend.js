/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userCategoryFriendSchema = require('./db.usercategoryfriend.schema').userCategoryFriendSchema;
var UserCategoryFriend = mongoose.model('UserFriendM',userCategoryFriendSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/


var addUserCategoryFriend = function(userCategoryFriendObj){
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer/userCategoryFriendTable\n");


        /**********       Adding new UserFriendCategory from app to User category friend collection    **********/
            var newUserCategoryFriend = new UserCategoryFriend({
                UserId: userCategoryFriendObj.UserId,
                FriendUserId: userCategoryFriendObj.FriendUserId,
                CategoryId: userCategoryFriendObj.CategoryId
            });

                /**     Check if UserFriendCategory already exist        **/
                if(newUserCategoryFriend.isNew) {
                    newUserCategoryFriend.save(function (err, doc) {
                        console.log("\n UserCategoryFriend was added to UserCategoryFriend collection " + doc);
                    })
                }

    });
};


// Exports
exports.addUserCategoryFriend = addUserCategoryFriend;
