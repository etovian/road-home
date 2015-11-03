(function() {

	'use strict';

	angular.module('app').controller('IncidentEditController', ['$location', '$routeParams', 'IncidentService', IncidentEditController]);

	function IncidentEditController($location, $routeParams, incidentService) {

		var vm = this;
		angular.extend(vm, {
			incident: null
		});

		incidentService.getIncidentById(+$routeParams.incidentId)
			.then(function(response) {
				vm.incident = response;
			})["catch"](function() {
				$location.path('/incident-list');
			});
	}

})();