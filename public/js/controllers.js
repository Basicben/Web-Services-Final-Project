suiteApp
/***************************
 *  SignUp Controller
 ***************************/
.controller('signupCntrl', function($scope,$rootScope) {

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	};

    console.log('signupCntrl');
     
})

/***************************
 *  Home Controller
 ***************************/
.controller('homeCntrl', function($scope,$rootScope) {
     
    console.log('homeCntrl');
     
})

/***************************
 *  Welcome Controller
 ***************************/
.controller('welcomeCntrl', function($scope,$rootScope,$location) {
     
    console.log('welcomeCntrl');

    $scope.enterApp = function(){
    	if($scope.$parent.connectedUser != null){
    		$location.path('home');
    	}
    }
     
})

/***************************
 *  myFriends Controller
 ***************************/
.controller('myFriendsCntrl', function($scope,$rootScope,$http) {

        $scope.friendList = [];
        $scope.categoryList = [];
        $scope.nullsCategoriesToBottom = function(obj) {
            return (angular.isDefined(obj.categories) ? -1 : 0);
        };

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

/***************************
 *  suitMyFriends Controller
 ***************************/
.controller('suitmyfriendsCntrl', function($scope,$rootScope,$http) {

        $scope.friendIndex = 0;
        $scope.friendList = [];
        $scope.categoryList = [];

        //Wipe function
        $("#friendPictureSection").wipetouch({
            tapToClick: true, // if user taps the screen, triggers a click event
            wipeLeft: function() {
                console.log("wipeLeft");
                if($scope.friendIndex < $scope.friendList.length - 1){
                    $scope.friendIndex++;
                    $scope.$apply();
                    console.log("wipeLeft + index = " + $scope.friendIndex);
                }
                else{
                    console.log("wipeLeft + $scope.friendIndex = 0");
                    $scope.friendIndex = 0;
                    $scope.$apply();
                }
            },
            wipeRight: function() {
                console.log("wipeRight");
                if($scope.friendIndex < $scope.friendList.length - 1){
                    $scope.friendIndex++;
                    $scope.$apply();
                    console.log("wipeRight + index = " + $scope.friendIndex);
                }
                else{
                    console.log("$scope.friendIndex = 0");
                    $scope.friendIndex = 0;
                    $scope.$apply();
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
                    console.log('Success getMyUncategorizedFriends: data', data);

                    // if user has signed up or not
                    if(data == null){
                        console.log('(data = null) in suitmyfriendsCntrl:');
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

/***************************
 *  inviteFriends Controller
 ***************************/

.controller('inviteFriendsCntrl', function($scope,$rootScope,$http) {


    $scope.invitation = {
        name: null,
        placeName: null,
        friends:null,
    }



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

    $scope.sendInvitation = function(){

        $scope.$parent.changeURL('selectfriends');
    }
     
}).controller('selectFriendsCntrl', function($scope,$rootScope,$http){

    // Array contains category types.
    $scope.circleList = [];
    // Array contains friend list.
    $scope.friendList = [];
    // Array contains selected friends we would like to send the invitation to.
    $scope.selectedFriends = [];


    $(document).ready(function(){

            // make api call to bring user's friends
            $http.post(window.location.origin + '/api/getMyFriends', { userId: $scope.$parent.connectedUser._id } ).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // if user has signed up or not
                    if(data == null){
                        console.log('(data = null) in suitmyfriendsCntrl:');
                    }else{
                        $scope.friendList = data;

                        console.log('$scope.friendList',$scope.friendList);
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


                $http.post(window.location.origin + '/api/getFriendsCircles', { userId: $scope.$parent.connectedUser._id } ).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    // if user has signed up or not
                    if(data == null){
                        console.log('(data = null) in suitmyfriendsCntrl:');
                    }else{
                        console.log('data',data);
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


    console.log('selectFriendsCntrl');
    });
});


