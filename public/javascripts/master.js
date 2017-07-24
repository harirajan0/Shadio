var app = angular.module('shadioApp', []);

app.factory('$util', function()
{
    var util = 
    {
        guid: function() 
        {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, 
                c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4)
                    .toString(16));
        }
    };

    return util;
})

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
.controller('signupController', ['$scope', '$rootScope', '$http', '$util', function($scope, $rootScope, $http, $util)
{
    $scope.generateGuid = function() 
    {
        console.log($util.guid());
    }

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

}])
.controller('newRadioController', ['$scope', '$sce', '$util', function($scope, $sce, $util)
{
    $scope.radioInfo = 
    {
        name: 
        {
            value: "",
            isInvalid: false
        },
        description: "",
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
        id: $sce.trustAsHtml($util.guid()),
        isPrivate: false
    };

    $scope.sendRadioInfo = function() 
    {
        console.log("jooo");

        $scope.radioInfo.name.isInvalid = $scope.radioInfo.name.value.length == 0;
        if ($scope.radioInfo.isPrivate)
        {
            $scope.radioInfo.password.isInvalid = $scope.radioInfo.password.value.length < 6;
            $scope.radioInfo.repeatedPassword.isInvalid = $scope.radioInfo.password.value != $scope.radioInfo.repeatedPassword.value;
        }

        if (!($scope.radioInfo.name.isInvalid
            || $scope.radioInfo.password.isInvalid
            || $scope.radioInfo.repeatedPassword.isInvalid))
        {
            //send the info
            console.log("radio created");
        }
    }
}]);