myApp.factory("Contato", ["$firebaseObject", "FIREBASE_URL",
    function ($firebaseObject, FIREBASE_URL) {
        // create a new service based on $firebaseObject
        var Contato = $firebaseObject.$extend({
        });

        return function (userId) {
//      var ref = new Firebase(FIREBASE_URL + 'users/'
//				+ userId + '/contato').child(name);

            var contatoRef = new Firebase(FIREBASE_URL + 'users/' + userId
                    + '/contato');

            return new Contato(contatoRef);
        };
    }
]);