var mongoose = require('mongoose');
mongoose.connect();

var conn = mongoose.connection;

// On connection error
conn.on('error',function(err){
	console.log('connection error + ' err);
});

// om connection success
conn.once('open',function(){
	console.log('connected.');
	//mongoose.disconnect();
});