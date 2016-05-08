var myApp = angular.module(
        'myApp',
        [
            'ngRoute', 'firebase', 'ngMaterial', 'ngDraggable',
            'angular-toArrayFilter', 'angularMoment', 'angular-flippy',
            'ui.utils.masks', 'creditCardInput',
            'angulartics', 'angulartics.google.analytics'])
.constant(
        'FIREBASE_URL', 'https://businessme-register.firebaseio.com/');

myApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    }]);

//myApp.config(function ($mdIconProvider) {
//    $mdIconProvider
//            .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
//            .defaultIconSet('img/icons/sets/core-icons.svg', 24);
//});



myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
});

myApp.run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {

            if (error == 'AUTH_REQUIRED') {
                // $rootScope.message = 'Sorry, you must log in to access that
                // page.';
                $location.path('/bem-vindo');
            }// if
        });// on

    }]);// run

myApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider

                .when('/404', {
                    templateUrl: 'view/404.html'
                })

                // assine-trial
                .when('/assine-trial', {
                    templateUrl: 'js/assinatura-moip/view/assine-trial.html',
                    controller: 'AssineCoontroller'
                })
                // assine-desbravadores
                .when('/assine-desbravadores', {
                    templateUrl: 'js/assinatura-moip/view/assine-desbravadores.html',
                    controller: 'AssineCoontroller'
                })

                // escolher-plano
                .when('/escolher-plano', {
                    templateUrl: 'js/assinatura-moip/view/escolher-plano.html',
                    controller: 'AssineCoontroller'
                })
                // escolher-plano
                .when('/sucesso', {
                    templateUrl: 'js/assinatura-moip/view/sucesso.html',
                    controller: 'AssineCoontroller'
                })



                // registration
                .when('/bem-vindo', {
                    templateUrl: 'js/registration/view/landingpage.html',
                    controller: 'LandingCoontroller'
                })

                // registration
                .when('/cadastro-businessme', {
                    templateUrl: 'js/registration/view/cadastro-businessme.html',
                    controller: 'LandingCoontroller'
                })
                // login
                .when('/login', {
                    templateUrl: 'js/registration/view/login.html',
                    controller: 'RegistrationController'
                })
                // registration        
                .when('/register', {
                    templateUrl: 'js/registration/view/register.html',
                    controller: 'RegistrationController'
                })
                // bbot
                .when('/analise', {
                    templateUrl: 'js/bbot/view/embreve.html',
                    controller: 'EmbreveController',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })// analise

                .when('/funil', {
                    templateUrl: 'js/bbot/view/embreve.html',
                    controller: 'EmbreveController',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })// analise


                .when('/', {
                    templateUrl: 'js/bbot-v002/view/bbot.html',
                    controller: 'BBot02Controller',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })

                .when('/bbot', {
//                    templateUrl: 'js/bbot/view/bbot.html',
//                    controller: 'BBotController',
                    templateUrl: 'js/bbot-v002/view/bbot.html',
                    controller: 'BBot02Controller',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })//bbot


                .when('/bbot2', {
                    templateUrl: 'js/bbot-v002/view/bbot.html',
                    controller: 'BBot02Controller',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })//bbot2


                // contato
                .when('/contato', {
                    templateUrl: 'js/bbot/view/contato.html',
                    controller: 'ContatoController',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })
                .when('/settings', {
                    templateUrl: 'js/bbot/view/settings.html',
                    controller: 'SettingsController',
                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        }// currentAuth
                    }
                    // resolve
                })

                //new layout


                .otherwise({
                    redirectTo: '/404'
                });
    }]);

myApp.config(function ($mdDateLocaleProvider) {
    // Example of a French localization.
    $mdDateLocaleProvider.months = ['janeiro', 'fevereiro', 'março', 'abril',
        'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro',
        'novembro', 'dezembro'];
    $mdDateLocaleProvider.shortMonths = ['jan', 'fev', 'mar', 'abr', 'mai',
        'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    $mdDateLocaleProvider.days = ['domingo', 'segunda-feira', 'terça-feira',
        'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui',
        'Sex', 'Sáb'];
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 0;
    // $mdDateLocaleProvider.formatDate = function (date) {
    // return moment(date).format('L');
    // };
});
