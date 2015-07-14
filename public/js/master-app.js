var suiteApp = angular.module('suiteApp',['ngRoute','ngAutocomplete','leaflet-directive']);

var USER = null; /**/
/*
{

        id: "10153356515014410",
        birthday: "05/25/1989",
        email: "benari1_kutai@yahoo.com",
        first_name: "Ben Ari",
        gender: "Male",
        hometown: {
            id: "102184499823699",
            name: "Quebec, Montreal"
        },
        last_name: "Kutai",
        link: "https://www.facebook.com/app_scoped_user_id/10153356515014410/",
        locale: "en_US",
        location: {
            id: "111853268841906",
            name: "Rehovot, Israel"
        },
        mediumProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/1610834_10152823206274410_2045878086116312477_n.jpg?oh=7a35a74f394b9695a57a2fb6beaca3ad&oe=55F08067&__gda__=1441648651_a2dc5d750e0df629db63895735809c66",
        name: "Ben Ari Kutai",
        relationship_status: "Single",
        smallProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p40x40/1610834_10152823206274410_2045878086116312477_n.jpg?oh=a4743f1ef762de4734ed3a7b2434a78e&oe=55E88EC0&__gda__=1442821295_ac942cc9712dc12de7d91f4e23ac7e8c",
        timezone: 3,
        updated_time: "2015-06-05T18:00:17+0000",
        verified: true,
        friendsList: [
            {
                profilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/v/t1.0-1/c39.36.450.450/s50x50/999588_10151791538574592_1966057484_n.jpg?oh=b69066e7944df6b60a25713a66edea59&oe=5618D284&__gda__=1444836887_82ac05e25e6c7d583087aaee11f6c648",
                gender: "female",
                name: "Dana Freilich",
                id: "10153390184239592"
            },
            {
                profilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/c49.49.618.618/s50x50/208959_10150978397109863_793617579_n.jpg?oh=8a53ff8aa2cc8baa865ff5f7c1e7515f&oe=56183530&__gda__=1444989859_1bcfd25a1a554d40917b825093c0b88b",
                gender: "male",
                name: "Noam Rom",
                id: "10153947428804863"
            }
        ]

};/**/

suiteApp .config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider.
    when('/', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/welcome', {
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeCntrl'
    }).
    when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCntrl'
    }).
    when('/myfriends', {
           templateUrl: 'templates/myfriends.html',
           controller: 'myFriendsCntrl'
    }).
    when('/suitmyfriends', {
          templateUrl: 'templates/suitmyfriends.html',
          controller: 'suitmyfriendsCntrl'
    }).
    when('/invitefriends', {
          templateUrl: 'templates/invitefriends.html',
          controller: 'inviteFriendsCntrl'
    }).
    when('/selectfriends', {
          templateUrl: 'templates/selectfriends.html',
          controller: 'selectFriendsCntrl'
    }).
    when('/invitation', {
          templateUrl: 'templates/invitation.html',
          controller: 'invitationsCntrl'
    }).
    otherwise({
            redirectTo: '/'
    });
}]);

suiteApp.controller('masterCntrl', function($scope,$http,$location,connectedUser) {
         
    $(document).ready(function(){
        console.log('init');
        //$scope.connectedUser = checkLoginState();
    });

    $scope.connectedUser = null;

    $scope.changeURL = function(url){
        $location.path(url);
    };

    $scope.angFacebookLogin = function(){

        console.log('add user from fb');

        console.log('window.location.origin',window.location.origin);

        /**/
        $scope.friendList = [];
        facebookLogin(function(friendList){
                //friendList = getFacebookFriendsImages(friendList);
                
                delete friendList['paging'];
                delete friendList['summary'];
                
                console.log('friendList 1111111111111 AFTER',friendList);
                friendList.data.forEach(function(friend){
                    friend.profilePicture = friend.picture.data.url
                    delete friend['picture'];
                });

                console.log('friendList 2222222222222 AFTER',friendList);

                USER.friendsList = friendList.data;
                console.log('success',USER);
                $http.post(window.location.origin + '/api/userInsert', { user:USER } ).
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('Success : data', data);
                    // if user has signed up or not
                    if(data == null){
                        $location.path('signup');
                    }else{
                        connectedUser.set(data);
                        $scope.connectedUser = data;
                        $location.path('welcome');
                    }

                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('Error : data', data);
                    console.log('Error : status', status);
                    console.log('Error : headers', headers);
                    console.log('Error : config', config);
                    // Redirect user back to login page
                    $location.path('signup');
                  });

        });/**/

        /* API CALL IN LOCALHOST 
        $http.post( window.location.origin + '/api/userInsert', { user:USER } ).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('Success : data', data);
                // if user has signed up or not
                if(data == null){
                    $location.path('signup');
                }else{
                    connectedUser.set(data);
                    $scope.connectedUser = data;
                    $location.path('welcome');
                }

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Error : status', status);
                // Redirect user back to login page
                $location.path('signup');
              });
        /* End API CALL IN LOCALHOST */        
    }

});