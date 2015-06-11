var express = require('express');
var app = express();

app.use('/',express.static('./public'),function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}).listen(process.env.PORT || 3000);
console.log('listeing on server...');

var addUser = require('./webservices/Database/users/db.user').addUser;
//addUser();

