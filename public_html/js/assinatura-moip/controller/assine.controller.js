myApp.controller('AssineCoontroller', ['$rootScope', '$scope', '$http', '$location',
    'Authentication', 'FIREBASE_URL', '$firebaseObject', 'MoipAssinatura', '$mdDialog',
    function ($rootScope, $scope, $http, $location, Authentication, FIREBASE_URL,
            $firebaseObject, MoipAssinatura, $mdDialog) {


        $http({
            method: "GET",
            url: "js/assinatura-moip/model/estados-cidades.json"
        }).then(function mySucces(response) {
            $scope.estados = response.data.estados;

        }, function myError(response) {
            $scope.estados = '';
        });

        $http({
            method: "GET",
            url: "js/registration/model/areas-atuacao.json"
        }).then(function mySucces(response) {
            $scope.areas = response.data;

        }, function myError(response) {
            $scope.areas = '';
        });

        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.carregarCidades = function () {
            $scope.cidades = $scope.estados[$scope.id_estado].cidades;
        };

        $scope.listarPlanos = function () {

            var urlAssinatura = 'moip-engine/assinatura-moip-v01.php';

            console.log('subscribe aqui!');

            $http({
                method: 'GET',
                url: urlAssinatura,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                // set the headers so angular passing info as form data (not
                // request payload)
            }).success(function (data) {

                console.log(data);

            });
        };// getListaAssinaturas

        $scope.cadastroBusinessMeTrial = function () {

            console.log($scope.assinatura.user);

            Authentication.register($scope.assinatura.user);

        };

        $scope.cadastroBusinessMe = function () {

            console.log($scope.assinatura.user);

            Authentication.register($scope.assinatura.user, 'assinatura');

        };

        $scope.assinarTrial = function () {

            $scope.mostrarFormMoip = false;
            $rootScope.planoCode = "trial";
            Authentication.login($rootScope.UserTemp);
        };
        $scope.assinarDesbravador = function () {
            $rootScope.planoCode = "mvp-001";
            $scope.mostrarFormMoip = true;
        };

        $scope.$on('LOAD', function () {
            jQuery("#modalLoading").modal('show');
        });
        $scope.$on('UNLOAD', function () {
            jQuery("#modalLoading").modal('hide');
        });



        $scope.assinar = function () {
            $scope.$emit('LOAD');
            var estado = $scope.estados[$scope.id_estado].nome;
            $scope.assinatura.address_params.state = estado;
            $scope.assinatura.user = $rootScope.UserTemp;
            MoipAssinatura.criar($scope.assinatura).then(function (data) {
                $rootScope.planoCriado = data;
                var errors = data.errors;
                if (errors.length == 0) {
                    Authentication.loginToSucess($rootScope.UserTemp);
                    $scope.$emit('UNLOAD');
                    alert('Cadastro realizado com sucesso!');
                } else {
                    alert(errors[0].description);
                    $scope.$emit('UNLOAD');
                }
            });//MoipAssinatura.criar
        };// assinar
        
        $scope.initSucesso = function (){
          
            console.log($rootScope.currentUser);
            
        };







    }]);// Controller
