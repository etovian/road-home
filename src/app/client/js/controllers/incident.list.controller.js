(function() {

	'use strict';

	angular.module('app').controller('IncidentListController', [ 'IncidentService', 'NotificationService', IncidentListController]);

	function IncidentListController(incidentService, notificationService) {

		var vm = this;
		angular.extend(vm, {
			gridOptions: {
				columnDefs: [ //https://github.com/angular-ui/ui-grid/wiki/Defining-columns
					{
						displayName: 'Category',
						field: 'category.description'
					},
					{
						displayName: 'Location',
						field: 'location.description'
					},
					{
						displayName: 'Description',
						field: 'description'
					},
					{
						displayName: 'Created By',
						field: 'createdBy'
					}
				],
				data: [],
				enableRowSelection: true,
				enableRowHeaderSelection: false,
				multiSelect: false,
				noUnselect: true,
				onRegisterApi: function(gridApi) {
					vm.gridApi = gridApi;
					gridApi.selection.on.rowSelectionChanged(null, function(row) {
						vm.setSelectedIncident(row.entity);
					});
				}
			},
			selectedIncident: null,
			getGridOptions: function() {
				return vm.gridOptions;
			},
			setSelectedIncident: function(incident) {
				vm.selectedIncident = incident;
			}
		});

		incidentService.requestIncidents()
			.then(function() {
				
				vm.gridOptions.data = incidentService.getIncidents();

				notificationService.add({
					title: 'Incidents',
					text: 'There are ' + vm.gridOptions.data.length + ' incidents.',
					type: notificationService.NOTIFICATION_TYPES.DANGER
				});
			});
	}

})();