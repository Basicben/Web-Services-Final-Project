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
var getUserFriends = require('./webservices/Database/userfriends/db.userfriends').getUserFriends;
var getAllCategories = require('./webservices/Database/categories/db.categories').getAllCategories;
var getFriendCircles = require('./webservices/Database/circles/db.circle').getFriendCircles;
/*
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
// GET User Friends API
app.post('/api/getMyFriends',function(req,res){
    console.log("api/myfriends DATA:", req.body.userId);
    
    // Get User Friends.
    getUserFriends(req.body.userId,function(friendsJson){
        console.log('friendsJson',friendsJson);
        res.json(friendsJson);
    });
});

// User Category Friend Insert API
app.post('/api/getCategories',function(req,res){
    getAllCategories(function(categoriesJson){
        res.json(categoriesJson);
    });
});

// User Category Friend Insert API
app.post('/api/getMyUncategorizedFriends',function(req,res){
    // Get User Friends.
    console.log("api/getMyUncategorizedFriends DATA:", req.body.userId);
    getUserFriends(req.body.userId,function(friendsJson){
        res.json(friendsJson);
    });
});

app.post('/api/getFriendsCircles',function(req,res){
    console.log("api/getFriendsCircles DATA:", req.body.userId);
    getFriendCircles(req.body.userId,function(circles){
        res.json(circles);
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