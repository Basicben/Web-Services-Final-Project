/********       Connecting to database + Creating Circle schema            **************/
var mongoose = require('mongoose');
var circleSchema = require('./db.circle.schema').circleSchema;
var Circle = mongoose.model('CircleM',circleSchema);
/** **********************************************************/



/*****      Connection to the database ( db_suitemybeer ) *****/



var addCircle = function(circleObj){
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer\n");

        /**********       Adding new Circle from facebook to User's collection              **********/
        var newCircle = new Circle({
            Title: circleObj.Title
        });

        /**     Check if Circle already exist        **/
        if(newCircle.isNew) {
            newCircle.save(function (err, doc) {
                console.log("\n Circle was added to Circle collection " + doc);
            })
        }
    });
    mongoose.disconnect();
};

// Exports

exports.addCircle = addCircle;