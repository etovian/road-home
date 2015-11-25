(function() {

	'use strict';

	angular.module('app').factory('IncidentService', ['$http', '$q', 'NotificationService', IncidentService]);

	function IncidentService($http, $q, notificationService) {

		var BASE_URL = 'dev-data/';
		var categories = [];
		var incidents = [];
		var locations = [];

		var service = {
			addIncident: function(incident) {
				var deferred = $q.defer();
				incidents.push(incident);
				deferred.resolve(incident);
				notificationService.add({
					text: 'Incident added',
					title: 'Success!',
					type: notificationService.NOTIFICATION_TYPES.SUCCESS
				});
				return deferred.promise;
			},
			createNewIncident: function() {
				var incident = {
					id: incidents.length + 1,
					created: new Date(),
					createdBy: 'admin.user',
					incidentDate: new Date(),
					incidentTime: new Date(),
					location: null,
					category: null,
					description: '',
					called911: false
				};
				return incident;
			},
			deleteIncident: function(incident) {
				var deferred = $q.defer();
				deferred.resolve(incident);
				incidents = _.without(incidents, incident);
				notificationService.add({
					title: 'Incident Deleted',
					text: 'The incident was removed from the system.',
					type: notificationService.NOTIFICATION_TYPES.DANGER
				});
				return deferred.promise;
			},
			getCategories: function() {
				var deferred = $q.defer();
				if(categories.length > 0) {
					deferred.resolve(categories);
				} else {
					var fileName = 'incident.category';
					this.requestData(fileName)
						.then(function(response) {
							categories = response.data;
							deferred.resolve(categories);
						}, function() {
							notificationService.addError('Could not retrieve data for ' + fileName);	
						});
				}

				return deferred.promise;
			},
			getIncidentById: function(incidentId) {
				var deferred = $q.defer();
				var incident = _.findWhere(incidents, { id: incidentId} );
				if(incident) {
					deferred.resolve(incident);
				} else {
					notificationService.addError('Could not retrieve incident with id of ' + incidentId);
					deferred.reject();
				}
				return deferred.promise;
			},
			getIncidents: function() {
				return incidents;
			},
			getLocations: function() {
				var deferred = $q.defer();
				if(locations.length > 0) {
					deferred.resolve(locations);
				} else {
					var fileName = 'incident.location';
					this.requestData(fileName)
						.then(function(response) {
							locations = response.data;
							deferred.resolve(locations);
						});
				}
				return deferred.promise;
			},
			initialize: function() {
				this.requestIncidents();
				this.getCategories();
				this.getLocations();
			},
			processIncidentDates: function(incidentArray) {
				incidentArray.forEach(function(incident) {
					incident.incidentDate = new Date(incident.incidentDate);
					incident.created = new Date(incident.created);
					incident.incidentTime = new Date(incident.incidentTime);
				});
				return incidentArray;
			},
			requestData: function(fileName) {
				var url = BASE_URL + fileName + '.json';
				var deferred = $q.defer();
				$http.get(url)
					.then(function(response){
						deferred.resolve(response);
					}, function() {
						notificationService.addError('Could not retrieve data for ' + fileName);
					});

				return deferred.promise;
			},
			requestIncidents: function() {
				var self = this;
				return this.requestData('incidents')
					.then(function(response) {
						incidents = self.processIncidentDates(response.data);
					});
			},
			saveIncident: function(incident) {
				var deferred = $q.defer();
				deferred.resolve(incident);
				notificationService.add({
					text: 'Incident saved',
					title: 'Success!',
					type: notificationService.NOTIFICATION_TYPES.SUCCESS
				});
				return deferred.promise;
			}
		};

		return service;
	}
})();