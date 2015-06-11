/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userCircleSchema = require('./db.usercircle.schema').userCircleSchema;
var UserCircle = mongoose.model('UserCircleM',userCircleSchema);
/** **********************************************************/

var addUserCircle = function(userCircleObj,userId){
    // Connection to database ( db_suitemybeer )
        console.log("Connected to db_suitemybeer/userCircleTable\n");
        
        /**********       Adding new UserCircle from facebook to User's collection              **********/
        var newUserCircle = new UserCircle({
            UserId: userId,
            CircleId: userCircleObj._id
        });

        console.log('newUserCircle',newUserCircle);

        /**     Check if UserCircle already exist    **/
        if(newUserCircle.isNew) {
            newUserCircle.save(function (err, doc) {
                if(err){
                    console.log("err",err);
                }else{
                    console.log("\n UserCircle was added to UserCircle collection " + doc);    
                }
                
            })
        }
};

exports.addUserCircle = addUserCircle;