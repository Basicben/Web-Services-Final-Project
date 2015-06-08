var express = require('express');
var app = express();

app.use('/',express.static('./public')).listen(process.env.PORT || 3000);
console.log('listeing...');

var insert = require('./webservices/Database/users/db.user').userInsert;
app.post('/userInsert',function(req,res){
    console.log(req);
    console.log(res);
});

