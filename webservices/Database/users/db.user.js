// mongoose connection
var mongoose = require('mongoose');
mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");

// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;

// User Model
var User = mongoose.model('UserM', userSchema);

/********       Connecting to database + Creating user schema            **************/

/** **********************************************************/
var addUser = function(userObj) {
    var conn = mongoose.connection;
    var returnedValue = -1;

    conn.on('error', function (err) {
        console.log('Connection to the database as failed ' + err);
    });

    conn.once('open', function () {
        console.log("Connected to db_suitemybeer........\n");

        /**********       Adding new user from facebook to User's collection              **********/
        var newUser = new User({
            FirstName: userObj.first_name,
            LatName: userObj.last_name,
            Email: userObj.email,
            MediumProfilePic: userObj.mediumProfilePicture,
            SmallProfilePic: userObj.smallProfilePicture,
            HomeTown: userObj.hometown.name,
            FacebookId: userObj.id,
            Gender: userObj.gender,
        });

        //console.log('newUser',newUser);

        /**     Check if user already exist        **/
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

};

// Exports

exports.addUser = addUser;

/*****      Connection to the database ( db_suitemybeer ) *****/


