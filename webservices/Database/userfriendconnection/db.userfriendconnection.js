/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userFriendConnectionSchema = require('./db.userfriendconnection.schema.js').userFriendConnectionSchema;
var UserFriendConnection = mongoose.model('UserFriendConnectionM',userFriendConnectionSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/


var addUserFriendConnection = function(userFriendConnectionObj){
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
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
    });
    mongoose.disconnect();
};

// Exports

exports.addUserFriendConnection = addUserFriendConnection;
