suiteApp
    // Signup Controller
    .controller('signupCntrl', function($scope,$rootScope) {

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	};

    console.log('signupCntrl');
     
})
    // Home Controller
    .controller('homeCntrl', function($scope,$rootScope) {
     
    console.log('homeCntrl');
     
})
    // Welcome Controller
    .controller('welcomeCntrl', function($scope,$rootScope,$location) {
     
    console.log('welcomeCntrl');

    $scope.enterApp = function(){
    	if($scope.$parent.connectedUser != null){
    		$location.path('home');
    	}
    }
     
})
    // myFriends Controller 
    .controller('myFriendsCntrl', function($scope,$rootScope,$http) {

        console.log('myFriendsCntrl');
        $(document).ready(function(){
            // make api call to bring user's friends
            $http.post(window.location.origin + '/api/getMyFriends', { userId: $scope.$parent.connectedUser._id } ).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('Success : data', data);
                    // if user has signed up or not
                    if(data == null){
                        //$location.path('signup');
                        console.log('(data = null) in myFriendsCntrl:',data);
                    }else{
                        //$scope.parent.connectedUser.__id = data;
                        //$location.path('welcome');
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
                    //$location.path('signup');
                });
        })

    });