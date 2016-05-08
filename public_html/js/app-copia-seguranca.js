var myApp = angular.module(
		'myApp',
		[ 'ngRoute', 'firebase', 'ngMaterial', 'ngDraggable',
				'angular-toArrayFilter', 'angularMoment', 'angular-flippy',
				'angulartics', 'angulartics.google.analytics' ])
.constant(
		'FIREBASE_URL', 'https://businessme-register.firebaseio.com/');

myApp.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
} ]);

myApp.run([ '$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error) {

		if (error == 'AUTH_REQUIRED') {
			// $rootScope.message = 'Sorry, you must log in to access that
			// page.';
			$location.path('/bem-vindo');
		}// if
	});// on

} ]);// run

myApp.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

myApp.config([ '$routeProvider', function($routeProvider) {

	$routeProvider

	.when('/404', {
		templateUrl : 'view/404.html'
	})

	// assine
//	.when('/assine', {
//		templateUrl : 'js/assinatura-moip/view/assine.html',
//		controller : 'AssineCoontroller'
//	})
	// assine
	.when('/assine', {
		//templateUrl : 'js/assinatura-email/view/assine.html',
		//controller : 'AssineEmailCoontroller'
		templateUrl : 'js/bbot/view/embreve.html',
		controller : 'EmbreveController',
	})
	// registration
	.when('/bem-vindo', {
		templateUrl : 'js/registration/view/landingpage.html',
		controller : 'LandingCoontroller'
	})
	// registration
	.when('/login', {
		templateUrl : 'js/registration/view/login.html',
		controller : 'RegistrationController'
	}).when('/register', {
		templateUrl : 'js/registration/view/register.html',
		controller : 'RegistrationController'
	})
	// bbot

	.when('/analise', {
		templateUrl : 'js/bbot/view/embreve.html',
		controller : 'EmbreveController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	})// analise

	.when('/funil', {
		templateUrl : 'js/bbot/view/embreve.html',
		controller : 'EmbreveController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	})// analise

	.when('/bbot', {
		templateUrl : 'js/bbot/view/index.html',
		controller : 'BBotController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	}).when('/', {
		templateUrl : 'js/bbot/view/index.html',
		controller : 'BBotController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	})
	// contato
	.when('/contato', {
		templateUrl : 'js/bbot/view/contato.html',
		controller : 'ContatoController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	}).when('/settings', {
		templateUrl : 'js/bbot/view/settings.html',
		controller : 'SettingsController',
		resolve : {
			currentAuth : function(Authentication) {
				return Authentication.requireAuth();
			}// currentAuth
		}
	// resolve
	})

	.otherwise({
		redirectTo : '/404'
	});
} ]);

myApp.config(function($mdDateLocaleProvider) {
	// Example of a French localization.
	$mdDateLocaleProvider.months = [ 'janeiro', 'fevereiro', 'março', 'abril',
			'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro',
			'novembro', 'dezembro' ];
	$mdDateLocaleProvider.shortMonths = [ 'jan', 'fev', 'mar', 'abr', 'mai',
			'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ];
	$mdDateLocaleProvider.days = [ 'domingo', 'segunda-feira', 'terça-feira',
			'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ];
	$mdDateLocaleProvider.shortDays = [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui',
			'Sex', 'Sáb' ];
	// Can change week display to start on Monday.
	$mdDateLocaleProvider.firstDayOfWeek = 0;
	// $mdDateLocaleProvider.formatDate = function (date) {
	// return moment(date).format('L');
	// };
});
