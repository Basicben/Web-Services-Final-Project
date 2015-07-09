var mongoose = require('mongoose');
var schema = mongoose.Schema;

//User Event schema  - document
var userEventSchema = new schema({
    Invitation: Object
},{collection: 'UserEvent'});

//Export
exports.userEventSchema = userEventSchema;
