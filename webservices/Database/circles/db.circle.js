/********       Connecting to database + Creating Circle schema            **************/
var mongoose = require('mongoose');
var circleSchema = require('./db.circle.schema').circleSchema;
var Circle = mongoose.model('CircleM',circleSchema);
// User Circle
var getUserCircles = require('../usercircle/db.usercircle').getUserCircles;

var getUserFriends = require('../userfriends/db.userfriends').getUserFriends;
/** **********************************************************/

/*****      Connection to the database ( db_suitemybeer ) *****/

var getFriendCircles = function(userId,callback){
    var circleList = [];
    getUserFriends(userId,function(friends){
        // Get All Friends.
        friends.forEach(function(friend){
            // Get All Circles for each friend.
            getUserCircles(friend._id,function(userCircles){
                userCircles.forEach(function(circle){
                    console.log('circle',circle);
                    var query = Circle.findOne().where('_id',circle.CircleId);
                    query.exec(function(err,circleResult){
                        if(err) {
                            console.log('err',err);
                        }else{
                            if(circleResult != null){
                                console.log('circleResult',circleResult);
                                if(circleList.indexOf(circleResult) == -1)
                                    circleList.push(circleResult);
                            }
                        }
                    });        
                    
                });
            });
        });

        setTimeout(function(){ console.log('circleList',circleList); callback(circleList); },2000);
    });
    // get all user circles of friends id
    // insert all circles to array
};

// Exports
exports.getFriendCircles = getFriendCircles;