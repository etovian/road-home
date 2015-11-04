(function() {

	'use strict';

	angular.module('app').controller('IncidentEditController', ['$location', '$routeParams', 'IncidentService', IncidentEditController]);

	function IncidentEditController($location, $routeParams, incidentService) {

		var vm = this;
		angular.extend(vm, {
			incident: null,
			incidentFormButtons: [
				{
					click: function() {
						$location.path('/incident-list');
					},
					cssClass: 'btn-danger',
					text: 'Cancel'
				},
				{
					click: function() {
						incidentService.saveIncident(vm.incident)
							.then(function(/*incident*/) {
								$location.path('/incident-list');
							});
					},
					cssClass: 'btn-default',
					text: 'Save'
				}
			]
		});

		incidentService.getIncidentById(+$routeParams.incidentId)
			.then(function(response) {
				vm.incident = response;
			})["catch"](function() {
				$location.path('/incident-list');
			});
	}

})();