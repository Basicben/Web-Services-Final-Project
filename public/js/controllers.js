suiteApp
.controller('signupCntrl', function($scope,$rootScope) {

	$scope.facebookInsert = function(){
		$scope.$parent.angFacebookLogin();
	}
    console.log('signupCntrl');
     
}).controller('homeCntrl', function($scope,$rootScope) {
     
    console.log('homeCntrl');
     
});