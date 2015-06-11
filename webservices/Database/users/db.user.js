// mongoose connection
var mongoose = require('mongoose');

// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;

// Require for circle functions
var addCircle = require('./webservices/Database/circles/db.circle').addCircle;

// User Model
var User = mongoose.model('User', userSchema);

/********       Connecting to database + Creating user schema            **************/

/** **********************************************************/
var addUser = function(userObj) {
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;
    console.log("addUser function");

    conn.on('error', function (err) {
        console.log('Connection to the database as failed ' + err);
    });

    conn.once('open', function () {
        console.log("Connected to db_suitemybeer........\n");

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

        console.log("New user: ", newUser);

        if (newUser.isNew) {
            newUser.save(function (err, doc) {
                console.log("\nUser was added to User collection " + doc);
                // Get User Generated ID
                console.log('doc._id',doc._id);
                
            });

            addCircle(newUser.HomeTown);
            addCircle(newUser.Gender);


        }

        

        mongoose.disconnect();

        /**     Check if user already exist        **/
        
    });

    

};

// Exports

exports.addUser = addUser;


