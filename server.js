var express = require('express');
var bodyParser = require('body-parser');
var ngRoute = require('ng-route-it');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',express.static('./public')).listen(process.env.PORT || 3000);

// ngRoute Config
ngRoute.ignore( [ '^/api' ] ); 
app.use( ngRoute.route() );

console.log('listeing on server...');

var addUser = require('./webservices/Database/users/db.user').addUser;

// User Insert API
app.post('/api/userInsert',function(req,res){
	var lastId = 0;
	lastId = addUser(req.body.user);

	// Insert Circles.
	// Insert User Circles

	res.send("HERE " + lastId);
});

// User Friends Insert API
app.post('/api/userFriendsInsert',function(req,res){

	res.send("HERE ");
});

// Circle Insert API
app.post('/api/circleInsert',function(req,res){
	
	res.send("HERE ");
});

// User Circle Insert API
app.post('/api/userCircleInsert',function(req,res){

	res.send("HERE ");
});

// User Category Friend Insert API
app.post('/api/userCategoryFriendInsert',function(req,res){

	res.send("HERE ");
});

// User Event Insert API
app.post('/api/userEventInsert',function(req,res){

	res.send("HERE ");
});

// *************************** Routing *************************** //