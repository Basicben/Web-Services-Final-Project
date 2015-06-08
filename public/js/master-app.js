var suiteApp = angular.module('suiteApp',['ngRoute']);
  
suiteApp .config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    $routeProvider.
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/test', {
            templateUrl: 'templates/test.html',
            controller: 'testCntrl'
    }).
    otherwise({
            redirectTo: '/signup'
    });
    $locationProvider.html5Mode(true)
}]);

suiteApp.controller('masterCntrl', function($scope) {
     
    console.log('masterCntrl');
     
});