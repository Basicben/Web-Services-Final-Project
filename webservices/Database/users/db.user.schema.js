var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Users schema  - document
var userSchema = new schema({
    userObject: Object
},{collection: 'Users'});

//Exports
exports.userSchema = userSchema;
