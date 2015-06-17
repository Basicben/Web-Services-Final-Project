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

console.log('listenning on server...');

var addUser = require('./webservices/Database/users/db.user').addUser;
var addUserFriend = require('./webservices/Database/userfriends/db.userfriends').addUserFriend;
var getUserFriends = require('./webservices/Database/userfriends/db.userfriends').getUserFriends;
/*var addCircle = require('./webservices/Database/circles/db.circle').addCircle;
var addUserCircle = require('./webservices/Database/usercircle/db.usercircle').addUserCircle;
**/

// User Insert API
app.post('/api/userInsert',function(req,res){
	console.log('api/userInsert');
    addUser(req.body.user,function(newUser){
        // Callback function.
        res.json(newUser);
    });
    
});
// User Friends Insert API
app.post('/api/getMyFriends',function(req,res){
    console.log("api/myfriends DATA:", req.body.userId);
    
    // Get User Friends.
    getUserFriends(req.body.userId,function(friendsJson){
        res.json(friendsJson);
    });
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