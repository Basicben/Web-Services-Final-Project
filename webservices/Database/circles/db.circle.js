/********       Connecting to database + Creating Circle schema            **************/
var mongoose = require('mongoose');
var circleSchema = require('./db.circle.schema').circleSchema;
var Circle = mongoose.model('CircleM',circleSchema);
// User Circle
var addUserCircle = require('../usercircle/db.usercircle').addUserCircle;
/** **********************************************************/

/*****      Connection to the database ( db_suitemybeer ) *****/

var addCircle = function(circleTitle, userId){
        

        /**********       Adding new Circle from facebook to User's collection              **********/
        var newCircle = new Circle({
            Title: circleTitle
        });

        /**     Check if Circle already exist        **/

        var query = Circle.findOne().where('Title',circleTitle);
        query.exec(function(err,circle){
            console.log('circle',circle);
            if(err) {
                console.log('err',err);
            }else{
                if(circle == null){
                    newCircle.save(function (err, doc) {
                        if(err){
                            console.log('err',err);
                            
                        }else{
                            console.log("\n Circle was added to Circle collection ");
                            addUserCircle(newCircle._id,userId);
                        }
                        
                    });
                }
            }
        });        
};

// Exports

exports.addCircle = addCircle;