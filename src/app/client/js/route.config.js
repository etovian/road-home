(function() {
	'use strict';

	angular
		.module('app')
		.config(['$routeProvider', Config]);

	function Config($routeProvider) {

		var templatesPath = 'templates/';

		$routeProvider
			.when('/welcome', {
				templateUrl: templatesPath + 'welcome.html',
				controller: 'WelcomeController',
				controllerAs: 'vm'
			})
			.when('/incident-list', {
				templateUrl: templatesPath + 'incident.list.html',
				controller: 'IncidentListController',
				controllerAs: 'vm'
			})
			.when('/incident-add', {
				templateUrl: templatesPath + 'incident.add.html',
				controller: 'IncidentAddController',
				controllerAs: 'vm'
			})
			.when('/incident-edit/:incidentId', {
				templateUrl: templatesPath + 'incident.edit.html',
				controller: 'IncidentEditController',
				controllerAs: 'vm'
			})
			.when('/shift-report-list', {
				templateUrl: templatesPath + 'shift.report.list.html',
				controller: 'ShiftReportListController',
				controllerAs: 'vm'
			})
			.when('/shift-report-edit', {
				templateUrl: templatesPath + 'shift.report.edit.html',
				controller: 'ShiftReportEditController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/welcome'
			});
			
	}

})();