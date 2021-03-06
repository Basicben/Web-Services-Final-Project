/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userFriendConnectionSchema = require('./db.userfriendconnection.schema.js').userFriendConnectionSchema;
var UserFriendConnection = mongoose.model('UserFriendConnectionM',userFriendConnectionSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/

//This func adding connection between user and his friends
var addUserFriendConnection = function(friendConnectionId,userId){


    console.log("Connected to db_suitemybeer/userFriendConnectionTable\n");

        /**********       Adding new UserFriendConnection from facebook to User's Friends collection              **********/

    var newUserFriendConnection = new UserFriendConnection({
         UserId: userId,
         UserFriendId: friendConnectionId
    });
    
    /**     Check if user Friend connection already exist        **/
    var query = UserFriendConnection.findOne().where({'UserId':userId,'UserFriendId':friendConnectionId});
    query.exec(function(err,connection){

        if(err){
            console.log('err',err);
        }else{
            if(connection == null){
                newUserFriendConnection.save(function (err, doc) {
                    if(err){
                        console.log('err',err);
                    }else{
                     console.log("\n UserFriendConnection was added to UserFriendConnection collection ");
                    }
                 });
            }else{
                console.log('connection already exists');    
            }
        }

    });

        
};

//This func receive all user's friends
var getAllUserFriends = function(userId,callback){
    console.log('getAllUserFriends function Start');
    var query = UserFriendConnection.find().where('UserId',userId);
    query.exec(function(err,friends){
        if(err){
            console.log('err in getAllUserFriends/query bug', err);
        }
        else{
            callback(friends);
        }
    });
};

// Exports
exports.addUserFriendConnection = addUserFriendConnection;
exports.getAllUserFriends = getAllUserFriends;
