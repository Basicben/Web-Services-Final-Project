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

        $scope.friendList = [];
        $scope.categoryList = [];

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
                        console.log('(data = null) in myFriendsCntrl:');
                    }else{
                        $scope.friendList = data;
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


                $http.post(window.location.origin + '/api/getCategories').
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log('Success : data', data);
                        
                        // if user has signed up or not
                        if(data == null){
                            //$location.path('signup');
                            console.log('(data = null) in getCategories:');
                        }else{
                            $scope.categoryList = data;
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

        });

})
    // suitMyFriends Controller
.controller('suitmyfriendsCntrl', function($scope,$rootScope,$http) {

        $scope.friendIndex = 0;
        $scope.friendList = [];
        $scope.categoryList = [];

        $(document).wipetouch({
            tapToClick: true, // if user taps the screen, triggers a click event
            wipeLeft: function() {
                console.log("wipeLeft");
                if($scope.friendIndex < $scope.friendList.length){
                    $scope.$apply();
                    $scope.friendIndex++;
                    console.log("$scope.friendIndex", $scope.friendIndex);
                }
            },
            wipeRight: function() {
                console.log("wipeRight");
                if($scope.friendIndex < $scope.friendList.length){
                    $scope.$apply();
                    $scope.friendIndex++;
                    console.log("$scope.friendIndex", $scope.friendIndex);
                }
            }
                });

        console.log('suitmyfriendsCntrl');
        $(document).ready(function(){

            // make api call to bring user's friends
            $http.post(window.location.origin + '/api/getMyUncategorizedFriends', { userId: $scope.$parent.connectedUser._id } ).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('Success : data', data);

                    // if user has signed up or not
                    if(data == null){
                        //$location.path('signup');
                        console.log('(data = null) in myFriendsCntrl:');
                    }else{
                        $scope.friendList = data;
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


            $http.post(window.location.origin + '/api/getCategories').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // if user has signed up or not
                    if(data == null){
                        //$location.path('signup');
                        console.log('(data = null) in getCategories:');
                    }else{
                        $scope.categoryList = data;
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

        });

})
.controller('inviteFriendsCntrl', function($scope,$rootScope,$http) {

    $scope.autoComplete = {
        value: null,
        details: {},
        options: {
            types: 'address'
            //,country: 'ca'
        }
    };

    $scope.autoCompleteTemplate = '';

    // Watch for Landmark input.
    $scope.$watch('autoComplete.details', function (n, o) {
        $scope.autoComplete.value = n;
        if(!jQuery.isEmptyObject(n)){
            var location = $scope.autoComplete.value.geometry.location;
            $scope.markers['marker1'] = {
                lat: location[Object.keys(location)[0]],
                lng: location[Object.keys(location)[1]],
                message: n.formatted_address,
                focus: true,
                draggable: false
            }

            $scope.center = {
                lat: location[Object.keys(location)[0]],
                lng: location[Object.keys(location)[1]],
                zoom: 12,
            }
        }
    });


    angular.extend($scope, {
        center: {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        },
        markers: {

        },
        defaults: {
            scrollWheelZoom: false
        }
    });
     
});


