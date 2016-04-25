myApp.controller('AssineCoontroller', ['$scope', '$http', function ($scope, $http) {

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
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            })
                    .success(function (data) {

                        console.log(data);

                    });
//
        };//getListaAssinaturas


        $scope.subscribe = function () {

            console.log($scope.assinatura);

            var urlAssinatura = 'moip-engine/assinatura-moip-v01.php';

            console.log('subscribe aqui!');

            $http({
                method: 'GET',
                url: urlAssinatura,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            })
                    .success(function (data) {

                        console.log(data);

                    });
//
        };//getListaAssinaturas







    }]);// Controller
