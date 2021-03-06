// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;
// Circle
var addCircle = require('../circles/db.circle').addCircle;
// User's friends
var addUserFriend = require('../userfriends/db.userfriends').addUserFriend;
// User Model
var User = mongoose.model('UserM', userSchema);

// Add user function
var addUser = function(userObj,callback) {
    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");    
    }

    var conn = mongoose.connection;

    console.log("addUser function");

        // Adding new user from facebook to User's collection
    var newUser = new User({
        FirstName: userObj.first_name == null ? null : userObj.first_name,
        LastName: userObj.last_name == null ? null : userObj.last_name,
        Email: userObj.email == null ? null : userObj.email,
        MediumProfilePicture: userObj.mediumProfilePicture,
        SmallProfilePicture: userObj.smallProfilePicture,
        HomeTown: userObj.hometown == null ? null  : userObj.hometown.name,
        Gender: userObj.gender == null ? null : userObj.gender,
        FacebookId: userObj.id
    });

    var query = User.findOne().where('Email',newUser.Email);
    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            if(user == null){
                newUser.save(function (err, doc) {
                    if(err){                    
                        console.log("err",err);
                    }else{
                        console.log("\nUser was added to User collection ");
                        // add circles.
                        addCircle(newUser.HomeTown,doc._id);
                        addCircle(newUser.Gender,doc._id);
                        // add user friends to DB
                        addUserFriend(userObj.friendsList, doc._id);
                        callback(newUser);
                    }                
                });
            }else{
                callback(user);
            }
        }
    });
};

// Exports

exports.addUser = addUser;

/*****      Connection to the database ( db_suitemybeer ) *****/


