myApp.factory("Log", ["$firebaseArray", 'FIREBASE_URL',
    function ($firebaseArray, FIREBASE_URL) {

        var limparLead = function (lead) {
            delete lead.contato;
            delete lead.datalembrete;
            delete lead.nota;
            delete lead.projeto;
            delete lead.projeto;

            if (lead.log) {
                delete lead.log;
            }

            return lead;
        };

        var setExtra = function (item, tipo) {

            item.dataupdate = Firebase.ServerValue.TIMESTAMP;
            item.tipoLog = tipo;
            
            return item;

        };

        return {
            criarLead: function (userId, lead) {
                var ref = new Firebase(FIREBASE_URL + 'users/' + userId + '/leads/' + lead.uid + '/log');
                var logList = $firebaseArray(ref);

                lead = limparLead(lead);

                lead = setExtra(lead, 0);

                logList.$add(lead)
                        .then(function () {
                            return true;
                        }).catch(function (error) {
                    console.log(error);
                });

            },
            regitroLead: function (userId, lead) {
                var ref = new Firebase(FIREBASE_URL + 'users/' + userId + '/leads/' + lead.uid + '/log');
                var logList = $firebaseArray(ref);

                lead = limparLead(lead);

//                lead.dataupdate = Firebase.ServerValue.TIMESTAMP;
//                lead.tipoLog = 1;

                lead = setExtra(lead, 1);

                logList.$add(lead)
                        .then(function () {
                            return true;
                        }).catch(function (error) {
                    console.log(error);
                });

            },
            regitroNota: function (userId, lead, nota) {
                var ref = new Firebase(FIREBASE_URL + 'users/' + userId + '/leads/' + lead.uid + '/log');
                var logList = $firebaseArray(ref);

//                nota.dataupdate = Firebase.ServerValue.TIMESTAMP;
//                nota.tipoLog = 2;

                nota = setExtra(nota, 2);

                logList.$add(nota)
                        .then(function () {
                            return true;
                        }).catch(function (error) {
                    console.log(error);
                });

            }
        };
    }
]);