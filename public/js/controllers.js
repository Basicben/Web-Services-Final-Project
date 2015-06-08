suiteApp.controller('signupCntrl', function($scope,$rootScope) {
     

	/*
		$scope.facebookInsert = {
	        "id": "10153157502754410",
	        "birthday": "05/25/1989",
	        "email": "benari_kutai@yahoo.com",
	        "first_name": "Ben Ari",
	        "gender": "male",
	        "hometown": {
	            "id": "102184499823699",
	            "name": "Montreal, Quebec"
	        },
	        "last_name": "Kutai",
	        "link": "https://www.facebook.com/app_scoped_user_id/10153157502754410/",
	        "locale": "en_US",
	        "name": "Ben Ari Kutai",
	        "timezone": 3,
	        "updated_time": "2014-11-12T08:58:51+0000",
	        "verified": true,
	        "smallProfilePicture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p48x48/1610834_10152823206274410_2045878086116312477_n.jpg?oh=d0319c2ebe9b714b80b29ac9b9e42d6b&oe=559BC2F2&__gda__=1437395101_29dbd7fbeb903fb1b6fa4668afa5a3c2",
	        "mediumProfilePicture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p48x48/1610834_10152823206274410_2045878086116312477_n.jpg?oh=d0319c2ebe9b714b80b29ac9b9e42d6b&oe=559BC2F2&__gda__=1437395101_29dbd7fbeb903fb1b6fa4668afa5a3c2",
	    };
	*/

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	}
    console.log('signupCntrl');
     
}).controller('homeCntrl', function($scope,$rootScope) {
     
    console.log('homeCntrl');
     
});