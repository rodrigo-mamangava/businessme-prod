myApp.factory("MoipAssinatura", ["$firebaseArray", 'FIREBASE_URL', '$http', '$rootScope',
    function ($firebaseArray, FIREBASE_URL, $http, $rootScope) {

        var consultar = function (plano) {

            console.log('consultar SERVICE');

            var url = 'moip-engine/consultar-assinatura.php';

            $http({
                method: 'POST',
                url: url,
                data: plano,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {

                $rootScope.dadosAssinatura = response.data;

            }, function (response) {
       
            });

        };//consultar


        var reativar = function (plano) {

            var url = 'moip-engine/reativar-assinatura.php';
            $http({
                method: 'POST',
                url: url,
                data: plano,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {


            }, function (response) {

            });


        };//reativar

        var suspender = function (plano) {

            var url = 'moip-engine/suspender-assinatura.php';
            $http({
                method: 'POST',
                url: url,
                data: plano,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                console.log('== resultado do suspender ==');
                console.log(response);

            }, function (response) {
                console.log('falha');
                console.log(response);
            });


        };//suspender

        var cancelar = function (plano) {

            var url = 'moip-engine/cancelar-assinatura.php';
            $http({
                method: 'POST',
                url: url,
                data: plano,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                console.log('== resultado do cancelar ==');
                console.log(response);

            }, function (response) {
                console.log('falha');
                console.log(response);
            });


        };//cancelar


        var criar = function (assinatura) {

            console.log('== CRIAR ASSINATURA from SERVICE ==');


            var urlAssinatura = 'moip-engine/criar-assinatura.php';


            var promise = $http({
                method: 'POST',
                url: urlAssinatura,
                data: assinatura,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {

                return response.data;

            });

            return promise;
        };//criar


        return {
            consultar: consultar,
            reativar: reativar,
            suspender: suspender,
            cancelar: cancelar,
            criar: criar,
        };
    }
]);