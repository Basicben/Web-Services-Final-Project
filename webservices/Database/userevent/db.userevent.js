/********       Connecting to database + Creating user event schema            **************/
var mongoose = require('mongoose');
var userEventSchema = require('./db.userevent.schema').userCircleSchema;
var UserEvent = mongoose.model('UserEventM',userEventSchema);
/** **********************************************************/

var addUserEvent = function(userEventObj){
    // Connection to database ( db_suitemybeer )
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer/userevent\n");

        /**********       Adding new UserEvent from facebook to User's collection              **********/
        var newUserEvent = new UserEvent({
            UserId: userEventObj.UserId,
            Location: userEventObj.Location,
            Longitude: userEventObj.Longitude,
            Latitude: userEventObj.Latitude,
            Partners: userEventObj.Partners
        });

        /**     Adding UserEvent      **/
            newUserEvent.save(function (err, doc) {
                console.log("\n User event was added to UserEvent collection " + doc);
            })
    });

};

// Exports

exports.addUserEvent = addUserEvent;