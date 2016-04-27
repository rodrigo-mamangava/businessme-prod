myApp.controller('ChamadoCoontroller', ['$rootScope', '$scope', '$firebaseArray',
    'FIREBASE_URL', function ($rootScope, $scope, $firebaseArray, FIREBASE_URL) {


        var user = $rootScope.currentUser;

        $scope.toggle_chamado = function () {
            jQuery('#chamado').slideToggle();
            jQuery('.btn-chamado').find('i').toggleClass('fa-chevron-down');
            jQuery('.btn-chamado').find('i').toggleClass('fa-chevron-up');

            $scope.chamadoMsg = '';



        };

        $scope.enviarChamado = function () {

            var chamadoGeral = new Firebase(FIREBASE_URL + 'chamados/' + $scope.chamado.tipo);
            var chamadosList = $firebaseArray(chamadoGeral);

            var refChadamoUser = new Firebase(FIREBASE_URL + 'users/' + user.regUser + '/chamados');
            var chamadoUserList = $firebaseArray(refChadamoUser);
            

            var chamado = {
                data: Firebase.ServerValue.TIMESTAMP,
                usuario: (user) ? user.email : 'fora-sistema',
                usuarioId: (user) ? user.regUser : 'fora-sistema',
                tipo: $scope.chamado.tipo,
                mensagem: $scope.chamado.texto
            };

            chamadosList.$add(chamado);
            chamadoUserList.$add(chamado);


            $scope.chamado.tipo = '';
            $scope.chamado.texto = '';

            $scope.chamadoMsg = 'Enviado com sucesso. Obrigado!';




        };






    }]);// Controller
