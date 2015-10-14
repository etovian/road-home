(function() {
	'use strict';

	angular
		.module('app')
		.config(['$routeProvider', Config]);

	function Config($routeProvider) {

		$routeProvider
			.when('/welcome', {
				templateUrl: 'src/app/client/views/templates/welcome.html',
				controller: 'WelcomeController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/welcome'
			});
			
	}

})();