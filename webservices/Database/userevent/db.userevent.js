/********       Connecting to database + Creating user event schema            **************/
var mongoose = require('mongoose');
var userEventSchema = require('./db.userevent.schema').userEventSchema;
var UserEvent = mongoose.model('UserEventM',userEventSchema);
/** **********************************************************/

var addUserEvent = function(userEventObj){
    // Connection to database ( db_suitemybeer )
    	console.log('addUserEvent', userEventObj);
        /**********       Adding new UserEvent from facebook to User's collection              **********/
        var newUserEvent = new UserEvent({
            Invitation: userEventObj,
        });

        /**     Adding UserEvent      **/
        newUserEvent.save(function (err, doc) {
            console.log("\n User event was added to UserEvent collection " + doc);
        });

};

// Exports

exports.addUserEvent = addUserEvent;