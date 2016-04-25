myApp.factory("Contatos", ["$firebaseObject", 'FIREBASE_URL',
    function ($firebaseObject, FIREBASE_URL) {

        var Contatos = $firebaseObject.$extend({
            
        });

        return function (userId, contatoName) {
            var ref = new Firebase( FIREBASE_URL + 'users/' + userId + '/contatos/').child(contatoName);
            // create an instance of User (the new operator is required)
            return new Contatos(ref);
        };
    }
]);