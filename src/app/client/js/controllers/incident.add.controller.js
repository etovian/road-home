(function() {
	'use strict';

	angular.module('app').controller('IncidentAddController', ['$location', 'IncidentService', IncidentAddController]);

	function IncidentAddController($location, incidentService) {

		var vm = this;
		angular.extend(vm, {
			incident: incidentService.createNewIncident(),
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
						incidentService.addIncident(vm.incident)
							.then(function(/*incident*/) {
								$location.path('/incident-list');
							});
					},
					cssClass: 'btn-default',
					text: 'Save'
				}
			]
		});
	}

})();