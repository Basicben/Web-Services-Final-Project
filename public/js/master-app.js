var suiteApp = angular.module('suiteApp',['ngRoute']);
  
suiteApp .config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    $routeProvider.
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCntrl'
    }).
    otherwise({
            redirectTo: '/signup'
    });
    $locationProvider.html5Mode(true);
}]);

suiteApp.controller('masterCntrl', function($scope) {
     
    $scope.connectedUser = null;
    
    $scope.init = function(){
        console.log('init');
        $scope.connectedUser = checkLoginState();
        // GET PAGE WIDTH & HEIGHT
    }

    $scope.facebookLogin = function(){
        $scope.connectedUser == null ? $scope.connectedUser = facebookLogin() : 1=1;
    }
     
});