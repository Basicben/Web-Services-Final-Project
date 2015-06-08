var suiteApp = angular.module('suiteApp',['ngRoute']);

var USER = null;

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

suiteApp.controller('masterCntrl', function($scope,$http) {
     
    $scope.connectedUser = null;
    
    $(document).ready(function(){
        console.log('init');
        //$scope.connectedUser = checkLoginState();
    });

    $scope.angFacebookLogin = function(){
        $scope.connectedUser = facebookLogin(function(){
            $scope.connectedUser = USER;
            console.log('$scope.connectedUser',$scope.connectedUser);
            $http.post('http://localhost:3000/userInsert',{user:$scope.connectedUser}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('Success : data',data);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Error : status',status,'headers',headers);
              });
        });
    }

});