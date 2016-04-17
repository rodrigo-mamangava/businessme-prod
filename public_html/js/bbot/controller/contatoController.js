myApp.controller('ContatoController', [
    '$scope',
    '$rootScope',
    'Contatos',
    '$firebaseAuth',
    '$firebaseArray',
    "$firebaseObject",
    'FIREBASE_URL',
    function ($scope, $rootScope, Contatos, $firebaseAuth, $firebaseArray,
            $firebaseObject, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {

                //variaveis locais
                var uid = authUser.uid;

                var limparCampos = function () {
                    $scope.contato.nome = "";
                    $scope.contato.email = "";
                    $scope.contato.tel = "";
                    $scope.contato.obs = "";
                    $scope.contato.editavel = true;
                    $scope.contato.novo = true;

                };


                //referencias
                var contatoRef = new Firebase(FIREBASE_URL + 'users/' + uid
                        + '/contatos');


                //$firebaseArray
                var contatosList = $firebaseArray(contatoRef);


                console.log(contatosList);

                //$scope variaveis
                $scope.contatosList = contatosList;

                $scope.contato = {
                    nome: '',
                    email: '',
                    tel: '',
                    obs: '',
                    novo: true
                };

                $scope.contatoModal = {
                    nome: '',
                    email: '',
                    tel: '',
                    obs: '',
                    novo: false
                };

                //$scope funcoes

                /**
                 * @description Aqui vai a descricao
                 * 
                 */
                var atualizarLeads = function (oldName, newName) {

                    var leadsRef = new Firebase(FIREBASE_URL + 'users/' + uid
                            + '/leads');

                    var listLeads = $firebaseArray(leadsRef);

                    listLeads.$loaded(function () {
                        var item;
                        for (item in listLeads) {
                            if (listLeads[item]['contato'] == oldName) {
                                listLeads[item]['contato'] = newName;
                            }
                            listLeads.$save(listLeads[item]);
                        }
                    });
                };//atualizarLeads

                /**
                 * Sincronizar doi objetos contatos
                 * @param {Contato} contato01
                 * @param {Contato} contato02
                 * @returns {undefined}
                 */
                var syncContatos = function (contato01, contato02) {

                    contato01.nome  = (contato02.nome)  ? contato02.nome    : '';
                    contato01.email = (contato02.email) ? contato02.email   : '';
                    contato01.tel   = (contato02.tel)   ? contato02.tel     : '';
                    contato01.obs   = (contato02.obs)   ? contato02.obs     : '';
                    
                    return true;

                };


                $scope.addContato = function () {

                    if ($scope.contato.novo) {
                        console.log('nao exite, criar!');
                        contatosList.$add($scope.contato);
                    } else {
                        console.log('ja exite, atualizar!');

                        var oldName = $scope.registroContato.nome;
                        var newName = $scope.contato.nome;
                        
                        syncContatos($scope.registroContato, $scope.contato);

                        contatosList.$save($scope.registroContato);
                        atualizarLeads(oldName, newName);
                    }

                    limparCampos();

                };

                $scope.loadContato = function (chave, contato) {
                    var contatoEditavel = contatosList.$getRecord(contato.$id);

                    $scope.registroContato = contatoEditavel;

                    $scope.contatoModal.novo = false;
                    
                    syncContatos($scope.contatoModal, contatoEditavel);

                    contatosList.$save($scope.contatoModal);
                };

                $scope.modalSalvarContato = function () {

                    console.log($scope.contatoModal);

                    var oldName = $scope.registroContato.nome;
                    var newName = $scope.contatoModal.nome;
                    
                    syncContatos($scope.registroContato, $scope.contatoModal);


                    contatosList.$save($scope.registroContato);
                    atualizarLeads(oldName, newName);

                };


                $scope.deleteContato = function (contato) {

                    if (confirm("Deseja deletar esse contato?")) {
                        // todo code for deletion
                        contatosList.$remove(contato);
                    }
                };



            }// if authUser
        });// onAuth

    }]);// BBotController
