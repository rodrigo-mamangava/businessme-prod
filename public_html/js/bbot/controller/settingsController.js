myApp.controller('SettingsController', [
    '$scope',
    '$rootScope',
    'Contatos',
    '$firebaseAuth',
    '$firebaseArray',
    "$firebaseObject",
    'FIREBASE_URL',
    'Authentication',
    'MoipAssinatura',
    '$http',
    '$mdDialog',
    '$location',
    function ($scope, $rootScope, Contatos, $firebaseAuth, $firebaseArray,
            $firebaseObject, FIREBASE_URL, Authentication, MoipAssinatura, $http, 
            $mdDialog, $location) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {

                console.log($rootScope.currentUser);

                MoipAssinatura.consultar($rootScope.currentUser.plano);

                var uid = authUser.uid;
                

                var fasesRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/fases');
                var fasesList = $firebaseArray(fasesRef);

                fasesList.$loaded().then(function () {

                    loadList();

                });// $loaded then

                $scope.salvarFases = function () {
                    //console.log($scope.fasesList);
                };

                $scope.lembreteChange = function (i, lembrete) {
                    fasesList[i].lembrete = lembrete;
                    fasesList.$save(i);
                };


                var userRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/userData');
                var dadosUser = $firebaseObject(userRef);

                dadosUser.$loaded()
                        .then(function (userData) {
                            $scope.dadosUsuario = userData;



                        })
                        .catch(function (error) {
                            console.error("Error:", error);
                        });

                $scope.salvarMeusDados = function () {
                    dadosUser = $scope.dadosUsuario;
                    dadosUser.$save();

                    alert("Dados atualizados com sucesso!");

                    $scope.dadosUsuario = "";

                };


                var loadList = function () {
                    $scope.fasesList = fasesList;

                    console.log($scope.fasesList);

                    $scope.onDropComplete = function (index, obj, evt) {


                        var otherObj = $scope.fasesList[index];
                        var otherIndex = $scope.fasesList.indexOf(obj);



                    };
                };
                
                
                $scope.initSetting = function(){
                    MoipAssinatura.consultar($rootScope.currentUser.plano);
                };



                $scope.changeMyPass = function () {

                    Authentication.changePass($rootScope.currentUser.email, $scope.change.oldPass, $scope.change.newPass);

                    $scope.change = "";

                };

                $scope.suspender = function ($event) {

                    MoipAssinatura.suspender($rootScope.currentUser.plano);


                    $mdDialog.show(
                            $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupSuspender')))
                            .clickOutsideToClose(true)
                            .title('Sua assinatura fou suspensa')
                            .textContent('Sua assinatura foi SUSPENSA.Clique no botão ATUALIZAR  para verificar seu status atual.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                            .targetEvent($event)
                            );

                };

                $scope.consultar = function () {
                    MoipAssinatura.consultar($rootScope.currentUser.plano);

                };

                $scope.reativar = function ($event) {

                    MoipAssinatura.reativar($rootScope.currentUser.plano);

                    $mdDialog.show(
                            $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupReativar')))
                            .clickOutsideToClose(true)
                            .title('Sua assinatura fou suspensa')
                            .textContent('Sua assinatura foi REATIVADA.Clique no botão ATUALIZAR  para verificar seu status atual.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                            .targetEvent($event)
                            );

                };

                $scope.cancelar = function ($event) {

                    var confirm = $mdDialog.confirm()
                            .title('Você tem certeza que deseja cancelar sua assinatura?')
                            .textContent('Caso você cancele sua assinatura, não será possível reativá-la novamente. :(')
                            .ariaLabel('Lucky day')
                            .targetEvent($event)
                            .ok('Sim, desejo cancelar minha assinatura')
                            .cancel('Não, vou continuar com minha assinatura');
                    $mdDialog.show(confirm).then(function () {
                        console.log('cancelou');
                        MoipAssinatura.cancelar($rootScope.currentUser.plano);
                    }, function () {
                        console.log('continua!');
                    });


                    //

                };
                
                $scope.upgrade = function(){
                	$location.path('/upgrade');
                }


            }// if authUser
        });// onAuth

    }]);// BBotController
