myApp.factory("Fase", ["$firebaseObject", 'FIREBASE_URL',
    function ($firebaseObject, FIREBASE_URL) {

        var Contatos = $firebaseObject.$extend({
            
        });

        return function (userId, faseName) {
            var ref = new Firebase( FIREBASE_URL + 'users/' + userId + '/fases').child(faseName);
            // create an instance of User (the new operator is required)
            return new Fase(ref);
        };
    }
]);