(function() {
	angular.module('app').controller('MainController', ['NotificationService', MainController]);

	function MainController(notificationService) {
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
	}

})();