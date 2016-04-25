myApp.controller('LandingCoontroller', ['$rootScope', '$scope', 'Authentication',
    function ($rootScope, $scope, Authentication) {

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
        
        $scope.reset = function () {            
            Authentication.resetPassword($scope.emailReset);
        };// reset
        
        $scope.limparReset = function () {            
        	$rootScope.messageReset = "";
        	$scope.emailReset = "";
        };// reset
        
        

        $scope.listaProfissoes = [
            "Analista de siste"
        ];


        

    }]);// Controller
