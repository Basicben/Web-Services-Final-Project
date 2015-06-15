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
var addUserFriend = function(userFriendObj){
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;
    var query = null;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer/userFriendsTable\n");

        //Check if friend exist already in the database
       query = UserFriend.findOne().where('SocialPrivateId',userFriendObj.SocialPrivateId);

        /**********       Adding new UserFriend from facebook to User's collection              **********/
            if(query == null){//If friend does not exist, add him
                var newUserFriend = new UserFriend({
                    FirstName:userFriendObj.FirstName,
                    LastName:userFriendObj.LastName,
                    MediumProfilePicture:userFriendObj.MediumProfilePicture,
                    HomeTown:userFriendObj.HomeTown,
                    SocialPrivateId:userFriendObj.SocialPrivateId
                });

                /**     Saving new userFriend to UserFriends collection       **/
                    newUserFriend.save(function (err, doc) {
                        console.log("\n UserFriend was added to UserFriend collection " + doc);
                    });
                query = true;
            }
        else
                query = false;
    });
    mongoose.disconnect();
    return query;
};

// Exports
exports.addUserFriends = addUserFriend;
