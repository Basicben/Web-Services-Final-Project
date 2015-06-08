/********       Connecting to database + Creating user schema            **************/

/** **********************************************************/
var addUser = function() {
    var mongoose = require('mongoose');
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var userSchema = require('./db.user.schema').userSchema;
    var user = mongoose.model('UserM', userSchema);
    var conn = mongoose.connection;

    conn.on('error', function (err) {
        console.log('Connection to the database as failed ' + err);
    });

    conn.once('open', function () {
        console.log("Connected to db_suitemybeer........\n");

        /**********       Adding new user from facebook to User's collection              **********/
        var newUser = new user({

            FirstName: "FacebookFirstName",
            LastName: "FacebookLastName",
            Email: "FacebookUserEmail",
            MediumProfilePic: "FacebookMediumProfilePic",
            SmallProfilePic: "FacebookSmallProfilePic",
            HomeTown: "FacebookUserHometown"
        });

        /**     Check if user already exist        **/
        if (newUser.isNew) {
            newUser.save(function (err, doc) {
                console.log("\nUser was added to User collection " + doc);
            })
        }
    });

    mongoose.disconnect();
};

exports.addUser = addUser;

/*****      Connection to the database ( db_suitemybeer ) *****/


