myApp.factory("Comandos", ["$firebaseObject", 'FIREBASE_URL',
    function ($firebaseObject, FIREBASE_URL) {

        var Contatos = $firebaseObject.$extend({
            
        });

        return function (userId, comandoName) {
            var ref = new Firebase( FIREBASE_URL + 'users/' + userId + '/lead').child(comandoName);
            // create an instance of User (the new operator is required)
            return new Comandos(ref);
        };
    }
]);