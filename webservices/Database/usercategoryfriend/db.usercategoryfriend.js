// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('../users/db.user.schema').userSchema;
// User Model
var User = mongoose.model('UserM', userSchema);

var addUserCategoryFriend = function(userCategoryFriendObj){

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
                console.log("user",user);
                console.log('User == null',err);
            }else{
                var oldUser = user;
                user.userObject.friendsList.forEach(function(friend){
                    console.log("friend:",friend);
                    if(userCategoryFriendObj.FriendId == friend.id){
                        console.log("userCategoryFriendObj.FriendId == friend.id");
                        if(friend.categories.length == 0){
                            console.log("friend.categories.length == 0");
                            userCategoryFriendObj.Categories.forEach(function(category){
                                console.log("Success!!!!!!!!!1");
                                friend.categories.push(category._id);
                            });
                        }
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
                            }
                        });
                    }
                    else{
                        console.log("userCategoryFriendObj.FriendId != value.id!!!!!!!!!!");
                        console.log("userCategoryFriendObj",userCategoryFriendObj);
                        console.log("userCategoryFriendObj.FriendId",userCategoryFriendObj.FriendId);
                        console.log("friend.id",friend.id);
                    }
                });
            }
        }
    });

    /*var query = User.update( {
            friendsList: {
                $elemMatch: {
                    id: userCategoryFriendObj.id
                }
            }
        },
        {
            $set: { 'friendsList.$.categories': userCategoryFriendObj.Categories }
        });*/






};


// Exports
exports.addUserCategoryFriend = addUserCategoryFriend;
