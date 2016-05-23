myApp.controller('BBot03Controller', [
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
    function ($scope, $rootScope, $mdDialog, $timeout, Contatos, Log, $firebaseAuth,
            $firebaseArray, $firebaseObject, FIREBASE_URL, $mdMedia, $q, $log, $mdToast) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        $scope.orderByList;
        $scope.orderByListIcon;
        $scope.fases;

        $rootScope.nomePagina = "Inicial";


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

                var metaRef = new Firebase(FIREBASE_URL + 'users/' + uid + '/meta');

                //$firebaseArray
                var leadsInfo = $firebaseArray(leadsRef);

                var contatosList = $firebaseArray(contatoRef);

                var fasesList = $firebaseArray(fasesRef);

                var metaList = $firebaseArray(metaRef);

                $rootScope.metaList = metaList;

                

                

                metaList.$loaded().then(function () {
                    $rootScope.metaList = metaList;
                    console.log($rootScope.metaList);

                    var query = metaRef.orderByChild("create_at").limitToLast(1);

                    var lastMeta = $firebaseArray(query);

                    lastMeta.$loaded(function(){
                        $rootScope.lastMeta = lastMeta[0];

                    });

                });//metaList.$loaded()







                metaList.$watch(function() {
                    $rootScope.metaList = metaList;

                    var query = metaRef.orderByChild("create_at").limitToLast(1);

                    var lastMeta = $firebaseArray(query);

                    lastMeta.$loaded(function(){

                        $rootScope.lastMeta = lastMeta[0];

                    });

                    
                });

                leadsInfo.$loaded().then(function () {
                    $rootScope.totalLeads = leadsInfo.length;
                });// contatosList.$loaded
                leadsInfo.$watch(function () {
                    $rootScope.totalLeads = leadsInfo.length;
                });// contatosList.$watch



                //$scope

                $scope.myDate = new Date();
                $scope.loadItem = "";
                $scope.leadsList = leadsInfo;
                $scope.filtroLista = "";
                $scope.iconeFiltro = "";
                $scope.leadsStatus = "!Fechamento";
                $scope.leadsStatusNome = "Ativos";
                $scope.filtroFase = "Ativos";


                //$rootScope
                $rootScope.contatosList = contatosList;
                $rootScope.fasesList = fasesList;
                

                //$scope functions

                $scope.faseChange = function (load_item, $event) {
                    mudarFaseMudarLembrete(load_item, 'normal');

                };

                $scope.showDetalheMeta = function(){
                    jQuery('#detalhes-meta').slideToggle();
                    jQuery('#btn-detalhe-meta').toggleClass('ativo');
                };


                $scope.faseHasChange = function (lead, $event) {

                    mudarFaseMudarLembrete(lead, 'TIMESTAMP');

                    leadsInfo.$save(lead).then(function (item) {
                        Log.regitroLead(uid, lead)
                    });


                    if(lead.fase == 'Fechamento: Sucesso'){
                        console.log('Sucesso');
                        console.log(lead);


                        console.log($rootScope.lastMeta);

                        if($rootScope.lastMeta.tipo == 'Unidade'){
                            $rootScope.lastMeta.total += 1;

                        }else{
                            $rootScope.lastMeta.total = $rootScope.lastMeta.total + lead.valor;
                        }

                        $rootScope.lastMeta.porcentagem = calcularPorcentagemMeta($rootScope.lastMeta);

                        var refObjMeta = new Firebase(FIREBASE_URL + 'users/' + uid + '/meta/'+ $rootScope.lastMeta.uid);

                        var objMetaAtual = $firebaseObject(refObjMeta);

                        var refSucesso = new Firebase(FIREBASE_URL + 'users/' + uid + '/meta/'+ $rootScope.lastMeta.uid + '/sucesso');

                        var sucessoList = $firebaseArray(refSucesso);

                        var novoSucesso = lead;
                        novoSucesso.close_at = Firebase.ServerValue.TIMESTAMP;

                        



                         // to take an action after the data loads, use the $loaded() promise
                         objMetaAtual.$loaded().then(function() {

                            console.log('objMetaAtual');
                            console.log(objMetaAtual);

                            console.log('$rootScope.lastMeta');
                            console.log($rootScope.lastMeta);

                            objMetaAtual.porcentagem = $rootScope.lastMeta.porcentagem;
                            objMetaAtual.total = $rootScope.lastMeta.total;


                            objMetaAtual.$save().then(function(ref) {
                              console.log(ref)

                              sucessoList.$add(novoSucesso);

                            }, function(error) {
                              console.log("Error:", error);
                            });



                         });


                        var confirm = $mdDialog.alert()
                                .title('Fechamento com sucesso!')
                                .textContent('Esse lead será arquivado e vamos adicionar esse sucesso a sua meta!')
                                .ariaLabel('Lucky day')
                                .targetEvent($event)
                                .ok('SIM!');

                        $mdDialog.show(confirm).then(function () {
        
                        }, function () {
                            console.log('continua!');
                        });



                    }else if(lead.fase == 'Fechamento: Falha'){
                        console.log("Falha");
                        console.log(lead);


                        var confirm = $mdDialog.alert()
                                .title('Fechando lead')
                                .textContent('Esse lead será arquivado.')
                                .ariaLabel('Lucky day')
                                .targetEvent($event)
                                .ok('OK');

                        $mdDialog.show(confirm).then(function () {
                            //leadsInfo.$remove(lead);
                            
                        }, function () {
                            console.log('continua!');
                        });

                        }



                };


                $scope.showSimpleToast = function(msg) {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(msg)
                    .position('top left')
                    .hideDelay(5000)
                );
              };




                



                 $scope.search = function(item){
                    if (!$scope.query || (item.brand.toLowerCase().indexOf($scope.query) != -1) || (item.model.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ){
                        return true;
                    }
                    return false;
                 };




                var mudarFaseMudarLembrete = function (itemLead, tipo) {

                    var nomeFase = itemLead.fase;

                    var dias = '';



                    fasesRef.orderByChild("comando").equalTo(nomeFase).on("child_added", function (snapshot) {

                        if (snapshot) {

                            var faseSel = fasesList.$getRecord(snapshot.key());

                            dias = faseSel.lembrete;

                            var dataLembrete = new Date();
                            dataLembrete.setHours(0, 0, 0, 0);
                            dataLembrete.setDate(dataLembrete.getDate() + faseSel.lembrete);

                            itemLead.datalembrete = dataLembrete;

                            if (tipo == 'TIMESTAMP') {
                                itemLead.datalembrete = dataLembrete.getTime();
                            }

                        }

                    });


                    $scope.showSimpleToast('Fase alterada para '+nomeFase+'.  Lembrete em '+dias+'. dias');




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


                    console.log('addLead');
                    console.log($scope.lead);


                    var nomeContato = $scope.lead.contato;

                    var result = contatoRef.orderByChild("nome").equalTo($scope.lead.contato);
                    
                    console.log('result', result);

                    var list = $firebaseArray(result);
                    
                    console.log('list.length', list.length);

                    list.$loaded().then(function () {

                        if (list.length == 0) {

                            contatosList.$add({
                                nome: nomeContato
                            });
                        }

                    });// list.$loaded


                    leadsInfo.$add({
                        contato: $scope.lead.contato,
                        valor: ($scope.lead.valor) ? $scope.lead.valor : 0,
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

                    $mdDialog.hide();

                };//addLead


                var calcularPorcentagemMeta = function(meta){
                    return (meta.total*100)/meta.quantidade;
                };



                $scope.addMeta = function(meta){
                	
                	meta.create_at =  Firebase.ServerValue.TIMESTAMP;
                	meta.data =  meta.data.getTime();
                    meta.porcentagem = 0;
                    //meta.sucesso = [0];


                    console.log(meta);

                    meta.porcentagem = calcularPorcentagemMeta(meta);
                    
                    var metaRef = new Firebase(FIREBASE_URL + 'users/' + uid + '/meta');

                    //$firebaseArray
                    var metaList = $firebaseArray(metaRef);
                    	
                    metaList.$add(meta)
                    .then(function(resul){
                    	console.log(resul);
                        var novoItem = metaList.$getRecord(resul.key());
                        novoItem.uid = resul.key();
                        metaList.$save(novoItem).then(function () {
                            // data has been saved to our database
                        });


                    }).catch(function(error){
                    	console.log(error);
                    });
                    
                    $mdDialog.hide();
                }

                $scope.initMeta = function (){

                    console.log('initMeta');

                    $scope.meta = {                        
                        nome: '',
                        tipo: '',
                        valor: 0,
                        unidades: '',
                        quantidade: 0,
                        pq: '',
                        quando: 0,
                        total: 0,
                        porcentagem: 0                     
                    };

                    $scope.selectedIndex = 0;
                    console.log($scope.meta);

                }


                $scope.nextTab = function(index) {
                    $scope.selectedIndex = index;

                };




                



                $scope.atualizarLead = function () {

                    console.log('atualizarLead');

                    $scope.load_item.datalembrete = $scope.load_item.datalembrete.getTime();

                    var lead_temp = leadsInfo.$getRecord($scope.load_item.$id);

                    console.log(lead_temp);

                    lead_temp.projeto       = $scope.load_item.projeto;
                    lead_temp.valor         = $scope.load_item.valor;
                    lead_temp.contato       = $scope.load_item.contato;
                    lead_temp.fase          = $scope.load_item.fase;
                    lead_temp.datalembrete  = $scope.load_item.datalembrete;

                    leadsInfo.$save(lead_temp).then(function(ref) {
                      console.log(ref);
                    }).catch(function(error){
                        console.log(error);
                    });


                    


                    $mdDialog.hide();



                };//atualizarLead



                $scope.faseChangeModal = function () {
                    mudarFaseMudarLembrete($scope.loadItem, 'modal');
                };

                $scope.salvarUpdateModal = function () {
                    $scope.loadItem.datalembrete = $scope.loadItem.datalembrete.getTime();
                    
                    leadsInfo.$save($scope.loadItem).then(function (item) {
                        Log.regitroLead(uid, $scope.loadItem);

                    });
                };

                $scope.novoLead = function (ev) {

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog
                    .show({
                        templateUrl: 'js/bbot-v002/view/lead-novo.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        scope: $scope,
                        preserveScope: true,
                    })
                    .then(function (answer) {

                            }, function () {

                            });
                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };//novoLead


                $scope.loadLeadModal = function (lead, ev) {

                    var load_item = leadsInfo.$getRecord(lead.$id);
                    $scope.load_item = load_item;
                    $scope.load_item.datalembrete = new Date(load_item.datalembrete);
 

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                    $mdDialog.show({
                        templateUrl: 'js/bbot-v002/view/lead-load.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        scope: $scope,
                        preserveScope: true,                        
                    }).then(function (answer) {

                    }, function () {

                    });

                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };//loadLeadModal




                $scope.loadNotas = function (lead, ev) {

                    console.log(lead);

                    var load_item = leadsInfo.$getRecord(lead.$id);
                    $scope.load_item = load_item;
                    $scope.load_item.datalembrete = new Date(load_item.datalembrete);

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        templateUrl: 'js/bbot-v002/view/notas.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen,
                        scope: $scope,
                        preserveScope: true,
                    })
                            .then(function (answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                $scope.status = 'You cancelled the dialog.';
                            });
                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };//novaMeta







                $scope.novaMeta = function (meta, ev) {

                    $scope.initMeta();

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        templateUrl: 'js/bbot-v002/view/meta-novo.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                            .then(function (answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                $scope.status = 'You cancelled the dialog.';
                            });
                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };//novaMeta

                $scope.novoContato = function (ev) {

                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                    $mdDialog.show({
                        templateUrl: 'js/bbot-v002/view/contato-novo.view.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                            .then(function (answer) {
                                $scope.status = 'You said the information was "' + answer + '".';
                            }, function () {
                                $scope.status = 'You cancelled the dialog.';
                            });
                    $scope.$watch(function () {
                        return $mdMedia('xs') || $mdMedia('sm');
                    }, function (wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                    });

                };//novoContato

                $scope.salvarNota2 = function (notaTexto, lead) {

                    console.log('salvarNota2');

                    var refNota = new Firebase(FIREBASE_URL + 'users/' + uid + '/leads/' + lead.$id + '/nota');
                    var notaList = $firebaseArray(refNota);

                    var nota = {
                        datacriacao: Firebase.ServerValue.TIMESTAMP,
                        nota: notaTexto.texto
                    };

                    notaList.$add(nota)
                            .then(function () {
                                $scope.obsmodal = "";
                                Log.regitroNota(uid, lead, nota);

                            });


                    notaTexto.texto = '';


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


                $scope.deletarLead = function(lead, $event){


                    var confirm = $mdDialog.confirm()
                            .title('Você tem certeza que deseja remover esse LEAD?')
                            .textContent('Caso você delete esse item, ele será apagado para sempre.')
                            .ariaLabel('Lucky day')
                            .targetEvent($event)
                            .ok('Sim, deletar')
                            .cancel('Cancelar');
                    $mdDialog.show(confirm).then(function () {
                        leadsInfo.$remove(lead);
                        
                    }, function () {
                        console.log('continua!');
                    });

                }


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

                $scope.setLeadsOrder = function (orderBy, icon) {
                    $scope.orderByList = orderBy;
                    $scope.orderByListIcon = icon;
                };


                $scope.filterAtivos = function(status){

                    switch (status) {
                        case 'Ativos':
                            $scope.leadsStatus = "!Fechamento";
                            $scope.filtroFase = 'Ativos';
                            break;
                        case 'Arquivados':
                            $scope.leadsStatus = "Fechamento";
                            $scope.filtroFase = 'Arquivados';
                            break;
                        case 'Todos':
                            $scope.leadsStatus = "";
                            $scope.filtroFase = 'Todos';
                            break;
                    };

                    $scope.leadsStatusNome = status;


                }

                $scope.filterList = function(fase){
                    $scope.filtroLista = fase;
                    $scope.iconeFiltro; 
                }

                $scope.openMenuCard = function ($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };


                //funçoes do modal
                
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
                

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

                var init = function () {

                    $scope.orderByList = '-datacriacao';
                    $scope.orderByListIcon = 'fiber_new';

                    $scope.filtro = {
                        data: '0',
                        tipoLista: 'grid'
                    };


                    $scope.fases = [
                        {order: 1, nome: 'Contato'},
                        {order: 2, nome: 'Potencial cliente'},
                        {order: 3, nome: 'Orçamento'},
                        {order: 4, nome: 'Negociação'},
                        {order: 5, nome: 'Fechamento: Falha'},
                        {order: 6, nome: 'Fechamento: Sucesso'},
                    ];

                    

                    contatos = $firebaseArray(contatoRef);

                    contatos.$loaded().then(function () {                   
                       $scope.datalistContato = contatos;
                    });// leadsInfo.$loaded
                    
                    
                    

                    
                    

                    
                };

                init();   
        

            }// if authUser
        });// onAuth

    }]);// BBotController

