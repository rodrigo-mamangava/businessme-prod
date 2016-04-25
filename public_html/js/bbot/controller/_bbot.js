myApp.controller('BBotController', [
		'$scope',
		'$rootScope',
		'$firebaseAuth',
		'$firebaseArray',
		'FIREBASE_URL',
		function($scope, $rootScope, $firebaseAuth, $firebaseArray,
				FIREBASE_URL) {

			var ref = new Firebase(FIREBASE_URL);
			var auth = $firebaseAuth(ref);

			auth.$onAuth(function(authUser) {
				if (authUser) {
					var leadsRef = new Firebase(FIREBASE_URL + 'users/'
							+ $rootScope.currentUser.$id + '/leads');
					var leadsInfo = $firebaseArray(leadsRef);
					
					$scope.leads = leadsInfo;
					
					leadsInfo.$loaded().then(function(){
						$rootScope.howManyLeads = leadsInfo.length;
					});//$loaded then
					
					leadsInfo.$watch(function(){
						$rootScope.howManyLeads = leadsInfo.length;
					});//$watch

					$scope.addLead = function() {

						leadsInfo.$add({
							name : $scope.leadname,
							date : Firebase.ServerValue.TIMESTAMP
						}).then(function() {
							$scope.leadname = '';
						});// then

					};// addLead
					
					$scope.deleteLead = function(key){
						leadsInfo.$remove(key);
					}

				}// if authUser
			});// onAuth

		} ]);// BBotController
