myApp.factory('Chamados', ['$rootScope','$scope',  '$firebaseArray', 'FIREBASE_URL',
    function ($rootScope, $scope, $firebaseArray, FIREBASE_URL) {


        var Chamado = {
            toggle_chamado: function () {
                jQuery('#chamado').slideToggle();
                $scope.chamadoMsg = '';
            },
            enviarChamado: function () {

                var user = $rootScope.currentUser;
                var refChadamoUser = new Firebase(FIREBASE_URL + 'users/' + user.regUser + '/chamados');
                var chamadoUserList = $firebaseArray(refChadamoUser);
                var chamadoGeral = new Firebase(FIREBASE_URL + 'chamados/' + $scope.chamado.tipo);
                //$firebaseArray
                var chamadosList = $firebaseArray(chamadoGeral);
                var chamado = {
                    data: Firebase.ServerValue.TIMESTAMP,
                    usuario: user.email,
                    usuarioId: user.regUser,
                    tipo: $scope.chamado.tipo,
                    mensagem: $scope.chamado.texto
                };
                chamadosList.$add(chamado);
                chamadoUserList.$add(chamado);
                $scope.chamado.tipo = '';
                $scope.chamado.texto = '';
                $scope.chamadoMsg = 'Chamado enviado com sucesso!';
            }
        }; // return
        return Chamado;

    }]); // factory
