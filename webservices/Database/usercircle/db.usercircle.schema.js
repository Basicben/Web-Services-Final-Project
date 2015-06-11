var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Circles schema  - document
var userCircleSchema = new schema({
    UserId: String,
    CircleId: String
},{collection: 'UserCircle'});

//Export
exports.userCircleSchema = userCircleSchema;
