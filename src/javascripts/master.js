console.log('here');

var app = angular.module('shadioApp', ['ngRoute']);

app.config(function($routeProvider) 
{
    $routeProvider
        .when('/home', {
            templateUrl: './views/home.html', 
            controller: 'homeController'
        })

        .when('/login', {
            templateUrl: '../views/login.html', 
            controller: 'loginController'
        })

        .when('/signup', {
            templateUrl: '../views/signup.html', 
            controller: 'signupController'
        })

        .when('/radio', {
            templateUrl: '../views/radio.html', 
            controller: 'radioController'
        })

        .when('/profile', {
            templateUrl: '../views/profile.html', 
            controller: 'profileController'
        })

        .otherwise('/login');
});

app.controller('homeController', ['$scope', function($scope, $rootScope)
{

}]) 
.controller('loginController', ['$scope', function($scope, $rootScope)
{

}])
.controller('signupController', ['$scope', function($scope, $rootScope)
{

}])
.controller('radioController', ['$scope', function($scope, $rootScope)
{

}])
.controller('profileController', ['$scope', function($scope, $rootScope)
{

}]);