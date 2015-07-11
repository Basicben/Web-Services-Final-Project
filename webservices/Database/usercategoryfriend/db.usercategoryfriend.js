// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('../users/db.user.schema').userSchema;
// User Model
var User = mongoose.model('UserM', userSchema);

var addUserCategoryFriend = function(userCategoryFriendObj,callback){

    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    }

    var conn = mongoose.connection;

    /**********       Updating new UserFriendCategory from app to a specific User.friendList.categories     **********/

    /**
     * First we need to bring by userId the selected user document
     * Second, we need to search in friendList the specific friend by FriendId
     * After we found the specific friend, lets push and update his categories
     */

    var query = User.findOne().where('_id',userCategoryFriendObj.UserId);

    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            if(user == null){
                console.log('User == null',err);
            }else{
                var oldUser = user;
                user.userObject.friendsList.forEach(function(friend){
                    if(userCategoryFriendObj.FriendId == friend.id){
                        //if friend.categories.length == 0 than we insert a new categories to this friend
                        if(friend.categories.length == 0){
                            userCategoryFriendObj.Categories.forEach(function(category){
                                friend.categories.push(category._id);
                            });
                        }
                        //if friend.categories.length != 0 than we only update his categories
                        else{
                            userCategoryFriendObj.Categories.forEach(function(category){
                                if((friend.categories.indexOf(category._id),1) == -1){
                                    friend.categories.push(category._id);
                                }

                            });
                        }
                        User.findOneAndUpdate({_id:oldUser._id},user,function (err, doc) {
                            if(err){
                                console.log("err",err);
                            }else{
                                console.log("\nCategories were saved :",doc.userObject);
                                callback(friend);
                            }
                        });
                    }
                    
                });
            }
        }
    });
};


// Exports
exports.addUserCategoryFriend = addUserCategoryFriend;
