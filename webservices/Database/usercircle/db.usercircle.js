/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userCircleSchema = require('./db.usercircle.schema').userCircleSchema;
var UserCircle = mongoose.model('UserCircleM',userCircleSchema);
/** **********************************************************/

var addUserCircle = function(userCircleObj){
    // Connection to database ( db_suitemybeer )
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer/userCircleTable\n");

        /**********       Adding new UserCircle from facebook to User's collection              **********/
        var newUserCircle = new UserCircle({
            UserId: userCircleObj.UserId,
            CircleId: userCircleObj.CircleId
        });

        /**     Check if UserCircle already exist        **/
        if(newUserCircle.isNew) {
            newUserCircle.save(function (err, doc) {
                console.log("\n Circle was added to Circle collection " + doc);
            })
        }
    });
    mongoose.disconnect();
};