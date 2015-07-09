// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;
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
    // Add circles to user.
    userObj.circles = [];
    userObj.hometown != null ? userObj.circles.push(userObj.hometown.name) : 1=1;
    userObj.gender != null ? userObj.circles.push(userObj.gender) : 1=1;
    // Add an empty event array for user.
    userObj.events = [];
    // add empty categories array for user.
    // add empty circles array for user.
    userObj.friendsList.forEach(function(value,key){
        console.log("for each blat");
        value.categories = [];
        value.circles = [];
    });

    // Adding new user from facebook to User's collection
    var newUser = new User({
        userObject: userObj
    });

    var query = User.findOne().where('email',userObj.email);
    console.log('addUser query find one');
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


