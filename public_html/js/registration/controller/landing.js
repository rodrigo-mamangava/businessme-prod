myApp.controller('LandingCoontroller', ['$rootScope', '$scope', 'Authentication', '$http',
    function ($rootScope, $scope, Authentication, $http) {


        $http({
            method: "GET",
            url: "js/registration/model/areas-atuacao.json"
        }).then(function mySucces(response) {
            $scope.areas = response.data;

        }, function myError(response) {
            $scope.areas = '';
        });

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
