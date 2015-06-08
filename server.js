var express = require('express');
var app = express();

app.use('/',express.static('./public')).listen(process.env.PORT || 3000);
console.log('listeing');