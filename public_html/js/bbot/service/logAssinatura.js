myApp.factory("LogAssinatura", ["$firebaseArray", 'FIREBASE_URL',
    function ($firebaseArray, FIREBASE_URL) {

//
//
//        var setExtra = function (item, tipo) {
//
//            item.dataupdate = Firebase.ServerValue.TIMESTAMP;
//            item.tipoLog = tipo;
//            
//            return item;
//
//        };

        return {
            criarLog: function (userId, lead) {
                var ref = new Firebase(FIREBASE_URL + 'users/' + userId + '/userData/log');
                var logList = $firebaseArray(ref);
              
                logList.$add(lead)
                        .then(function () {
                            return true;
                        }).catch(function (error) {
                    console.log(error);
                });

            },
        };
    }
]);