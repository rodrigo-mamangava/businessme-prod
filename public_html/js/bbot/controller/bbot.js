myApp.controller('BBotController', [
    '$scope',
    '$rootScope',
    '$mdDialog',
    'Contatos',
    'Log',
    '$firebaseAuth',
    '$firebaseArray',
    '$firebaseObject',
    'FIREBASE_URL',
    function ($scope, $rootScope, $mdDialog, Contatos, Log, $firebaseAuth,
            $firebaseArray, $firebaseObject, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        var init = function () {

            $scope.filtro = {
                data: '0',
                tipoLista: 'grid'
            };
        };

        init();

        auth.$onAuth(function (authUser) {
            if (authUser) {

                //variaveis
                var uid = authUser.uid;

                //referencias
                var leadsRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/leads');

                var contatoRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/contatos');

                var fasesRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/fases');

                var configRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/config');

                //$firebaseArray
                var leadsInfo = $firebaseArray(leadsRef);

                var contatosList = $firebaseArray(contatoRef);

                var fasesList = $firebaseArray(fasesRef);
                
                

                
                
//                var configObj = $firebaseObject(configRef);
//
//
//                configObj.$bindTo($scope, "config").then(function () {
//                    $scope.config.tipoLista = "grid";  // will be saved to the database                        
//                    console.log($scope.config);
//                });
//
//
//                configObj.$loaded()
//                        .then(function (data) {
//                            $scope.filtro.tipoLista = $scope.config.tipoLista;
//                            console.log(data);
//                        })
//                        .catch(function (error) {
//                        });
                
                

                var countLeads = function (leadsInfo) {

                    $rootScope.pontencialTotal = 0;
                    $rootScope.contatoTotal = 0;
                    $rootScope.orcamentoTotal = 0;
                    $rootScope.negociacaoTotal = 0;
                    $rootScope.outrosTotal = 0;

                    for (i = 0; i < leadsInfo.length; i++) {

                        if (leadsInfo[i].fase == 'Potencial cliente') {
                            $rootScope.pontencialTotal += 1;
                        } else if (leadsInfo[i].fase == 'Contato') {
                            $rootScope.contatoTotal += 1;
                        } else if (leadsInfo[i].fase == 'Orçamento') {
                            $rootScope.orcamentoTotal += 1;
                        } else if (leadsInfo[i].fase == 'Negociação') {
                            $rootScope.negociacaoTotal += 1;
                        } else {
                            $rootScope.outrosTotal += 1;
                        }

                    }
                };

                contatosList.$loaded().then(function () {
                    $rootScope.howManyContatos = contatosList.length;
                });// contatosList.$loaded

                leadsInfo.$loaded().then(function () {
                    $rootScope.howManyLeads = leadsInfo.length;
                    countLeads(leadsInfo);
                });// leadsInfo.$loaded

                //$watch                
                contatosList.$watch(function () {
                    $rootScope.howManyContatos = contatosList.length;
                });// contatosList.$watch

                leadsInfo.$watch(function () {
                    $rootScope.howManyLeads = leadsInfo.length;
                    countLeads(leadsInfo);

                });// leadsInfo.$watch

                //$scope

                $scope.myDate = new Date();
                $scope.loadItem = "";
                $scope.leadsList = leadsInfo;
                $rootScope.contatosList = contatosList;
                $rootScope.fasesList = fasesList;

                //$scope functions

                $scope.faseChange = function () {

                    mudarFaseMudarLembrete($scope.lead, 'normal');

                };

                var mudarFaseMudarLembrete = function (itemLead, tipo) {

                    var nomeFase = itemLead.fase;

                    fasesRef.orderByChild("comando").equalTo(nomeFase).on("child_added", function (snapshot) {

                        if (snapshot) {

                            var faseSel = fasesList.$getRecord(snapshot.key());

                            var dataLembrete = new Date();
                            dataLembrete.setHours(0, 0, 0, 0);
                            dataLembrete.setDate(dataLembrete.getDate() + faseSel.lembrete);

                            itemLead.datalembrete = dataLembrete;

                            if (tipo == 'modal') {
                                itemLead.datalembrete = dataLembrete.getTime();
                            }

                        }

                    });

                };

                $scope.limparFiltroProjeto = function () {
                    $scope.lead.projeto = '';
                };
                $scope.limparFiltroContato = function () {
                    $scope.lead.contato = '';
                };
                $scope.limparFiltroFase = function () {
                    $scope.lead.fase = '';
                };

                $scope.addLead = function () {

                    var nomeContato = $scope.lead.contato;

                    console.log($scope.lead.contato);

                    var result = contatoRef.orderByChild("nome").equalTo($scope.lead.contato);
//
                    var list = $firebaseArray(result);

                    list.$loaded().then(function () {

                        if (list.length == 0) {
                            contatosList.$add({
                                nome: nomeContato
                            });
                        }

                    });// list.$loaded



                    leadsInfo.$add({
                        contato: $scope.lead.contato,
                        projeto: $scope.lead.projeto,
                        datalembrete: $scope.lead.datalembrete.getTime(),
                        fase: $scope.lead.fase,
                        datacriacao: Firebase.ServerValue.TIMESTAMP,
                    }).then(function (regLead) {

                        var novoItem = leadsInfo.$getRecord(regLead.key());
                        novoItem.uid = regLead.key();
                        leadsInfo.$save(novoItem).then(function () {
                            // data has been saved to our database
                        });

                        Log.criarLead(uid, novoItem);

                    });

                    $scope.lead = "";

                };//addLead

                $scope.loadLead = function (idLead) {

                    var loadItem = leadsInfo.$getRecord(idLead);
                    $scope.loadItem = loadItem;


//                    var refLoadLead = new Firebase(FIREBASE_URL + 'users/' + uid
//                            + '/leads/' + idLead);
//                    
//                    var loadLeadData = $firebaseObject(refLoadLead);
//
//                    loadLeadData.$bindTo($scope, "loadItem").then(function () {
//                        console.log($scope.loadItem);
//                    });
//
//
//                    loadLeadData.$watch(function () {
//                        console.log("data changed!");
//                        console.log($scope.loadItem);
//                    });

                };//loadLead

                $scope.faseChangeModal = function () {

                    mudarFaseMudarLembrete($scope.loadItem, 'modal');
                };

                $scope.salvarUpdateModal = function () {

                    leadsInfo.$save($scope.loadItem).then(function (item) {

                        Log.regitroLead(uid, $scope.loadItem);

                    });
                };
                $scope.excluirUpdateModal = function () {

                    console.log($scope.loadItem);

                    if (confirm("Tem certeza que deseja excluir esse LEAD?")) {
                        // todo code for deletion
                        leadsInfo.$remove($scope.loadItem).then(function (item) {
                            //Log.regitroLead(uid, $scope.loadItem);
                            console.log(item);
                        });
                    }



                };

                $scope.salvarNota = function (idLead) {

                    var refNota = new Firebase(FIREBASE_URL + 'users/' + uid + '/leads/' + $scope.loadItem.uid + '/nota');
                    var notaList = $firebaseArray(refNota);

                    var nota = {
                        datacriacao: Firebase.ServerValue.TIMESTAMP,
                        nota: $scope.obsmodal
                    };

                    notaList.$add(nota)
                            .then(function () {
                                $scope.obsmodal = "";
                                Log.regitroNota(uid, $scope.loadItem, nota);

                            });


                };

                $scope.deleteLead = function (key) {
                    leadsInfo.$remove(key);
                };// deleteLead

                $scope.addContato = function () {
                    var contato1 = new Contatos(uid, $scope.contatoname);
                    contato1.name = $scope.contatoname;
                    contato1.$save();
                    $scope.contatoname = "";
                };

                $scope.loadDica = function ($event) {
                    $event.stopPropagation();

                    $mdDialog.show(
                            $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Dica')
                            .textContent('Em brete teremos dicas para cada momento de seu lead. Aguarde!')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')
                            .targetEvent($event)
                            );

                };



                $scope.setFiltroData = function () {

                    var hj = new Date().setHours(0, 0, 0, 0);

                    if ($scope.filtro.data == 0) {
                        console.log(1);
                        $scope.filtro.lembrete = '';

                    } else if ($scope.filtro.data == 1) {
                        console.log(2);


                        $scope.filtro.lembrete = hj;

                    } else if ($scope.filtro.data == 2) {
                        console.log(3);

                        $scope.filtro.lembrete = hj;

                    } else {
                        console.log(4);
                    }

                    console.log($scope.leadsList);
                    console.log($scope.filtro);
                };


                $scope.setTipoLista = function () {
                    console.log($scope.filtro);

                    //$scope.config.tipoLista = $scope.filtro.tipoLista;
                };


                // somewhere in your webapp
                function buttonClicked() {
                    $rootScope.$broadcast('FLIP_EVENT_IN');
                }



            }// if authUser
        });// onAuth

    }]);// BBotController
