/********       Connecting to database + Creating userFriends schema            **************/
var mongoose = require('mongoose');
var userFriendsSchema = require('./db.userfriends.schema').userFriendSchema;
var UserFriend = mongoose.model('UserFriendM',userFriendsSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/

/* addUserFriend(userFriendObj)
 *
 * @param userFriendObj - object of user's friend from facebook
 * @returns: True - if userFriend was added to UserFriend collection
 *           False - if userFriend wasn't added or userFriend is already exist in collection
 */
var addUserFriend = function(userFriendList){

        //Check if friend exist already in the database
    for(var i = 0; i < userFriendList.length; i++){
        var query = UserFriend.findOne().where('SocialPrivateId',userFriendList[i].SocialPrivateId);
        query.exec(function(err,frined){
            if(err){
                console.log('err',err);
            }
            else{
                console.log('friend',frined);
            }
        });

        /**********       Adding new UserFriend from facebook to User's collection              **********/
        if(query == null){//If friend does not exist, add him
            var newUserFriend = new UserFriend({
                FirstName: userFriendList[i].first_name == null ? null : userFriendList[i].first_name,
                LastName: userFriendList[i].last_name == null ? null : userFriendList[i].last_name,
                Email: userFriendList[i].email == null ? null : userFriendList[i].email,
                MediumProfilePicture: userFriendList[i].mediumProfilePicture == null ? null : userFriendList[i].mediumProfilePicture,
                SmallProfilePicture: userFriendList[i].smallProfilePicture == null ? null : userFriendList[i].smallProfilePicture,
                HomeTown: userFriendList[i].hometown == null ? null  : userFriendList[i].hometown.name,
                Gender: userFriendList[i].gender == null ? null : userFriendList[i].gender,
                FacebookId: userFriendList[i].id
            });

            /**     Saving new userFriend to UserFriends collection       **/
            newUserFriend.save(function (err, doc) {
                console.log("\n UserFriend was added to UserFriend collection " + doc);
            });
        }
    }

};

// Exports
exports.addUserFriend = addUserFriend;
