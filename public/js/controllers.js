suiteApp
.controller('signupCntrl', function($scope,$rootScope) {

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	}
    console.log('signupCntrl');
     
}).controller('homeCntrl', function($scope,$rootScope) {
     
    console.log('homeCntrl');
     
}).controller('welcomeCntrl', function($scope,$rootScope,$location) {
     
    console.log('welcomeCntrl');

    $scope.enterApp = function(){
    	if($scope.$parent.connectedUser != null){
    		$location.path('home');
    	}
    }
     
});