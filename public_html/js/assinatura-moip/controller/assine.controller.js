myApp.controller('AssineCoontroller', ['$scope', '$http', function ($scope, $http) {


	

        $scope.subscribe = function () {

            var urlList = 'https://sandbox.moip.com.br/assinaturas/v1/plans';
                        
            console.log('subscribe aqui!');
            
            

//            $http({
//                method: 'GET',
//                url: urlList,
//                headers: {
//                	'Content-Type': 'application/json',
//                	'Authorization': 'Basic MDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDE6QUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQg=='
//                }
//                
//            }).then(function successCallback(response) {
//                console.log(response);
//
//            }, function errorCallback(response) {
//                console.log(response);
//            });



        };


    }]);// Controller
