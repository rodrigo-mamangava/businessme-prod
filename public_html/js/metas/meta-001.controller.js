myApp.controller('MetaController', 
	[ 
	'$rootScope', 
	'$scope', 
	'$location', 
	'FIREBASE_URL', 
	'$firebaseArray',
	'$firebaseAuth' ,
	function(
		$rootScope, 
		$scope, 
		$location, 
		FIREBASE_URL,
		$firebaseArray,
		$firebaseAuth
		) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {

            	//variaveis
                var uid = authUser.uid;


            	var metaRef = new Firebase(FIREBASE_URL + 'users/' + uid + '/meta');

				var metaList = $firebaseArray(metaRef);

				$scope.metaList = metaList;


				$scope.showDetalheMeta = function(){
					jQuery('#detalhes-meta').slideToggle();
			        jQuery('#btn-detalhe-meta').toggleClass('ativo');
			    };





            }// if authUser
        });// onAuth
	
                
        
        

} ]);// Controller

