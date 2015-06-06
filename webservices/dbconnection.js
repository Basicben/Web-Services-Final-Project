var mongoose = require('mongoose');
mongoose.connect();

var conn = mongoose.connection;

conn.on('error',function(err){
	console.log('connection error + ' err);
});

conn.once('open',function(){
	console.log('connected.';
});