/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userFriendConnectionSchema = require('./db.userfriendconnection.schema.js').userFriendConnectionSchema;
var UserFriendConnection = mongoose.model('UserFriendConnectionM',userFriendConnectionSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/

//This func adding connection between user and his friends
var addUserFriendConnection = function(userFriendConnectionObj){
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    }
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    console.log("Connected to db_suitemybeer/userFriendConnectionTable\n");

        /**********       Adding new UserFriendConnection from facebook to User's Friends collection              **********/

    var newUserFriendConnection = new UserFriendConnection({
         UserId: userFriendConnectionObj.UserId,
         UserFriendId: userFriendConnectionObj.UserFriendId
    });

        /**     Check if user Friend connection already exist        **/
    if(newUserFriendConnection.isNew) {
         newUserFriendConnection.save(function (err, doc) {
             console.log("\n UserFriend was added to UserFriend collection " + doc);
         })
    }
};

//This func receive all user's friends
var getAllUserFriends = function(userId,callback){

    var query = UserFriendConnection.find().where('_id',userId);
    query.exec(function(err,userId){
        if(!err){
            callback(userId);
        }
        else{
            console.log('err in getAllUserFriends/query bug', err);
        }
    });
};

// Exports
exports.addUserFriendConnection = addUserFriendConnection;
exports.getAllUserFriends = getAllUserFriends;
