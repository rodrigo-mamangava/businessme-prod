myApp.controller('RegistrationController', ['$scope', 'Authentication',
    function ($scope, Authentication) {

        $scope.login = function () {
            Authentication.login($scope.user);
        };// login

        $scope.loginFacebook = function () {
            Authentication.loginFacebook();
        };//loginFacebook

        $scope.logout = function () {
            Authentication.logout();
        };//logout

        $scope.register = function () {
            Authentication.register($scope.user);
        };// register
        
        
        $scope.irPara = function (nav) {
            
            console.log(nav);

            jQuery.scrollTo(nav, {duration:'slow'});
        };
        
        

    }]);// Controller
