myApp.controller('HeaderControllerV002',
        [
            '$rootScope',
            '$scope',
            '$location',
            '$timeout',
            '$mdSidenav',
            'Authentication',
            function (
                    $rootScope,
                    $scope,
                    $location,
                    $timeout, 
                    $mdSidenav,
                    Authentication
                    ) {
            	
            	
                $scope.irPrincial = function () {

                    $location.path('/bbot');
                    $rootScope.nomePagina = 'Inicial';
                    $scope.close();

                };

                $scope.irContato= function () {

                    $location.path('/contato');
                    $rootScope.nomePagina = 'Contato';
                    $scope.close();

                };

                $scope.irMeta= function () {

                    $location.path('/metas');
                    $rootScope.nomePagina = 'Metas';
                    $scope.close();

                };

                $scope.irSetting = function () {

                    $location.path('/settings');
                    $rootScope.nomePagina = 'Configurações';
                    $scope.close();

                };
                $scope.irFunil = function () {

                    $location.path('/funil');
                    $rootScope.nomePagina = 'Funil';
                    $scope.close();

                };
                
                $scope.logout = function(){
                    Authentication.logout();
                    $location.path('/');
                };

                $scope.toggleLeft = buildToggler('left');

                $scope.isOpenLeft = function () {
                    return $mdSidenav('left').isOpen();
                };

                function buildToggler(navID) {
                    return function () {
                        $mdSidenav(navID)
                                .toggle()
                                .then(function () {

                                });
                    }
                }
                ;

                $scope.close = function () {
                    $mdSidenav('left').close()
                            .then(function () {

                            });
                };






            }]);// Controller


