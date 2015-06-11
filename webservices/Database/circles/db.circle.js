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
        if(newCircle.isNew){
            newCircle.save(function (err, doc) {
                if(err){
                    // Find the specific id
                    var query = Circle.findOne().where('Title',circleTitle);
                    query.exec(function(err,doc){
                        console.log('doc.Id', doc._id);
                        addUserCircle(doc._id,userId);
                    });

                    //addUserCircle(newCircle,userId);
                }else{
                    console.log("\n Circle was added to Circle collection ");
                    addUserCircle(newCircle._id,userId);
                }
                
            });
        }

        

        
};

// Exports

exports.addCircle = addCircle;