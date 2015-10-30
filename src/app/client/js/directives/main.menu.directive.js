(function() {
	'use strict';

	angular.module('app').directive('trhMainMenu', MainMenuDirective);

	function MainMenuDirective() {
		return {
			scope: {

			},
			templateUrl: 'app/client/views/directives/main.menu.html',
			controller: ['navigationService', MainMenuDirectiveController],
			controllerAs: 'vm',
			bindToController: true
		};
	}

	function MainMenuDirectiveController(navigationService) {

		//TODO: create navigationService
		var vm = this;
		angular.extend(vm, {
			goToAddIncident: function() {
				navigationService.goToAddIncident();
			}
			//...
		});
	}

})();