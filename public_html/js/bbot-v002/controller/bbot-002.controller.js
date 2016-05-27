myApp.controller('BBot02Controller', [
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
        
        $scope.orderByList;
        $scope.orderByListIcon;

        var init = function () {

            $scope.orderByList = '-datacriacao';
            $scope.orderByListIcon = 'fiber_new';

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
                

                var processDate = function (element, index, list) {
                    console.log(element);
                    console.log(index);

                    list[index].datalembrete = new Date(element.datalembrete);
                };

                leadsInfo.$loaded().then(function () {
                    $rootScope.howManyLeads = leadsInfo.length;
                    countLeads(leadsInfo);

                    //leadsInfo.forEach(processDate);

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

                $rootScope.contatosList = contatosList;
                $rootScope.fasesList = fasesList;
                $scope.leadsList = leadsInfo;

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

//                            if (tipo == 'modal') {
//                                itemLead.datalembrete = dataLembrete.getTime();
//                            }
                            
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



                    var result = contatoRef.orderByChild("nome").equalTo($scope.lead.contato);

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
                    $scope.loadItem.datalembrete = new Date(loadItem.datalembrete);

                    jQuery('#modalLead').modal();


                };//loadLead

                $scope.faseChangeModal = function () {
                	
                	console.log($scope.loadItem);

                    mudarFaseMudarLembrete($scope.loadItem, 'modal');
                };

                $scope.salvarUpdateModal = function () {

                    $scope.loadItem.datalembrete = $scope.loadItem.datalembrete.getTime(),
                            leadsInfo.$save($scope.loadItem).then(function (item) {

                        Log.regitroLead(uid, $scope.loadItem);

                    });
                };
                $scope.excluirUpdateModal = function () {



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

                $scope.loadDica = function (ev) {

                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.confirm()
                            .title('Dica')
                            .textContent('Em breve teremos dicas para cada momento de seu lead. Aguarde!')
                            .ariaLabel('Lucky day')
                            .targetEvent(ev)
                            .ok('Gostei :)')
                            .cancel('Não gostei :(');
                    $mdDialog.show(confirm).then(function () {
                        $scope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        $scope.status = 'You decided to keep your debt.';
                    });

                };



                $scope.setFiltroData = function () {

                    var hj = new Date().setHours(0, 0, 0, 0);

                    if ($scope.filtro.data == 0) {

                        $scope.filtro.lembrete = '';

                    } else if ($scope.filtro.data == 1) {

                        $scope.filtro.lembrete = hj;

                    } else if ($scope.filtro.data == 2) {

                        $scope.filtro.lembrete = hj;

                    } else {

                    }


                };


                $scope.setTipoLista = function () {


                    //$scope.config.tipoLista = $scope.filtro.tipoLista;
                };


                var originatorEv;
                $scope.openMenu = function ($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };
                
                $scope.setLeadsOrder = function (orderBy, icon){
                    $scope.orderByList = orderBy;
                    $scope.orderByListIcon = icon;
                };
                


                // somewhere in your webapp
                function buttonClicked() {
                    $rootScope.$broadcast('FLIP_EVENT_IN');
                }



            }// if authUser
        });// onAuth

    }]);// BBotController
