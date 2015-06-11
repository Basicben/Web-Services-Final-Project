// mongoose connection
var mongoose = require('mongoose');

<<<<<<< HEAD
=======


>>>>>>> origin/master
// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;
// Circle
var addCircle = require('../circles/db.circle').addCircle;

// User Model
var User = mongoose.model('UserM', userSchema);

/********       Connecting to database + Creating user schema            **************/

/** **********************************************************/
var addUser = function(userObj) {
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    }

    var conn = mongoose.connection;

<<<<<<< HEAD
    conn.once('open', function () {
        console.log("Connected to db_suitemybeer/users\n");
=======
    console.log("addUser function");
>>>>>>> origin/master

        /**********       Adding new user from facebook to User's collection              **********/
    var newUser = new User({
        FirstName: userObj.first_name,
        LastName: userObj.last_name,
        Email: userObj.email,
        MediumProfilePicture: userObj.mediumProfilePicture,
        SmallProfilePicture: userObj.smallProfilePicture,
        HomeTown: userObj.hometown.name,
        FacebookId: userObj.id,
        Gender: userObj.gender
    });

    if (newUser.isNew) {
        newUser.save(function (err, doc) {
        if(err){
            console.log("err",err);
        }else{
            console.log("\nUser was added to User collection ");
            // add circles.
            addCircle(newUser.HomeTown,doc._id);
            addCircle(newUser.Gender,doc._id);
            }
        });
    }



        /**     Check if user already exist        **/
<<<<<<< HEAD
        if (newUser.isNew) {
            newUser.save(function (err, doc) {
                console.log("\nUser was added to User collection " + doc);
                // Get User Generated ID
                returnedValue = newUser._id;
            })
        }
        console.log(returnedValue);
    });

    mongoose.disconnect();
    return returnedValue;
=======




>>>>>>> origin/master
};

// Exports
exports.addUser = addUser;

/*****      Connection to the database ( db_suitemybeer ) *****/


