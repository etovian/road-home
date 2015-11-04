(function() {
	angular.module('app').controller('MainController', ['NotificationService', 'IncidentService', MainController]);

	function MainController(notificationService, incidentService) {
		var vm = this;

		angular.extend(vm, {
			getActiveNotifications: function() {
				return notificationService.getActiveNotifications();
			},
			getNotificationClass: function(notification) {
				return notificationService.getNotificationClass(notification);
			},
			removeNotification: function(notification) {
				notificationService.remove(notification);
			}
		});

		incidentService.initialize();
	}

})();