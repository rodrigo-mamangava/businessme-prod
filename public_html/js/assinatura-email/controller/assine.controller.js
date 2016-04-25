myApp.controller('AssineEmailCoontroller', [ '$scope', '$resource',
		function($scope, $resource) {

			$scope.subscribe = function() {
				
				var urlEmail = "http://clientes.mmgv.net/bbot-engine-email/engine-email-assinatura.php";
				
				var Assinar = $resource(urlEmail)
				
				var c = new Assinar();
				
				c.teste = 'teste';
				
				c.$save();
				
// $http.post(urlEmail).
// success(function(data, status, headers, config) {
// //what do I do here?
// console.log('sucesso!');
// console.log(data);
// }).
// error(function(data, status, headers, config) {
// //$scope.error = true;
// console.log('falha!');
// //console.log($scope.error);
// });

// $http({
// method : 'jsonp',
// url : urlEmail
// }).then(function successCallback(response) {
//					
//					
//					
// console.log(response);
// // this callback will be called asynchronously
// // when the response is available
// }, function errorCallback(response) {
// console.log(response);
// // called asynchronously if an error occurs
// // or server returns response with an error status.
// });

			};

		} ]);// Controller
