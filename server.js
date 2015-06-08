var express = require('express');
var app = express();

app.use('/',express.static('./public')).listen(process.env.PORT || 3000);
console.log('listeing on server...');

var addUser = require('./webservices/Database/users/db.user').addUser;
addUser();

