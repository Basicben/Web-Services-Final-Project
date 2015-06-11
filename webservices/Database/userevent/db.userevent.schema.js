var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userCircleSchema = new schema({
    UserId: {type:Number, unique: true},
    CircleId: {type:Number, unique: true}
},{collection: 'UserCircle'});

//Export
exports.userCircleSchema = userCircleSchema;
