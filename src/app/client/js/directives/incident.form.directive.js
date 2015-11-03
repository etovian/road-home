(function() {

	'use strict';

	angular.module('app').directive('trhIncidentForm', [IncidentFormDirective]);

	function IncidentFormDirective() {
		return {
			scope: {
				incident: '=trhIncident'
			},
			templateUrl: 'app/client/views/directives/incident.form.html',
			controller: ['IncidentService', IncidentFormDirectiveController],
			controllerAs: 'vm',
			bindToController: true
		};
	}

	function IncidentFormDirectiveController(incidentService) {

		var vm = this;
		angular.extend(vm, {
			categories: [],
			getCategories: function() {
				incidentService.getCategories()
					.then(function(categories) {
						vm.categories = categories;
					});
			},
			getLocations: function() {
				incidentService.getLocations()
					.then(function(locations) {
						vm.locations = locations;
					});
			}
		});

		vm.getCategories();
		vm.getLocations();
	}

})();