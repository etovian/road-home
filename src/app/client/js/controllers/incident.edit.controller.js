(function() {

	'use strict';
	var deps = ['$location', '$routeParams', 'IncidentService', 'NotificationService', '$aside', IncidentEditController];
	angular.module('app').controller('IncidentEditController', deps);

	function IncidentEditController($location, $routeParams, incidentService, notificationService, $aside) {

		var vm = this;
		angular.extend(vm, {
			incident: null,
			incidentFormButtons: [
				{
					click: function() {
						$location.path('/incident-list');
					},
					cssClass: 'btn-warning',
					text: 'Cancel'
				},
				{
					click: function() {
						vm.deletion.getConfirmation();
					},
					cssClass: 'btn-danger',
					text: 'Delete'
				},
				{
					click: function() {
						incidentService.saveIncident(vm.incident)
							.then(function(/*incident*/) {
								$location.path('/incident-list');
							});
					},
					cssClass: 'btn-primary',
					text: 'Save'
				}
			],
			deletion: {
				asideOpenOptions: {
					templateUrl: 'templates/confirm.delete.sidebar.html',
					controller: 'ConfirmDeleteSidebarController',
					controllerAs: 'vm',
					bindToController: true,
					placement: 'bottom',
					resolve: {
						message: function() {
							return 'Are you sure you want to delete this incident?';
						}
					},
					size: 'sm'
				},
				cancel: function() {
					notificationService.add({
						title: 'Delete Canceled',
						text: 'The incident was not deleted.',
						type: notificationService.NOTIFICATION_TYPES.INFO
					});
				},
				confirm: function() {
					incidentService.deleteIncident(vm.incident).then(function() {
						$location.path('/incident-list');
					});
				},
				getConfirmation: function() {
					$aside.open(vm.deletion.asideOpenOptions).result.then(vm.deletion.confirm, vm.deletion.cancel);
				}				
			}
		});

		incidentService.getIncidentById(+$routeParams.incidentId)
			.then(function(response) {
				vm.incident = response;
			})["catch"](function() {
				$location.path('/incident-list');
			});
	}

})();