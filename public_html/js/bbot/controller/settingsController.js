myApp.controller('SettingsController', [
    '$scope',
    '$rootScope',
    'Contatos',
    '$firebaseAuth',
    '$firebaseArray',
    "$firebaseObject",
    'FIREBASE_URL',
    'Authentication',
    function ($scope, $rootScope, Contatos, $firebaseAuth, $firebaseArray,
            $firebaseObject, FIREBASE_URL, Authentication) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {

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
                	
                	alert("Dados atualizados com sucesso!")
                	
                	$scope.dadosUsuario = "";
                	
				};


                var loadList = function () {
                    $scope.fasesList = fasesList;

                    console.log($scope.fasesList);

                    $scope.onDropComplete = function (index, obj, evt) {


                        var otherObj = $scope.fasesList[index];
                        var otherIndex = $scope.fasesList.indexOf(obj);

                        console.log(otherObj);
                        console.log(otherIndex);

                    };
                };
                
                $scope.changeMyPass = function(){
                	                        
                	Authentication.changePass($rootScope.currentUser.email, $scope.change.oldPass, $scope.change.newPass);
                        
                        $scope.change = "";

                };


            }// if authUser
        });// onAuth

    }]);// BBotController
