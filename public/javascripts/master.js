var app = angular.module('shadioApp', []);

app
.controller('homeController', ['$scope', '$routeParams', '$rootScope', function($scope, $routeParams, $rootScope)
{
    $rootScope.username = $routeParams.username;
}]) 
.controller('loginController', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window)
{
    $scope.authentication = 
    {
        username: "",
        password: "",
        isInvalid: false
    }

    $scope.sendAuthentication = function() 
    {
        $scope.authentication.isInvalid = true;
        // perform db query and according change authentication.isValid
        if (!$scope.authentication.isInvalid) 
        {   
            $rootScope.username = $scope.authentication.username;
            $location.hash('/home/' + $scope.authentication.username); 
        }
    }

    $scope.goToSignup = function() 
    {
        $window.location.assign('/signup');
    }

    $scope.goToForgotPassword = function() 
    {
        // redirect page to forgot password
    }

}])
.controller('signupController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http)
{
    $scope.userInfo = 
    {
        username:
        {
            value: "",
            isEmpty: false,
            isInvalid: false
        },
        password: 
        {
            value: "",
            isInvalid: false
        },
        repeatedPassword: 
        {
            value: "",
            isInvalid: false
        },
        securityQuestion: 
        {
            value: "",
            isEmpty: false
        },
        securityAnswer: 
        {
            value: "",
            isEmpty: false
        },
    };

    $scope.sendUserInfo = function() 
    {
        $scope.userInfo.username.isInvalid = false; // fix this later
        $scope.userInfo.username.isEmpty = $scope.userInfo.username.value.length == 0;
        $scope.userInfo.password.isInvalid = $scope.userInfo.password.value.length < 6;
        $scope.userInfo.repeatedPassword.isInvalid = $scope.userInfo.password.value !== $scope.userInfo.repeatedPassword.value;
        $scope.userInfo.securityQuestion.isEmpty = $scope.userInfo.securityQuestion.value.length == 0;
        $scope.userInfo.securityAnswer.isEmpty = $scope.userInfo.securityAnswer.value.length == 0;

        if(!($scope.userInfo.username.isInvalid
            || $scope.userInfo.username.isEmpty
            || $scope.userInfo.password.isInvalid
            || $scope.userInfo.repeatedPassword.isInvalid
            || $scope.userInfo.securityQuestion.isEmpty
            || $scope.userInfo.securityAnswer.isEmpty)) 
        {
            var userInfo = 
            {
                username: $scope.userInfo.username.value,
                password: $scope.userInfo.password.value,
                securityQuestion: $scope.userInfo.securityQuestion.value,
                securityAnswer: $scope.userInfo.securityAnswer.value,
            }
            // register user in our database
            $http.post('server/register_user', userInfo);

            // login the user
            // redirect page to home
            
        }
    };

    $scope.goToLogin = function() 
    {
        $window.location.assign('/login');
    }
}])
.controller('radioController', ['$scope', function($scope, $rootScope)
{

}])
.controller('profileController', ['$scope', function($scope, $rootScope)
{

}]);