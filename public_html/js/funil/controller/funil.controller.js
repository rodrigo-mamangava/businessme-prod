myApp.controller('FunilController', [
	'$scope',
    '$rootScope',
    '$mdDialog',
    '$timeout',
    'Contatos',
    'Log',
    '$firebaseAuth',
    '$firebaseArray',
    '$firebaseObject',
    'FIREBASE_URL',
    '$mdMedia',
    '$q',
    '$log',
    '$mdToast', 
    function (
    	$scope, $rootScope, $mdDialog, $timeout, Contatos, Log, $firebaseAuth,
            $firebaseArray, $firebaseObject, FIREBASE_URL, $mdMedia, $q, $log, $mdToast
    	) {

    	var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

    	auth.$onAuth(function (authUser) {
            if (authUser) {

                //variaveis
                var uid = authUser.uid;



			var user = $rootScope.currentUser;
        
        	console.log('funil');


         	//referencias
            var leadsRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/leads');

           
                //$firebaseArray
                var leadsInfo = $firebaseArray(leadsRef);






        ///funil

                $scope.centerAnchor = true;
                $scope.toggleCenterAnchor = function () {
                    $scope.centerAnchor = !$scope.centerAnchor
                };
                //$scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
                var onDraggableEvent = function (evt, data) {
                    console.log("128", "onDraggableEvent", evt, data);
                };
                $scope.$on('draggable:start', onDraggableEvent);
                // $scope.$on('draggable:move', onDraggableEvent);
                $scope.$on('draggable:end', onDraggableEvent);


                var contatosListDrag = leadsRef.orderByChild("fase").equalTo('Contato');
                var listaContatos = $firebaseArray(contatosListDrag);
                $scope.droppedObjects1 = listaContatos;

                var potencialListDrag = leadsRef.orderByChild("fase").equalTo('Potencial cliente');
                var listaPotencial = $firebaseArray(potencialListDrag);
                $scope.droppedObjects2 = listaPotencial;

                var orcamentoListDrag = leadsRef.orderByChild("fase").equalTo('Orçamento');
                var listaOrcamento = $firebaseArray(orcamentoListDrag);
                $scope.droppedObjects3 = listaOrcamento;

                var negociacaoListDrag = leadsRef.orderByChild("fase").equalTo('Negociação');
                var listaNegociacao = $firebaseArray(negociacaoListDrag);
                $scope.droppedObjects4 = listaNegociacao;

                var fFalhaListDrag = leadsRef.orderByChild("fase").equalTo('Fechamento: Falha');
                var listafFalha = $firebaseArray(fFalhaListDrag);
                $scope.droppedObjects5 = listafFalha;



                $scope.onDropComplete1 = function (data, evt) {
                    console.log("127", "$scope", "onDropComplete1", data, evt);
                    var index = $scope.droppedObjects1.indexOf(data);
                    if (index == -1)
                        $scope.droppedObjects1.push(data);
                };
                $scope.onDragSuccess1 = function (data, evt) {
                    console.log("133", "$scope", "onDragSuccess1", "", evt);
                    var index = $scope.droppedObjects1.indexOf(data);
                    if (index > -1) {
                        $scope.droppedObjects1.splice(index, 1);
                    }
                };
                
                
                $scope.onDragSuccess2 = function (data, evt) {
                    var index = $scope.droppedObjects2.indexOf(data);
                    if (index > -1) {
                        $scope.droppedObjects2.splice(index, 1);
                    }
                };
                $scope.onDropComplete2 = function (data, evt) {
                    var index = $scope.droppedObjects2.indexOf(data);
                    if (index == -1) {
                        $scope.droppedObjects2.push(data);
                    }
                };
                
                
                $scope.onDragSuccess3 = function (data, evt) {
                    var index = $scope.droppedObjects3.indexOf(data);
                    if (index > -1) {
                        $scope.droppedObjects3.splice(index, 1);
                    }
                };
                $scope.onDropComplete3 = function (data, evt) {
                    var index = $scope.droppedObjects3.indexOf(data);
                    if (index == -1) {
                        $scope.droppedObjects3.push(data);
                    }
                };
                
                
                $scope.onDragSuccess4 = function (data, evt) {
                    var index = $scope.droppedObjects4.indexOf(data);
                    if (index > -1) {
                        $scope.droppedObjects4.splice(index, 1);
                    }
                };
                $scope.onDropComplete2 = function (data, evt) {
                    var index = $scope.droppedObjects4.indexOf(data);
                    if (index == -1) {
                        $scope.droppedObjects4.push(data);
                    }
                };
                
                
                $scope.onDragSuccess5 = function (data, evt) {
                    var index = $scope.droppedObjects5.indexOf(data);
                    if (index > -1) {
                        $scope.droppedObjects5.splice(index, 1);
                    }
                };
                $scope.onDropComplete2 = function (data, evt) {
                    var index = $scope.droppedObjects5.indexOf(data);
                    if (index == -1) {
                        $scope.droppedObjects5.push(data);
                    }
                };
                
                
                var inArray = function (array, obj) {
                    var index = array.indexOf(obj);
                };






            }

        });


       


    }]);// Controller












 