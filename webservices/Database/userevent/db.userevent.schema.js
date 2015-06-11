var mongoose = require('mongoose');
var schema = mongoose.Schema;

//User Event schema  - document
var userEventSchema = new schema({
    UserId: {type:Number, unique: true},
    Location: String,
    Longitude: Number,
    Latitude: Number,
    Partners: String
},{collection: 'UserEvent'});

//Export
exports.userEventSchema = userEventSchema;
