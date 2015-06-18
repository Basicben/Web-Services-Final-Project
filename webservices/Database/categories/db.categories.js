/********       Connecting to database + Creating Circle schema            **************/
var mongoose = require('mongoose');
var categorySchema = require('./db.categories.schema.js').categorySchema;
var Category = mongoose.model('CategoryM',categorySchema);

/** **********************************************************/



/*****      Connection to the database ( db_suitemybeer ) *****/
//This func receive all categories
var getAllCategories = function(callback){

    var query = Category.find();
    query.exec(function(err,categories){
        if(err){
            console.log('err in getAllCategories/query bug', err);
        }
        else{
            console.log('Categories query exac() was exacute: ',categories);
            callback(categories);
        }
    });
};

// Exports

exports.getAllCategories = getAllCategories;