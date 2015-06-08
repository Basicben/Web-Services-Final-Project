var mongoose = require('mongoose');
mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");

var conn = mongoose.connection;

// On connection error
conn.on('error',function(err){
	console.log('connection error' + err );
});

// om connection success
conn.once('open',function(){
	console.log('connected.');
	//mongoose.disconnect();
});