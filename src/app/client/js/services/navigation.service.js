(function() {
	'use strict';

	angular.module('app').factory('navigationService', ['$location', NavigationService]);

	function NavigationService($location) {

		return {
			goTo: function(path) {
				
			},
			goToAddIncident: function() {

			}
		};
	}
})();