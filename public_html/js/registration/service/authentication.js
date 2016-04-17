myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location',
    '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
    function ($rootScope, $firebaseAuth, $location,
            $firebaseObject, $firebaseArray, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {
                var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid + '/userData/');
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = '';
            }
        });

        var myObject = {
            login: function (user) {
                auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                }).then(function (regUser) {
                    $location.path('/bbot');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });

            }, // login

            logout: function () {
                return auth.$unauth();
            }, // logout

            requireAuth: function () {
                return auth.$requireAuth();                
            }, // requireAuth

            register: function (user) {
                auth.$createUser({
                    email: user.email,
                    password: user.password
                }).then(function (regUser) {

                    var regRef = new Firebase(FIREBASE_URL + 'users/' + regUser.uid);

                    regRef.child('userData').set({
                        date: Firebase.ServerValue.TIMESTAMP,
                        regUser: regUser.uid,
                        firstname: (user.firstname) ? user.firstname : '',
                        lastname: (user.lastname) ? user.lastname : '',
                        name: (user.name) ? user.name : '',
                        email: user.email,
                        picture: ''

                    });// user info

                    var fasesRef = new Firebase(FIREBASE_URL + 'users/' + regUser.uid + '/fases');

                    var fases = new $firebaseArray(fasesRef);

                    var potencial = {
                        comando: "Potencial cliente",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 5,
                        posicao: 0,
                        cod: 101
                    };
                    
                    var contato = {
                        comando: "Contato",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 3,
                        posicao: 1,
                        cod: 102
                    };
                    
                    var orcamento = {
                        comando: "Orçamento",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 3,
                        posicao: 2,
                        cod: 103
                    };
                    
                    var negocicao = {
                        comando: "Negociação",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 3,
                        posicao: 3,
                        cod: 104
                    };
                    
                    var sucesso = {
                        comando: "Fechamento: Sucesso",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 3,
                        posicao: 4,
                        cod: 201
                    };
                    
                    var falha = {
                        comando: "Fechamento: Falha",
                        descricao: "Aqui vai a descrição desse comando",
                        editavel: false,
                        lembrete: 3,
                        posicao: 5,
                        cod: 202
                    };
                    
                    

                    fases.$add(potencial);
                    fases.$add(contato);
                    fases.$add(orcamento);
                    fases.$add(negocicao);
                    fases.$add(sucesso);
                    fases.$add(falha);



                    myObject.login(user);

                }).catch(function (error) {
                    $rootScope.message = error.message;
                });

            }, // register

            loginFacebook: function () {
                auth.$authWithOAuthPopup("facebook", function (error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                    }
                }, {
                    scope: "email"
                }).then(function (authData) {

                    var regRef = new Firebase(FIREBASE_URL + 'users/' + authData.uid)
                            .child('userData').set({
                        date: Firebase.ServerValue.TIMESTAMP,
                        regUser: authData.facebook.id,
                        firstname: authData.facebook.cachedUserProfile.first_name,
                        lastname: authData.facebook.cachedUserProfile.last_name,
                        email: (authData.facebook.email) ? authData.facebook.email : "",
                        picture: authData.facebook.profileImageURL
                    });// user info

                    $location.path('/bbot');

                }).catch(function (error) {
                    $rootScope.message = error.message;
                });

            },// loginFacebook
            
            resetPassword: function(email){
            	
            	auth.$resetPassword({
            		  email: email
            		}).then(function() {
            		  $rootScope.messageReset = "Password reset email sent successfully!";
            		}).catch(function(error) {
            		  $rootScope.messageReset = error.message;
            		});

     	
            },// resetPassword
            
            changePass: function (email, oldPass, newPass){
                
                
                console.log(email);
                console.log(oldPass);
                console.log(newPass);
            	
            	auth.$changePassword({
            		  email: email,
            		  oldPassword: oldPass,
            		  newPassword: newPass
            		}).then(function() {
                            $rootScope.changeP = 'Senha alterada com sucesso!';
            		  console.log("Senha alterada com sucesso!");
            		}).catch(function(error) {
                            $rootScope.changeP = 'Senha antiga errada. Tente novamente.';
            		  console.error("Error: ", error);
            		});
            	
            },// changePass
            
            

        };// return
        return myObject

    }]);// factory
