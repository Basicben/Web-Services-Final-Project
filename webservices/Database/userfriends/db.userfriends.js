/********       Connecting to database + Creating userFriends schema            **************/
var mongoose = require('mongoose');
var userFriendsSchema = require('./db.userfriends.schema').userFriendSchema;
var UserFriend = mongoose.model('UserFriendM',userFriendsSchema);
var addUserFriendConnection = require('../userfriendconnection/db.userfriendconnection').addUserFriendConnection;
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
    for(var i = 0; i < userFriendList.length; i++){
        var friendTemp = userFriendList[i];
        var query = UserFriend.findOne().where('FirstName',friendTemp.first_name);
        query.exec(function(err,friend){
            if(err){
                console.log('err',err);
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

        /**********       Adding new UserFriend from facebook to User's collection              **********/
        
    }

};

// Exports
exports.addUserFriend = addUserFriend;
