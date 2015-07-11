/**********       Inserting a new Invention      **********/

/**
 * First we need to bring by userId the selected user document
 * After we found the specific user, lets push and update his Event's list
 *
 */

// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('../users/db.user.schema').userSchema;
// User Model
var User = mongoose.model('UserM', userSchema);

var addUserEvent = function(userEventObj){

    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    }

    var conn = mongoose.connection;

    //Finding the specific user by ID
    var query = User.findOne().where('_id',userEventObj.UserId);

    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            if(user == null){
                console.log('User == null',err);
            }else {
                //User was found and now lets save his event's record
                var oldUser = user;

                //Pushing to his Event parameter
                user.userObject.events.push(userEventObj);
            }

            //Updating his document
            User.findOneAndUpdate({_id:oldUser._id},user,function (err, doc) {
                if(err){
                    console.log("err",err);
                }else{
                    console.log("\nEvent was saved :",doc.userObject);
                }
            });
        }
    });
};

// Exports

exports.addUserEvent = addUserEvent;