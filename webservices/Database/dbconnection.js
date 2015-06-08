/**      Connecting to the database && creating a new document (usersSchema)       **/
var mongoose = require('mongoose');
mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
var conn = mongoose.connection;

mongoose.model('UserM',usersSchema);

var schema = mongoose.Schema;
var usersSchema = new schema({
    Id: {type:Number, index:1},
    FirstName: String,
    LatName: String,
    Email: String,
    ProfilePic: String,
    HomeTown: String
},{collection: 'users'});

var users = conn.model('UserM');

// On connection error
conn.on('error',function(err){
	console.log('connection error' + err );
});

// om connection success
conn.once('open',function(){
	console.log('connected.');

	//mongoose.disconnect();
});