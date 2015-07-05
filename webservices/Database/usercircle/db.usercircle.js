/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userCircleSchema = require('./db.usercircle.schema').userCircleSchema;
var UserCircle = mongoose.model('UserCircleM',userCircleSchema);
/** **********************************************************/

var addUserCircle = function(userCircleId,userId){
        
        /**********       Adding new UserCircle from facebook to User's collection              **********/
        var newUserCircle = new UserCircle({
            UserId: userId,
            CircleId: userCircleId
        });
        /**     Check if UserCircle already exist    **/
        var query = UserCircle.findOne().where({'UserId':userId,'CircleId':userCircleId});
        query.exec(function(err,userCircle){
            if(err){
                console.log('err',err);
            }else{
                if(userCircle == null){
                   newUserCircle.save(function (err, doc) {
                        if(err){
                            console.log("err",err);
                        }else{
                            console.log("\nUserCircle was added to UserCircle collection ");    
                        }
                    }); 
                }
                
            }
        });
};


var getUserCircles = function(userId,callback){
    
    var query = UserCircle.find().where({'UserId':userId});
    query.exec(function(err,userCircles){
        if(err){
            console.log('err',err);
        }else{
            if(userCircles != null){
                console.log('userCircles',userCircles);
                callback(userCircles);
            }
               
        }
    });
}

exports.addUserCircle = addUserCircle;
exports.getUserCircles = getUserCircles;