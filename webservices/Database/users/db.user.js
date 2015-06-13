// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;
// Circle
var addCircle = require('../circles/db.circle').addCircle;
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

    if (newUser.isNew) {
        newUser.save(function (err, doc) {
            if(err){
                if(err.code == 11000){
                    // If here, the problem is a duplicated user (Email)
                    var query = User.findOne().where('Email',newUser.Email);
                    query.exec(function(err,user){
                        callback(user);
                    });
                }else{
                    callback(null);
                }
            
                console.log("err",err);
                //return false;
            }else{
                console.log("\nUser was added to User collection ");
                // add circles.
                addCircle(newUser.HomeTown,doc._id);
                addCircle(newUser.Gender,doc._id);
                callback(newUser);
            }                
        });
    }

};

// Exports

exports.addUser = addUser;

/*****      Connection to the database ( db_suitemybeer ) *****/


