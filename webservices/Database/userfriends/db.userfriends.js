/********       Connecting to database + Creating userFriends schema            **************/
var mongoose = require('mongoose');

var userFriendsSchema = require('./db.userfriends.schema').userFriendSchema;
var userCategoryFriendSchema = require('../usercategoryfriend/db.usercategoryfriend.schema').userCategoryFriendSchema;

var UserFriend = mongoose.model('UserFriendM',userFriendsSchema);
var UserCategoryFriend = mongoose.model('UserCategoryFriendM',userCategoryFriendSchema);

var addUserFriendConnection = require('../userfriendconnection/db.userfriendconnection').addUserFriendConnection;
var getAllUserFriends = require('../userfriendconnection/db.userfriendconnection').getAllUserFriends;

var getUserCircles = require('../usercircle/db.usercircle').getUserCircles;
var addCircle = require('../circles/db.circle').addCircle;
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/

/* addUserFriend(userFriendObj)
 *
 * @param userFriendObj - object of user's friend from facebook
 * @returns: True - if userFriend was added to UserFriend collection
 *           False - if userFriend wasn't added or userFriend is already exist in collection
 */
var addUserFriend = function(userFriendList,UserId){

    console.log('add user friend userFriendList',userFriendList);

    //Check if friend exist already in the database
    userFriendList.forEach(function(friendTemp){
        console.log('here', friendTemp);
        var query = UserFriend.findOne().where('FirstName',friendTemp.first_name);
        query.exec(function(err,friend){
            if(err){
                console.log('err',err);
                if(err.code == 11000){
                    
                }
            }
            else{
                if(friend == null){//If friend does not exist, add him
                    var newUserFriend = new UserFriend({
                        FirstName: friendTemp.first_name == null ? null : friendTemp.first_name,
                        LastName: friendTemp.last_name == null ? null : friendTemp.last_name,
                        Email: friendTemp.email == null ? null : friendTemp.email,
                        MediumProfilePicture: friendTemp.mediumProfilePicture == null ? null : friendTemp.mediumProfilePicture,
                        SmallProfilePicture: friendTemp.smallProfilePicture == null ? null : friendTemp.smallProfilePicture,
                        HomeTown: friendTemp.hometown == null ? null  : friendTemp.hometown.name,
                        Gender: friendTemp.gender == null ? null : friendTemp.gender,
                        FacebookId: friendTemp.id == null ? null : friendTemp.id
                    });
                    /**     Saving new userFriend to UserFriends collection       **/
                    newUserFriend.save(function (err, doc) {
                        if(err){
                            console.log('err',err);
                        }else{
                            console.log("\n UserFriend was added to UserFriend collection " + doc);    
                            addUserFriendConnection(doc._id,UserId);
                            // Add Circles if needed
                            if(friendTemp.hometown != null) addCircle(friendTemp.hometown.name,doc._id);
                            if(friendTemp.gender != null) addCircle(friendTemp.gender,doc._id);
                            
                        }
                    });
                }else{
                    // if user already exists
                    console.log('EXISTSSS : friend',friend);
                    addUserFriendConnection(friend._id,UserId);
                    //addUserFriendConnection(doc._id,UserId);
                }
            }
        });
    });

};

var getUserFriends = function(userId,callback){
    getAllUserFriends(userId,function(friendsList){
        console.log('UserFriend - friendsList',friendsList);

        // Make a For each statement to run all over friendsList
        // make a query for each friend in friendsList array and
        // bring all of his information from UserFriend DB.

        var friends = [];
        friendsList.forEach(function(friend){
            // Find All friends details.
            var query = UserFriend.findOne().where('_id',friend.UserFriendId);
            query.exec(function(err,user){
                if(err){
                    // Display error if any
                    console.log('err',err);
                }else{                    
                    if(user != null){
                        // Attach user's friends categories to JSON.
                        var query2 = UserCategoryFriend.find().where({ 'UserId':userId, 'FriendUserId':user._id });
                        query2.exec(function(err,category){
                            if(err){
                                console.log('err',err);
                            }else{
                                console.log('UserCategoryFriend UserCategoryFriend UserCategoryFriend\n',category);
                                // Make user is an object 
                                var u = user.toObject();

                                getUserCircles(u._id,function(circles){
                                    // Make a new CATEGORY attribute to user.
                                    u.categories = category;
                                    u.circles = circles;
                                    // Push user to friends array.
                                    friends.push(u);
                                    console.log('friend has been pushed to friends array');
                                    // If and only if friends array has the same length than the original
                                    // make a callback.
                                    if(friends.length == friendsList.length){
                                        callback(friends);                 
                                    }
                                });                                
                            }
                        });
                    }
                }
            });
        });
    });
}

// Exports
exports.addUserFriend = addUserFriend;
exports.getUserFriends = getUserFriends;
